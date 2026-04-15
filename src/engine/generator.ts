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
 * 12. Generate clues (difficulty-scaled count, variety-constrained selection).
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
 * Returns the target number of primary clues (before uniqueness enforcement).
 * Harder difficulties start with fewer — the solver may add quality extras.
 *
 *   Easy   → N     (one per suspect — plenty of info)
 *   Medium → N - 1 (one suspect uncovered initially)
 *   Hard   → N - 2 (two suspects uncovered — deduction required)
 *
 * Minimum is always 2 so the solver has something to work with.
 */
function targetClueCount(N: number, difficulty: Difficulty): number {
  const reductions: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2 };
  return Math.max(2, N - reductions[difficulty]);
}

/**
 * Select clue types for `targetCount` suspects, enforcing variety constraints.
 * See AGENTS.md §Clue Variety Constraint Algorithm.
 */
function selectClueTypes(
  rng: () => number,
  N: number,
  difficulty: Difficulty,
  fp: FloorPlanDef,
): ClueType[] {
  const targetCount = targetClueCount(N, difficulty);
  const allowed = ALLOWED_CLUE_TYPES[difficulty];
  const hasObjects = fp.landmarks.length >= 2;
  const hasSeatTiles = fp.tiles.some(row => row.some(t => isSeatTile(t)));

  const available = allowed.filter(type => {
    if ((type === 'besideObject' || type === 'notBesideObject') && !hasObjects) return false;
    if ((type === 'onSeatTile' || type === 'notOnSeatTile') && !hasSeatTiles) return false;
    return true;
  });

  const maxUsage = Math.ceil(targetCount * 0.4);
  const selected: ClueType[] = [];

  for (let i = 0; i < targetCount; i++) {
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
 * after MAX_FULL_RETRIES full retries.
 *
 * Quality goal: minimise trivial "direct pin" suspects (inRow + inColumn pair).
 * We track the best puzzle found so far (fewest direct pins) and return it
 * after MAX_FULL_RETRIES even if the ideal pin count isn't achieved.
 * This guarantees no PuzzleGenerationError while improving quality where possible.
 */
export function generatePuzzle(seed: number, theme: Theme, difficulty: Difficulty): Puzzle {
  const MAX_FULL_RETRIES = 40; // more retries to find low-pin arrangements

  // Target: at most this many suspects directly pinned (inRow + inColumn pair)
  // Hard:   ceil(N * 0.5) — at most half directly pinned
  // Medium: ceil(N * 0.6) — at most 60% directly pinned
  // Easy:   N (no limit — beginners need full guidance)
  function pinTarget(N: number): number {
    if (difficulty === 'easy') return N;
    if (difficulty === 'medium') return Math.ceil(N * 0.6);
    return Math.ceil(N * 0.5); // hard
  }

  // Best puzzle found so far (fewest direct pins)
  let bestPuzzle: Puzzle | null = null;
  let bestPins = Infinity;
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

    // Select N suspect names by index (not random) — guarantees A→B→C order on the grid
    // suspectNames[0] = A-name, suspectNames[1] = B-name, etc.
    const suspectNames = theme.suspectNames.slice(0, N);
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

    // Generate primary clues — targetCount clues across a PRNG-shuffled subset of suspects.
    // Harder difficulties target fewer primary clues (see targetClueCount()).
    // The solver uniqueness loop adds extra clues if needed.
    const clueTypes = selectClueTypes(rng, N, difficulty, fp);
    const targetCount = clueTypes.length; // already reduced by difficulty
    const clues: Clue[] = [];

    // Shuffle suspect order so the clue-less suspects vary by seed (not always the last ones)
    const suspectOrder = shuffled(rng, [...suspects]);

    for (let i = 0; i < targetCount; i++) {
      const suspect = suspectOrder[i];
      const type = clueTypes[i];

      // Try the desired type; fall back through all quality types,
      // then finally to raw inRow/inColumn as last resort.
      let clue = generateClue(rng, fp, theme, type, suspect, suspects, solution);
      if (!clue) {
        clue = generateClue(rng, fp, theme, 'inRow', suspect, suspects, solution);
      }
      if (!clue) {
        clue = generateClue(rng, fp, theme, 'inColumn', suspect, suspects, solution);
      }
      if (clue) clues.push(clue);
    }

    // ── Uniqueness enforcement ─────────────────────────────────────────────
    // Add inRow clues first, then inColumn — but prefer giving inColumn to
    // suspects that don't already have inRow (avoids trivial direct pins).
    // This is a small improvement over the original flat inRow→inColumn approach.
    let solverResult = countSolutions(fp, suspects.map(s => s.id), clues);

    if (solverResult.count === 0) continue; // solution pruned — retry

    if (solverResult.count !== 1) {
      // Pass 1: inRow for suspects without one
      for (const suspect of suspects) {
        if (solverResult.count === 1) break;
        if (clues.some(c => c.type === 'inRow' && c.suspectId === suspect.id)) continue;
        const extraClue = generateClue(rng, fp, theme, 'inRow', suspect, suspects, solution);
        if (extraClue) clues.push(extraClue);
        solverResult = countSolutions(fp, suspects.map(s => s.id), clues);
      }
    }

    if (solverResult.count !== 1) {
      // Pass 2: inColumn, prioritising suspects WITHOUT inRow (avoids direct pin pairs)
      const withoutRow = suspects.filter(s => !clues.some(c => c.type === 'inRow' && c.suspectId === s.id));
      const withRow    = suspects.filter(s =>  clues.some(c => c.type === 'inRow' && c.suspectId === s.id));
      for (const suspect of [...withoutRow, ...withRow]) {
        if (solverResult.count === 1) break;
        if (clues.some(c => c.type === 'inColumn' && c.suspectId === suspect.id)) continue;
        const extraClue = generateClue(rng, fp, theme, 'inColumn', suspect, suspects, solution);
        if (extraClue) clues.push(extraClue);
        solverResult = countSolutions(fp, suspects.map(s => s.id), clues);
      }
    }

    if (solverResult.count !== 1) continue; // still not unique — retry

    // Count direct-pin suspects (inRow + inColumn for same suspect)
    const directPins = suspects.filter(s =>
      clues.some(c => c.type === 'inRow'    && c.suspectId === s.id) &&
      clues.some(c => c.type === 'inColumn' && c.suspectId === s.id)
    ).length;

    const candidate: Puzzle = {
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

    // Accept immediately if pin count meets the target
    if (directPins <= pinTarget(N)) {
      return candidate;
    }

    // Otherwise, remember as the best found so far and keep searching
    if (directPins < bestPins) {
      bestPins = directPins;
      bestPuzzle = candidate;
    }
  }

  // Return the best puzzle found (lowest direct pins), or throw if none
  if (bestPuzzle) return bestPuzzle;

  throw new PuzzleGenerationError(
    `Failed to generate unique puzzle after ${MAX_FULL_RETRIES} retries (seed=${seed}, theme=${theme.id}, difficulty=${difficulty})`
  );
}
