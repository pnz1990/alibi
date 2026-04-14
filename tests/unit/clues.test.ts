/**
 * Unit tests for src/engine/clues.ts
 * Tests all 16 clue type evaluators.
 */

import { describe, it, expect } from 'vitest';
import { evaluateClue, evaluateAllClues } from '../../src/engine/clues';
import { coffeeShopEasy } from '../../src/themes/floor-plans';
import type { Clue } from '../../src/engine/clues';
import type { SuspectPlacement } from '../../src/engine/logic';

const fp = coffeeShopEasy;

// Helper to build placement map
function pmap(entries: [string, { x: number; y: number }][]): ReadonlyMap<string, SuspectPlacement> {
  const m = new Map<string, SuspectPlacement>();
  for (const [id, pos] of entries) {
    m.set(id, { suspectId: id, x: pos.x, y: pos.y });
  }
  return m;
}

function clue(type: Clue['type'], suspectId: string, extras: Partial<Clue> = {}): Clue {
  return { type, suspectId, text: `test clue`, ...extras };
}

// s0 at (0,1) — Bar, floor tile F
// s1 at (3,2) — Main Area, floor tile F
// s2 at (1,3) — Main Area, chair tile C (actually let's check: (1,3) is C ✓)
// s3 at (4,5) — Restroom, chair C

const placements = pmap([
  ['s0', { x: 0, y: 1 }],  // Bar, F
  ['s1', { x: 3, y: 2 }],  // Main Area, F
  ['s2', { x: 1, y: 3 }],  // Main Area, C (chair)
  ['s3', { x: 4, y: 5 }],  // Restroom, C (chair)
]);

describe('inRoom', () => {
  it('returns true when suspect is in specified room', () => {
    const c = clue('inRoom', 's0', { roomId: 'bar' });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when suspect is in different room', () => {
    const c = clue('inRoom', 's0', { roomId: 'main-area' });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });

  it('returns null when suspect not placed', () => {
    const c = clue('inRoom', 'sx', { roomId: 'bar' });
    expect(evaluateClue(fp, c, placements)).toBeNull();
  });
});

