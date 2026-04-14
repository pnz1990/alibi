/**
 * Unit tests for src/engine/grid.ts
 */

import { describe, it, expect } from 'vitest';
import {
  isPlaceable, isWall, isSeatTile, isObjectTile,
  getValidCols, getValidRows, getRoomAt,
  isValidPlacement, getAllPlaceableCells,
} from '../../src/engine/grid';
import { coffeeShopEasy, backyardMedium } from '../../src/themes/floor-plans';
import type { Tile } from '../../src/themes/floor-plans';

describe('isPlaceable', () => {
  it('returns true for floor', () => expect(isPlaceable('F')).toBe(true));
  it('returns true for chair', () => expect(isPlaceable('C')).toBe(true));
  it('returns true for sofa', () => expect(isPlaceable('S')).toBe(true));
  it('returns true for bed', () => expect(isPlaceable('B')).toBe(true));
  it('returns false for wall', () => expect(isPlaceable('W')).toBe(false));
  it('returns false for plant', () => expect(isPlaceable('pL')).toBe(false));
  it('returns false for jacuzzi', () => expect(isPlaceable('jZ')).toBe(false));
  it('returns false for cash register', () => expect(isPlaceable('cR')).toBe(false));
});

describe('isWall', () => {
  it('returns true for W', () => expect(isWall('W')).toBe(true));
  it('returns false for floor', () => expect(isWall('F')).toBe(false));
});

describe('isSeatTile', () => {
  it('returns true for C, S, B', () => {
    expect(isSeatTile('C')).toBe(true);
    expect(isSeatTile('S')).toBe(true);
    expect(isSeatTile('B')).toBe(true);
  });
  it('returns false for floor', () => expect(isSeatTile('F')).toBe(false));
});

describe('isObjectTile', () => {
  it('returns true for plant', () => expect(isObjectTile('pL')).toBe(true));
  it('returns true for bar counter', () => expect(isObjectTile('bB')).toBe(true));
  it('returns false for floor', () => expect(isObjectTile('F')).toBe(false));
});

describe('getValidCols — coffeeShopEasy (5×6)', () => {
  it('returns 5 valid columns', () => {
    const cols = getValidCols(coffeeShopEasy);
    expect(cols).toHaveLength(5);
    expect(cols).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('getValidRows — coffeeShopEasy (5×6)', () => {
  it('returns 5 valid rows (row 0 has only objects/walls)', () => {
    const rows = getValidRows(coffeeShopEasy);
    expect(rows).toHaveLength(5);
    expect(rows).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('getValidRows — backyardMedium (6×7)', () => {
  it('skips all-wall row 3', () => {
    const rows = getValidRows(backyardMedium);
    expect(rows).not.toContain(3);
    expect(rows).toHaveLength(6);
  });
});

describe('getRoomAt — coffeeShopEasy', () => {
  it('returns bar for cells in bar room', () => {
    expect(getRoomAt(coffeeShopEasy, 0, 1)).toBe('bar');
    expect(getRoomAt(coffeeShopEasy, 2, 1)).toBe('bar');
  });

  it('returns main-area for mid cells', () => {
    expect(getRoomAt(coffeeShopEasy, 1, 2)).toBe('main-area');
    expect(getRoomAt(coffeeShopEasy, 3, 3)).toBe('main-area');
  });

  it('returns restroom for bottom-right', () => {
    expect(getRoomAt(coffeeShopEasy, 3, 5)).toBe('restroom');
    expect(getRoomAt(coffeeShopEasy, 4, 5)).toBe('restroom');
  });

  it('returns null for a wall cell with no room', () => {
    // (3,0) is W and not in any room
    expect(getRoomAt(coffeeShopEasy, 3, 0)).toBe(null);
  });
});

describe('isValidPlacement', () => {
  const fp = coffeeShopEasy;

  it('allows placement on a free placeable cell', () => {
    expect(isValidPlacement(fp, 1, 1, new Set(), new Set())).toBe(true);
  });

  it('rejects placement on occupied row', () => {
    expect(isValidPlacement(fp, 1, 1, new Set([1]), new Set())).toBe(false);
  });

  it('rejects placement on occupied column', () => {
    expect(isValidPlacement(fp, 1, 1, new Set(), new Set([1]))).toBe(false);
  });

  it('rejects placement on wall', () => {
    expect(isValidPlacement(fp, 3, 0, new Set(), new Set())).toBe(false);
  });

  it('rejects placement on object tile', () => {
    // (0,0) is bB (bar counter object)
    expect(isValidPlacement(fp, 0, 0, new Set(), new Set())).toBe(false);
  });

  it('rejects out-of-bounds', () => {
    expect(isValidPlacement(fp, -1, 0, new Set(), new Set())).toBe(false);
    expect(isValidPlacement(fp, 10, 10, new Set(), new Set())).toBe(false);
  });
});

describe('getAllPlaceableCells — coffeeShopEasy', () => {
  it('returns only placeable cells', () => {
    const cells = getAllPlaceableCells(coffeeShopEasy);
    for (const cell of cells) {
      const tile = coffeeShopEasy.tiles[cell.y][cell.x];
      expect(['F','C','S','B']).toContain(tile);
    }
  });

  it('returns at least 5 cells (one per suspect)', () => {
    expect(getAllPlaceableCells(coffeeShopEasy).length).toBeGreaterThanOrEqual(5);
  });
});
