/**
 * Grid model — tile types, zones, placement validation.
 * Pure functions only. No DOM, no side effects.
 */

import type { FloorPlanDef, Tile } from '../themes/floor-plans';

export type { Tile };

/** Tiles on which a suspect may be placed */
const PLACEABLE_TILES: ReadonlySet<Tile> = new Set(['F', 'C', 'S', 'B']);

/** Tiles that represent objects (landmarks, not placeable) */
const OBJECT_TILE_PREFIXES = [
  'pL','tB','sH','cR','bB','tV','cT','dK','pC','fB',
  'hB','mC','tR','tD','cH','tM','wT','sT',
] as const;

/** jZ (jacuzzi water) is not placeable */
const UNPLACEABLE_OBJECT_TILES: ReadonlySet<Tile> = new Set(['jZ', ...OBJECT_TILE_PREFIXES] as Tile[]);

export function isPlaceable(tile: Tile): boolean {
  return PLACEABLE_TILES.has(tile);
}

export function isWall(tile: Tile): boolean {
  return tile === 'W';
}

export function isSeatTile(tile: Tile): boolean {
  return tile === 'C' || tile === 'S' || tile === 'B';
}

export function isObjectTile(tile: Tile): boolean {
  return UNPLACEABLE_OBJECT_TILES.has(tile);
}

/**
 * Derive valid column indices: columns that contain ≥1 placeable cell.
 */
export function getValidCols(fp: FloorPlanDef): number[] {
  const valid: number[] = [];
  for (let x = 0; x < fp.width; x++) {
    for (let y = 0; y < fp.height; y++) {
      if (isPlaceable(fp.tiles[y][x])) {
        valid.push(x);
        break;
      }
    }
  }
  return valid;
}

/**
 * Derive valid row indices: rows that contain ≥1 placeable cell.
 */
export function getValidRows(fp: FloorPlanDef): number[] {
  const valid: number[] = [];
  for (let y = 0; y < fp.height; y++) {
    for (let x = 0; x < fp.width; x++) {
      if (isPlaceable(fp.tiles[y][x])) {
        valid.push(y);
        break;
      }
    }
  }
  return valid;
}

/**
 * Returns the room id for a given (x,y) cell, or null if the cell is in no room.
 */
export function getRoomAt(fp: FloorPlanDef, x: number, y: number): string | null {
  for (const room of fp.rooms) {
    for (const [cx, cy] of room.cells) {
      if (cx === x && cy === y) return room.id;
    }
  }
  return null;
}

/**
 * Check whether placing a suspect at (x, y) is valid given the current
 * set of occupied rows and columns (the Rule of One).
 */
export function isValidPlacement(
  fp: FloorPlanDef,
  x: number,
  y: number,
  occupiedRows: ReadonlySet<number>,
  occupiedCols: ReadonlySet<number>,
): boolean {
  if (x < 0 || x >= fp.width || y < 0 || y >= fp.height) return false;
  if (!isPlaceable(fp.tiles[y][x])) return false;
  if (occupiedRows.has(y)) return false;
  if (occupiedCols.has(x)) return false;
  return true;
}

/**
 * Returns all placeable cells at the intersection of a given row and column.
 * (Usually 0 or 1 cell, but floors could have objects blocking.)
 */
export function getPlaceableCellsAt(fp: FloorPlanDef, row: number, col: number): Array<{ x: number; y: number; tile: Tile }> {
  const cell = fp.tiles[row]?.[col];
  if (cell === undefined || !isPlaceable(cell)) return [];
  return [{ x: col, y: row, tile: cell }];
}

/**
 * All placeable cells in the floor plan.
 */
export function getAllPlaceableCells(fp: FloorPlanDef): Array<{ x: number; y: number; tile: Tile }> {
  const result: Array<{ x: number; y: number; tile: Tile }> = [];
  for (let y = 0; y < fp.height; y++) {
    for (let x = 0; x < fp.width; x++) {
      const tile = fp.tiles[y][x];
      if (isPlaceable(tile)) result.push({ x, y, tile });
    }
  }
  return result;
}
