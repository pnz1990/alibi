/**
 * Seeded PRNG procedural puzzle generator.
 * Takes (seed, theme, difficulty) → Puzzle.
 * Guarantees exactly 1 solution via the solver.
 *
 * Algorithm (see AGENTS.md §Generator Algorithm):
 * 1. Initialize mulberry32 PRNG from seed.
 * 2. Load floorPlan = theme.floorPlans[difficulty].
 * 3. Derive validCols, validRows, N.
 * 4–7. Select suspect and victim names.
 * 8. Place suspects (Latin square + backtracking, max 1000 backtracks).
 * 9. Derive victim cell.
 * 10. Derive killer.
 * 11. Select narrative variants.
 * 12. Generate clues (variety-constrained selection).
 * 13. Solver uniqueness check. Add extra clues if needed (up to 5×).
 * 14. Full retry on failure (up to 20×).
 */

import type { Difficulty } from '../storage/schema';
import type { Theme } from '../themes/index';
import { getValidCols, getValidRows, isPlaceable, getRoomAt, isSeatTile } from './grid';
import { getVictimCell, getKiller } from './logic';
import { countSolutions } from './solver';
import { ALLOWED_CLUE_TYPES } from './clues';
import type { Clue, ClueType } from './clues';
import type { SuspectPlacement } from './logic';
import type { FloorPlanDef } from '../themes/floor-plans';

export interface Suspect {
  id: string;
  name: string;
}

export interface Puzzle {
  seed: number;
  themeId: string;
  difficulty: Difficulty;
  suspects: Suspect[];
  victimName: string;
  clues: Clue[];
  solution: ReadonlyMap<string, SuspectPlacement>;
  victimCell: { x: number; y: number };
  killer: Suspect;
  narrativeIntro: string;
  narrativeVictimFound: string;
  narrativeGuilty: string;
  floorPlan: FloorPlanDef;
}

export class PuzzleGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PuzzleGenerationError';
  }
}

/**
 * mulberry32 PRNG — deterministic, seeded.
 * Returns a function that yields floats in [0, 1).
 */
