/**
 * Constraint solver — counts the number of valid solutions for a puzzle.
 * Returns early at count=2 (only needs to know if unique).
 * Must solve any valid puzzle in <100ms.
 *
 * Algorithm: constraint propagation + backtracking.
 * A "solution" is an assignment of N suspects to N distinct (row, col) pairs
 * such that:
 *   1. Each (row, col) is a placeable cell in the floor plan.
 *   2. All rows are distinct (Rule of One).
 *   3. All cols are distinct (Rule of One).
 *   4. All clues are satisfied.
 */

import type { FloorPlanDef } from '../themes/floor-plans';
import { isPlaceable, getValidCols, getValidRows } from './grid';
import { evaluateClue } from './clues';
import type { Clue } from './clues';
import type { SuspectPlacement } from './logic';

export interface SolverResult {
  /** Number of valid solutions found (capped at 2 — use === 1 to check uniqueness) */
  count: number;
  /** First found solution, if any */
  firstSolution?: ReadonlyMap<string, SuspectPlacement>;
}

/**
 * Count valid solutions. Returns early at count=2.
 */
export function countSolutions(
  fp: FloorPlanDef,
  suspectIds: readonly string[],
  clues: readonly Clue[],
): SolverResult {
  const validCols = getValidCols(fp);
  const validRows = getValidRows(fp);

  // The caller determines how many suspects to place (may be < min(validCols, validRows))
  if (suspectIds.length === 0) return { count: 0 };
  if (suspectIds.length > Math.min(validCols.length, validRows.length)) {
    return { count: 0 };
  }

  // Precompute all placeable cells indexed by (row, col)
  const placeableSet = new Set<string>();
  for (let y = 0; y < fp.height; y++) {
    for (let x = 0; x < fp.width; x++) {
      if (isPlaceable(fp.tiles[y][x])) {
        placeableSet.add(`${x},${y}`);
      }
    }
  }

  let count = 0;
  let firstSolution: ReadonlyMap<string, SuspectPlacement> | undefined;

  const placements = new Map<string, SuspectPlacement>();
  const usedRows = new Set<number>();
  const usedCols = new Set<number>();

  function backtrack(suspectIndex: number): void {
    if (count >= 2) return; // early exit

    if (suspectIndex === suspectIds.length) {
      // Check all clues are satisfied
      for (const clue of clues) {
        const result = evaluateClue(fp, clue, placements);
        if (result !== true) return;
      }
      count++;
      if (count === 1) {
        firstSolution = new Map(placements);
      }
      return;
    }

    const suspectId = suspectIds[suspectIndex];

    for (const row of validRows) {
      if (usedRows.has(row)) continue;
      for (const col of validCols) {
        if (usedCols.has(col)) continue;
        if (!placeableSet.has(`${col},${row}`)) continue;

        // Place suspect
        const placement: SuspectPlacement = { suspectId, x: col, y: row };
        placements.set(suspectId, placement);
        usedRows.add(row);
        usedCols.add(col);

        // Prune: check clues that only reference already-placed suspects
        let pruned = false;
        for (const clue of clues) {
          if (clue.suspectId === suspectId || clue.otherSuspectId === suspectId) {
            const result = evaluateClue(fp, clue, placements);
            if (result === false) {
              pruned = true;
              break;
            }
          }
        }

        if (!pruned) {
          backtrack(suspectIndex + 1);
        }

        // Undo
        placements.delete(suspectId);
        usedRows.delete(row);
        usedCols.delete(col);

        if (count >= 2) return;
      }
    }
  }

  backtrack(0);
  return { count, firstSolution };
}
