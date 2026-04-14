/**
 * Logic — Rule of One, spatial mask, win condition, victim cell derivation.
 * Pure functions only. No DOM, no side effects.
 */

import type { FloorPlanDef } from '../themes/floor-plans';
import { isPlaceable, getRoomAt } from './grid';

export interface SuspectPlacement {
  suspectId: string;
  x: number;
  y: number;
}

/**
 * Given current placements, returns the set of blocked row indices
 * and blocked column indices (Rule of One).
 */
export function getSpatialMask(placements: readonly SuspectPlacement[]): {
  blockedRows: ReadonlySet<number>;
  blockedCols: ReadonlySet<number>;
} {
  const blockedRows = new Set<number>();
  const blockedCols = new Set<number>();
  for (const p of placements) {
    blockedRows.add(p.y);
    blockedCols.add(p.x);
  }
  return { blockedRows, blockedCols };
}

/**
 * Returns the unique victim cell: the single placeable cell whose
 * row and column are not occupied by any suspect.
 * Returns null if no such cell exists or if multiple such cells exist.
 */
export function getVictimCell(
  fp: FloorPlanDef,
  placements: readonly SuspectPlacement[],
): { x: number; y: number } | null {
  const { blockedRows, blockedCols } = getSpatialMask(placements);
  const candidates: Array<{ x: number; y: number }> = [];

  for (let y = 0; y < fp.height; y++) {
    if (blockedRows.has(y)) continue;
    for (let x = 0; x < fp.width; x++) {
      if (blockedCols.has(x)) continue;
      if (isPlaceable(fp.tiles[y][x])) {
        candidates.push({ x, y });
      }
    }
  }

  return candidates.length === 1 ? candidates[0] : null;
}

/**
 * Determines the killer: the suspect whose room contains the victim cell.
 * Returns null if no suspect shares a room with the victim.
 */
export function getKiller(
  fp: FloorPlanDef,
  placements: readonly SuspectPlacement[],
  victimCell: { x: number; y: number },
): string | null {
  const victimRoom = getRoomAt(fp, victimCell.x, victimCell.y);
  if (victimRoom === null) return null;

  for (const placement of placements) {
    const suspectRoom = getRoomAt(fp, placement.x, placement.y);
    if (suspectRoom === victimRoom) return placement.suspectId;
  }
  return null;
}

/**
 * Win condition: all N suspects placed, all clues satisfied, victim cell is unique.
 * Does NOT validate clue satisfaction — that is checked separately in clues.ts.
 */
export function isWinConditionStructurallyMet(
  fp: FloorPlanDef,
  placements: readonly SuspectPlacement[],
  expectedN: number,
): boolean {
  if (placements.length !== expectedN) return false;
  return getVictimCell(fp, placements) !== null;
}