export function makePRNG(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function prngInt(rng: () => number, max: number): number {
  return Math.floor(rng() * max);
}

function prngPick<T>(rng: () => number, arr: T[]): T {
  return arr[prngInt(rng, arr.length)];
}

function shuffled<T>(rng: () => number, arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = prngInt(rng, i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Select clue types for N suspects, enforcing variety constraints.
 * See AGENTS.md §Clue Variety Constraint Algorithm.
 */
function selectClueTypes(
  rng: () => number,
  N: number,
  difficulty: Difficulty,
  fp: FloorPlanDef,
): ClueType[] {
  const allowed = ALLOWED_CLUE_TYPES[difficulty];
  const hasObjects = fp.landmarks.length >= 2;
  const hasSeatTiles = fp.tiles.some(row => row.some(t => isSeatTile(t)));

  const available = allowed.filter(type => {
    if ((type === 'besideObject' || type === 'notBesideObject') && !hasObjects) return false;
    if ((type === 'onSeatTile' || type === 'notOnSeatTile') && !hasSeatTiles) return false;
    return true;
  });

  const maxUsage = Math.ceil(N * 0.4);
  const selected: ClueType[] = [];

  for (let i = 0; i < N; i++) {
    const forbidden = new Set<ClueType>();
    if (selected.length > 0) forbidden.add(selected[selected.length - 1]);

    for (const type of available) {
      const usageCount = selected.filter(t => t === type).length;
      if (usageCount >= maxUsage) forbidden.add(type);
    }

    const candidates = available.filter(t => !forbidden.has(t));
    const fallback = candidates.length > 0 ? candidates : available;

    const unused = fallback.filter(t => !selected.includes(t));
    const pool = unused.length > 0 ? unused : fallback;
    selected.push(prngPick(rng, pool));
  }

  return selected;
}

/**
 * Generate a single clue of a given type for a suspect.
 * Returns null if the clue type cannot be generated for this suspect/floor plan.
 */
function generateClue(
  rng: () => number,
  fp: FloorPlanDef,
  theme: Theme,
  clueType: ClueType,
  suspect: Suspect,
  suspects: Suspect[],
  solution: ReadonlyMap<string, SuspectPlacement>,
): Clue | null {
  const placement = solution.get(suspect.id)!;
  const templates = theme.clueTemplates;

  switch (clueType) {
    case 'inRoom': {
      const room = getRoomAt(fp, placement.x, placement.y);
      if (!room) return null;
      const roomDef = fp.rooms.find(r => r.id === room)!;
      return {
        type: 'inRoom',
        suspectId: suspect.id,
        roomId: room,
        text: templates.inRoom(suspect.name, roomDef.name),
      };
    }

    case 'notInRoom': {
      // Pick a room the suspect is NOT in
      const currentRoom = getRoomAt(fp, placement.x, placement.y);
      const otherRooms = fp.rooms.filter(r => r.id !== currentRoom);
      if (otherRooms.length === 0) return null;
      const targetRoom = prngPick(rng, otherRooms);
      return {
        type: 'notInRoom',
        suspectId: suspect.id,
        roomId: targetRoom.id,
        text: templates.notInRoom(suspect.name, targetRoom.name),
      };
    }

    case 'inSameRoom': {
      const room = getRoomAt(fp, placement.x, placement.y);
      if (!room) return null;
      const sameRoomSuspects = suspects.filter(s => {
        if (s.id === suspect.id) return false;
        const p = solution.get(s.id)!;
        return getRoomAt(fp, p.x, p.y) === room;
      });
      if (sameRoomSuspects.length === 0) return null;
      const other = prngPick(rng, sameRoomSuspects);
      return {
        type: 'inSameRoom',
        suspectId: suspect.id,
        otherSuspectId: other.id,
        text: templates.inSameRoom(suspect.name, other.name),
      };
    }

    case 'inDifferentRoom': {
      const room = getRoomAt(fp, placement.x, placement.y);
      const diffRoomSuspects = suspects.filter(s => {
        if (s.id === suspect.id) return false;
        const p = solution.get(s.id)!;
        const sr = getRoomAt(fp, p.x, p.y);
        return sr !== null && sr !== room;
      });
      if (diffRoomSuspects.length === 0) return null;
      const other = prngPick(rng, diffRoomSuspects);
      return {
        type: 'inDifferentRoom',
        suspectId: suspect.id,
        otherSuspectId: other.id,
        text: templates.inDifferentRoom(suspect.name, other.name),
      };
    }

    case 'inColumn':
      return {
        type: 'inColumn',
        suspectId: suspect.id,
        col: placement.x,
        text: templates.inColumn(suspect.name, placement.x + 1),
      };

    case 'inRow':
      return {
        type: 'inRow',
        suspectId: suspect.id,
        row: placement.y,
        text: templates.inRow(suspect.name, placement.y + 1),
      };

    case 'besideSuspect': {
      const adjacent = suspects.filter(s => {
        if (s.id === suspect.id) return false;
        const p = solution.get(s.id)!;
        return Math.max(Math.abs(placement.x - p.x), Math.abs(placement.y - p.y)) <= 1;
      });
      if (adjacent.length === 0) return null;
      const other = prngPick(rng, adjacent);
      return {
        type: 'besideSuspect',
        suspectId: suspect.id,
        otherSuspectId: other.id,
        text: templates.besideSuspect(suspect.name, other.name),
      };
    }

    case 'notBesideSuspect': {
      const notAdjacent = suspects.filter(s => {
        if (s.id === suspect.id) return false;
        const p = solution.get(s.id)!;
        return Math.max(Math.abs(placement.x - p.x), Math.abs(placement.y - p.y)) > 1;
      });
      if (notAdjacent.length === 0) return null;
      const other = prngPick(rng, notAdjacent);
      return {
        type: 'notBesideSuspect',
        suspectId: suspect.id,
        otherSuspectId: other.id,
        text: templates.notBesideSuspect(suspect.name, other.name),
      };
    }

    case 'besideObject': {
      if (fp.landmarks.length === 0) return null;
      // Find landmarks within chebyshev 1
      const adjacent = fp.landmarks.filter(lm =>
        Math.max(Math.abs(placement.x - lm.x), Math.abs(placement.y - lm.y)) <= 1
      );
      if (adjacent.length === 0) return null;
      const lm = prngPick(rng, adjacent);
      const objectTile = fp.tiles[lm.y][lm.x];
      return {
        type: 'besideObject',
        suspectId: suspect.id,
        objectTile,
        text: templates.besideObject(suspect.name, lm.name),
      };
    }

    case 'notBesideObject': {
      if (fp.landmarks.length === 0) return null;
      // Find landmarks NOT within chebyshev 1
      const notAdjacent = fp.landmarks.filter(lm =>
        Math.max(Math.abs(placement.x - lm.x), Math.abs(placement.y - lm.y)) > 1
      );
      if (notAdjacent.length === 0) return null;
      const lm = prngPick(rng, notAdjacent);
      const objectTile = fp.tiles[lm.y][lm.x];
      return {
        type: 'notBesideObject',
        suspectId: suspect.id,
        objectTile,
        text: templates.notBesideObject(suspect.name, lm.name),
      };
    }

    case 'onSeatTile': {
      const tile = fp.tiles[placement.y][placement.x];
      if (!isSeatTile(tile)) return null;
      const tileName = tile === 'C' ? 'chair' : tile === 'S' ? 'sofa' : 'bed';
      return {
        type: 'onSeatTile',
        suspectId: suspect.id,
        text: templates.onSeatTile(suspect.name, tileName),
      };
    }

    case 'notOnSeatTile': {
      const tile = fp.tiles[placement.y][placement.x];
      if (isSeatTile(tile)) return null;
      return {
        type: 'notOnSeatTile',
        suspectId: suspect.id,
        text: templates.notOnSeatTile(suspect.name),
      };
    }

    case 'northOf': {
      const southerSuspects = suspects.filter(s => {
        if (s.id === suspect.id) return false;
        const p = solution.get(s.id)!;
        return placement.y < p.y; // suspect is north of other (smaller y)
      });
      if (southerSuspects.length === 0) return null;
      const other = prngPick(rng, southerSuspects);
      return {
        type: 'northOf',
        suspectId: suspect.id,
        otherSuspectId: other.id,
        text: templates.northOf(suspect.name, other.name),
      };
    }

    case 'southOf': {
      const northerSuspects = suspects.filter(s => {
        if (s.id === suspect.id) return false;
        const p = solution.get(s.id)!;
        return placement.y > p.y; // suspect is south of other (larger y)
      });
      if (northerSuspects.length === 0) return null;
      const other = prngPick(rng, northerSuspects);
      return {
        type: 'southOf',
        suspectId: suspect.id,
        otherSuspectId: other.id,
        text: templates.southOf(suspect.name, other.name),
      };
    }

    case 'exactlyNRowsNorth': {
      // suspect is exactly n rows north of other (other.y - suspect.y == n)
      const targets: Array<{ suspect: Suspect; n: number }> = [];
      for (const s of suspects) {
        if (s.id === suspect.id) continue;
        const p = solution.get(s.id)!;
        const diff = p.y - placement.y;
        if (diff > 0) targets.push({ suspect: s, n: diff });
      }
      if (targets.length === 0) return null;
      const target = prngPick(rng, targets);
      return {
        type: 'exactlyNRowsNorth',
        suspectId: suspect.id,
        otherSuspectId: target.suspect.id,
        n: target.n,
        text: templates.exactlyNRowsNorth(suspect.name, target.suspect.name, target.n),
      };
    }

    case 'exactlyNRowsSouth': {
      // suspect is exactly n rows south of other (suspect.y - other.y == n)
      const targets: Array<{ suspect: Suspect; n: number }> = [];
      for (const s of suspects) {
        if (s.id === suspect.id) continue;
        const p = solution.get(s.id)!;
        const diff = placement.y - p.y;
        if (diff > 0) targets.push({ suspect: s, n: diff });
      }
      if (targets.length === 0) return null;
      const target = prngPick(rng, targets);
      return {
        type: 'exactlyNRowsSouth',
        suspectId: suspect.id,
        otherSuspectId: target.suspect.id,
        n: target.n,
        text: templates.exactlyNRowsSouth(suspect.name, target.suspect.name, target.n),
      };
    }
  }
}

/**
 * Attempt to place N suspects on the floor plan.
 * Uses backtracking. Returns null if max backtracks exceeded.
 */
function placeSuspects(
  rng: () => number,
  fp: FloorPlanDef,
  suspects: Suspect[],
  maxBacktracks = 1000,
): ReadonlyMap<string, SuspectPlacement> | null {
  const validCols = shuffled(rng, getValidCols(fp));
  const validRows = shuffled(rng, getValidRows(fp));
  const N = suspects.length; // caller determines how many suspects to place

  if (N < 1 || N > Math.min(validCols.length, validRows.length)) return null;

  let backtracks = 0;
  const placements = new Map<string, SuspectPlacement>();
  const usedRows = new Set<number>();
  const usedCols = new Set<number>();

  // Assign each suspect to a row (shuffled order)
  const rowAssignment = shuffled(rng, validRows).slice(0, N);
  // For each row, try to find a valid col with a placeable cell at that intersection

  function backtrack(i: number): boolean {
    if (i === N) return true;
    const suspect = suspects[i];
    const row = rowAssignment[i];

    const colOrder = shuffled(rng, validCols);
    for (const col of colOrder) {
      if (usedCols.has(col)) continue;
      if (!isPlaceable(fp.tiles[row]?.[col])) continue;

      placements.set(suspect.id, { suspectId: suspect.id, x: col, y: row });
      usedRows.add(row);
      usedCols.add(col);

      if (backtrack(i + 1)) return true;

      backtracks++;
      placements.delete(suspect.id);
      usedRows.delete(row);
      usedCols.delete(col);

      if (backtracks >= maxBacktracks) return false;
    }
    return false;
  }

  return backtrack(0) ? placements : null;
}

/**
 * Main generator function.
 * Throws PuzzleGenerationError if it cannot produce a unique-solution puzzle
 * after 20 full retries.
 */
export function generatePuzzle(seed: number, theme: Theme, difficulty: Difficulty): Puzzle {
  const MAX_FULL_RETRIES = 20;

  for (let attempt = 0; attempt < MAX_FULL_RETRIES; attempt++) {
    const attemptSeed = (seed + attempt * 97) >>> 0;
    const rng = makePRNG(attemptSeed);

    const fp = theme.floorPlans[difficulty];
    const validCols = getValidCols(fp);
    const validRows = getValidRows(fp);
    // N must be strictly less than both validCols and validRows so that after
    // placing N suspects, at least one free valid row and one free valid col remain
    // for the victim cell. See GitHub issue #24 for design context.
    const N = Math.min(validCols.length, validRows.length) - 1;
    if (N < 2) continue; // floor plan too small

    // Select N suspect names
    const suspectNamePool = shuffled(rng, [...theme.suspectNames]);
    const suspectNames = suspectNamePool.slice(0, N);
    const suspects: Suspect[] = suspectNames.map((name, i) => ({
      id: `s${i}`,
      name,
    }));

    // Select victim name
    const victimName = prngPick(rng, theme.victimNames);

    // Place suspects
    const solution = placeSuspects(rng, fp, suspects);
    if (!solution) continue;

    // Derive victim cell
    const placements = Array.from(solution.values());
    const victimCell = getVictimCell(fp, placements);
    if (!victimCell) continue;

    // Derive killer
    const killerId = getKiller(fp, placements, victimCell);
    if (!killerId) continue;
    const killer = suspects.find(s => s.id === killerId)!;

    // Select narrative variants
    const narrativeIntro = prngPick(rng, theme.narrativeTemplates.intro);
    const narrativeVictimFound = prngPick(rng, theme.narrativeTemplates.victimFound);
    const narrativeGuiltyTemplate = prngPick(rng, theme.narrativeTemplates.guiltyText);
    const narrativeGuilty = narrativeGuiltyTemplate
      .replace('{{killerName}}', killer.name)
      .replace('{{evidenceText}}', 'the evidence is conclusive');

    // Generate primary clues (one per suspect)
    const clueTypes = selectClueTypes(rng, N, difficulty, fp);
    const clues: Clue[] = [];

    for (let i = 0; i < N; i++) {
      const suspect = suspects[i];
      const type = clueTypes[i];

      // Try to generate the desired type; fall back to inRow if it fails
      let clue = generateClue(rng, fp, theme, type, suspect, suspects, solution);
      if (!clue) {
        clue = generateClue(rng, fp, theme, 'inRow', suspect, suspects, solution);
      }
      if (!clue) {
        clue = generateClue(rng, fp, theme, 'inColumn', suspect, suspects, solution);
      }
      if (clue) clues.push(clue);
    }

    // Uniqueness check — add extra clues until unique
    // Strategy: add inRow for each suspect not already pinned by row, then inColumn
    let solverResult = countSolutions(fp, suspects.map(s => s.id), clues);

    if (solverResult.count === 0) continue; // solution pruned — retry

    if (solverResult.count !== 1) {
      // Add inRow clues for suspects not already constrained by row
      for (const suspect of suspects) {
        if (solverResult.count === 1) break;
        const alreadyHasRow = clues.some(c => c.type === 'inRow' && c.suspectId === suspect.id);
        if (!alreadyHasRow) {
          const extraClue = generateClue(rng, fp, theme, 'inRow', suspect, suspects, solution);
          if (extraClue) clues.push(extraClue);
          solverResult = countSolutions(fp, suspects.map(s => s.id), clues);
        }
      }
    }

    if (solverResult.count !== 1) {
      // Add inColumn clues for suspects not already constrained by column
      for (const suspect of suspects) {
        if (solverResult.count === 1) break;
        const alreadyHasCol = clues.some(c => c.type === 'inColumn' && c.suspectId === suspect.id);
        if (!alreadyHasCol) {
          const extraClue = generateClue(rng, fp, theme, 'inColumn', suspect, suspects, solution);
          if (extraClue) clues.push(extraClue);
          solverResult = countSolutions(fp, suspects.map(s => s.id), clues);
        }
      }
    }

    if (solverResult.count !== 1) continue; // still not unique — retry

    return {
      seed: attemptSeed,
      themeId: theme.id,
      difficulty,
      suspects,
      victimName,
      clues,
      solution,
      victimCell,
      killer,
      narrativeIntro,
      narrativeVictimFound,
      narrativeGuilty,
      floorPlan: fp,
    };
  }

  throw new PuzzleGenerationError(
    `Failed to generate unique puzzle after ${MAX_FULL_RETRIES} retries (seed=${seed}, theme=${theme.id}, difficulty=${difficulty})`
  );
}