describe('notInRoom', () => {
  it('returns true when suspect is not in specified room', () => {
    const c = clue('notInRoom', 's0', { roomId: 'restroom' });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when suspect is in specified room', () => {
    const c = clue('notInRoom', 's0', { roomId: 'bar' });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('inSameRoom', () => {
  it('returns true when both suspects in same room', () => {
    // s1 and s2 both in main-area
    const c = clue('inSameRoom', 's1', { otherSuspectId: 's2' });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when suspects in different rooms', () => {
    const c = clue('inSameRoom', 's0', { otherSuspectId: 's1' });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });

  it('returns null when other suspect not placed', () => {
    const c = clue('inSameRoom', 's0', { otherSuspectId: 'sx' });
    expect(evaluateClue(fp, c, placements)).toBeNull();
  });
});

describe('inDifferentRoom', () => {
  it('returns true when suspects in different rooms', () => {
    const c = clue('inDifferentRoom', 's0', { otherSuspectId: 's1' });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when suspects in same room', () => {
    const c = clue('inDifferentRoom', 's1', { otherSuspectId: 's2' });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('inColumn', () => {
  it('returns true when suspect is in specified column', () => {
    // s0 at x=0
    const c = clue('inColumn', 's0', { col: 0 });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when wrong column', () => {
    const c = clue('inColumn', 's0', { col: 2 });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('inRow', () => {
  it('returns true when suspect is in specified row', () => {
    // s0 at y=1
    const c = clue('inRow', 's0', { row: 1 });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when wrong row', () => {
    const c = clue('inRow', 's0', { row: 3 });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('besideSuspect (chebyshev ≤ 1)', () => {
  it('returns true when suspects are adjacent (distance 1)', () => {
    // s0 (0,1) and s1 (3,2) are NOT adjacent. Let's find adjacent pair.
    // s1 (3,2) and s2 (1,3) — distance: max(|3-1|,|2-3|) = max(2,1) = 2 → NOT beside
    // Need to adjust — let me test with s1(3,2) nearby
    // Actually use distance check directly: s0(0,1) adjacent to (1,2)?
    // Let me use a simple pair: diagonal is chebyshev 1
    // Actually none of our placements are within chebyshev 1 of each other
    // Let me create a specific test placement
    const local = pmap([
      ['a', { x: 0, y: 1 }],
      ['b', { x: 1, y: 2 }], // chebyshev distance to a: max(1,1)=1
    ]);
    const c = clue('besideSuspect', 'a', { otherSuspectId: 'b' });
    expect(evaluateClue(fp, c, local)).toBe(true);
  });

  it('returns false when suspects are far apart', () => {
    // s0(0,1) and s3(4,5) — distance: max(4,4)=4
    const c = clue('besideSuspect', 's0', { otherSuspectId: 's3' });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('notBesideSuspect', () => {
  it('returns true when suspects are far apart', () => {
    const c = clue('notBesideSuspect', 's0', { otherSuspectId: 's3' });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when suspects are adjacent', () => {
    const local = pmap([
      ['a', { x: 0, y: 1 }],
      ['b', { x: 1, y: 1 }],
    ]);
    const c = clue('notBesideSuspect', 'a', { otherSuspectId: 'b' });
    expect(evaluateClue(fp, c, local)).toBe(false);
  });
});

describe('besideObject', () => {
  // coffeeShopEasy: bB at (0,0),(1,0),(2,0), pL at (0,2),(4,3), cR at (1,5)
  it('returns true when suspect is beside an object tile', () => {
    // s0 is at (0,1) — adjacent to bB at (0,0) (above, distance 1)
    const c = clue('besideObject', 's0', { objectTile: 'bB' });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when suspect is not beside the object tile', () => {
    // s3 at (4,5) is near cR at (1,5)? distance: max(|4-1|,0)=3 → not beside
    const c = clue('besideObject', 's3', { objectTile: 'bB' });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('notBesideObject', () => {
  it('returns true when suspect is not beside the object tile', () => {
    const c = clue('notBesideObject', 's3', { objectTile: 'bB' });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when suspect is beside the object tile', () => {
    const c = clue('notBesideObject', 's0', { objectTile: 'bB' });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('onSeatTile', () => {
  it('returns true when suspect is on a seat tile', () => {
    // s2 at (1,3) — tile is C (chair)
    const c = clue('onSeatTile', 's2');
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when suspect is on a floor tile', () => {
    // s0 at (0,1) — tile is F
    const c = clue('onSeatTile', 's0');
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('notOnSeatTile', () => {
  it('returns true for floor tile', () => {
    const c = clue('notOnSeatTile', 's0');
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false for chair tile', () => {
    const c = clue('notOnSeatTile', 's2');
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('northOf (A.y < B.y)', () => {
  it('returns true when A is north of B', () => {
    // s0(0,1) is north of s2(1,3) because 1 < 3
    const c = clue('northOf', 's0', { otherSuspectId: 's2' });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when A is south of B', () => {
    // s2(1,3) is NOT north of s0(0,1)
    const c = clue('northOf', 's2', { otherSuspectId: 's0' });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('southOf (A.y > B.y)', () => {
  it('returns true when A is south of B', () => {
    const c = clue('southOf', 's2', { otherSuspectId: 's0' });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false when A is north of B', () => {
    const c = clue('southOf', 's0', { otherSuspectId: 's2' });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('exactlyNRowsNorth (B.y - A.y == n)', () => {
  it('returns true for exact offset', () => {
    // s0 at y=1, s2 at y=3 → s0 is 2 rows north of s2
    const c = clue('exactlyNRowsNorth', 's0', { otherSuspectId: 's2', n: 2 });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false for wrong offset', () => {
    const c = clue('exactlyNRowsNorth', 's0', { otherSuspectId: 's2', n: 1 });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('exactlyNRowsSouth (A.y - B.y == n)', () => {
  it('returns true for exact offset', () => {
    // s2 at y=3, s0 at y=1 → s2 is 2 rows south of s0
    const c = clue('exactlyNRowsSouth', 's2', { otherSuspectId: 's0', n: 2 });
    expect(evaluateClue(fp, c, placements)).toBe(true);
  });

  it('returns false for wrong offset', () => {
    const c = clue('exactlyNRowsSouth', 's2', { otherSuspectId: 's0', n: 3 });
    expect(evaluateClue(fp, c, placements)).toBe(false);
  });
});

describe('evaluateAllClues', () => {
  it('correctly categorizes satisfied, violated, unknown clues', () => {
    const clues: Clue[] = [
      clue('inRoom', 's0', { roomId: 'bar' }),        // satisfied
      clue('inRoom', 's0', { roomId: 'restroom' }),   // violated
      clue('inRow', 'sx', { row: 1 }),                // unknown (not placed)
    ];
    const result = evaluateAllClues(fp, clues, placements);
    expect(result.satisfied).toHaveLength(1);
    expect(result.violated).toHaveLength(1);
    expect(result.unknown).toHaveLength(1);
  });
});
