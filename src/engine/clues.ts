/**
 * All 16 clue type evaluators — pure functions.
 * Each evaluator returns true if the clue is satisfied by the given placements.
 *
 * Spatial conventions:
 *   x = column (0-indexed from left)
 *   y = row (0-indexed from top)
 *   North = smaller y (up)
 *   South = larger y (down)
 *
 * Chebyshev distance: max(|ax-bx|, |ay-by|) — includes diagonals.
 */

import type { FloorPlanDef } from '../themes/floor-plans';
import { isSeatTile, getRoomAt } from './grid';
import type { SuspectPlacement } from './logic';

export type ClueType =
  | 'inRoom' | 'notInRoom'
  | 'inSameRoom' | 'inDifferentRoom'
  | 'inColumn' | 'inRow'
  | 'besideSuspect' | 'notBesideSuspect'
  | 'besideObject' | 'notBesideObject'
  | 'onSeatTile' | 'notOnSeatTile'
  | 'northOf' | 'southOf'
  | 'exactlyNRowsNorth' | 'exactlyNRowsSouth';

export interface Clue {
  type: ClueType;
  suspectId: string;
  /** For inRoom/notInRoom: the target room id */
  roomId?: string;
  /** For inSameRoom/inDifferentRoom/besideSuspect/notBesideSuspect/northOf/southOf/exactlyN*: second suspect id */
  otherSuspectId?: string;
  /** For inColumn: 0-indexed column */
  col?: number;
  /** For inRow: 0-indexed row */
  row?: number;
  /** For besideObject/notBesideObject: object tile code (e.g. 'pL', 'tB') */
  objectTile?: string;
  /** For exactlyNRows*: the row offset n */
  n?: number;
  /** Natural-language text for display */
  text: string;
}

/**
 * Chebyshev distance between two cells.
 */
function chebyshev(ax: number, ay: number, bx: number, by: number): number {
  return Math.max(Math.abs(ax - bx), Math.abs(ay - by));
}

/**
 * Evaluates whether a single clue is satisfied given the full set of placements.
 * Returns true if satisfied, false otherwise.
 * If a referenced suspect is not yet placed, returns null (unknown).
 */
export function evaluateClue(
  fp: FloorPlanDef,
  clue: Clue,
  placements: ReadonlyMap<string, SuspectPlacement>,
): boolean | null {
  const p = placements.get(clue.suspectId);
  if (!p) return null; // suspect not placed yet

  switch (clue.type) {
    case 'inRoom': {
      const room = getRoomAt(fp, p.x, p.y);
      return room === clue.roomId;
    }

    case 'notInRoom': {
      const room = getRoomAt(fp, p.x, p.y);
      return room !== clue.roomId;
    }

    case 'inSameRoom': {
      const q = placements.get(clue.otherSuspectId!);
      if (!q) return null;
      const roomA = getRoomAt(fp, p.x, p.y);
      const roomB = getRoomAt(fp, q.x, q.y);
      return roomA !== null && roomA === roomB;
    }

    case 'inDifferentRoom': {
      const q = placements.get(clue.otherSuspectId!);
      if (!q) return null;
      const roomA = getRoomAt(fp, p.x, p.y);
      const roomB = getRoomAt(fp, q.x, q.y);
      if (roomA === null || roomB === null) return null;
      return roomA !== roomB;
    }

    case 'inColumn':
      return p.x === clue.col;

    case 'inRow':
      return p.y === clue.row;

    case 'besideSuspect': {
      const q = placements.get(clue.otherSuspectId!);
      if (!q) return null;
      return chebyshev(p.x, p.y, q.x, q.y) <= 1;
    }

    case 'notBesideSuspect': {
      const q = placements.get(clue.otherSuspectId!);
      if (!q) return null;
      return chebyshev(p.x, p.y, q.x, q.y) > 1;
    }

    case 'besideObject': {
      // Check if any adjacent (chebyshev ≤ 1) cell has the target object tile
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = p.x + dx;
          const ny = p.y + dy;
          if (nx < 0 || ny < 0 || nx >= fp.width || ny >= fp.height) continue;
          if (fp.tiles[ny][nx] === clue.objectTile) return true;
        }
      }
      return false;
    }

    case 'notBesideObject': {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = p.x + dx;
          const ny = p.y + dy;
          if (nx < 0 || ny < 0 || nx >= fp.width || ny >= fp.height) continue;
          if (fp.tiles[ny][nx] === clue.objectTile) return false;
        }
      }
      return true;
    }

    case 'onSeatTile':
      return isSeatTile(fp.tiles[p.y][p.x]);

    case 'notOnSeatTile':
      return !isSeatTile(fp.tiles[p.y][p.x]);

    case 'northOf': {
      // A.y < B.y (any row above, not exact)
      const q = placements.get(clue.otherSuspectId!);
      if (!q) return null;
      return p.y < q.y;
    }

    case 'southOf': {
      // A.y > B.y (any row below, not exact)
      const q = placements.get(clue.otherSuspectId!);
      if (!q) return null;
      return p.y > q.y;
    }

    case 'exactlyNRowsNorth': {
      // B.y - A.y == n  (A is north of B by exactly n)
      const q = placements.get(clue.otherSuspectId!);
      if (!q) return null;
      return q.y - p.y === clue.n;
    }

    case 'exactlyNRowsSouth': {
      // A.y - B.y == n  (A is south of B by exactly n)
      const q = placements.get(clue.otherSuspectId!);
      if (!q) return null;
      return p.y - q.y === clue.n;
    }
  }
}

/**
 * Evaluates all clues. Returns:
 * - satisfied: clues that evaluate to true
 * - violated: clues that evaluate to false
 * - unknown: clues with an unplaced suspect (null result)
 */
export function evaluateAllClues(
  fp: FloorPlanDef,
  clues: readonly Clue[],
  placements: ReadonlyMap<string, SuspectPlacement>,
): {
  satisfied: Clue[];
  violated: Clue[];
  unknown: Clue[];
} {
  const satisfied: Clue[] = [];
  const violated: Clue[] = [];
  const unknown: Clue[] = [];

  for (const clue of clues) {
    const result = evaluateClue(fp, clue, placements);
    if (result === true) satisfied.push(clue);
    else if (result === false) violated.push(clue);
    else unknown.push(clue);
  }

  return { satisfied, violated, unknown };
}

/** Allowed clue types per difficulty level */
export const ALLOWED_CLUE_TYPES: Record<string, ClueType[]> = {
  easy: [
    'inRoom', 'notInRoom', 'inColumn', 'inRow', 'inSameRoom', 'inDifferentRoom',
  ],
  medium: [
    'inRoom', 'notInRoom', 'inColumn', 'inRow', 'inSameRoom', 'inDifferentRoom',
    'besideSuspect', 'notBesideSuspect', 'besideObject', 'notBesideObject', 'onSeatTile',
  ],
  hard: [
    'inRoom', 'notInRoom', 'inColumn', 'inRow', 'inSameRoom', 'inDifferentRoom',
    'besideSuspect', 'notBesideSuspect', 'besideObject', 'notBesideObject',
    'onSeatTile', 'notOnSeatTile',
    'northOf', 'southOf', 'exactlyNRowsNorth', 'exactlyNRowsSouth',
  ],
};
