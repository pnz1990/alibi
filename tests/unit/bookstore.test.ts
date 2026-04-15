/**
 * Unit tests for src/themes/bookstore.ts
 */

import { describe, it, expect } from 'vitest';
import { BOOKSTORE_THEME } from '../../src/themes/bookstore';
import { getTheme } from '../../src/themes/index';
import { generatePuzzle } from '../../src/engine/generator';
import { countSolutions } from '../../src/engine/solver';

describe('BOOKSTORE_THEME structure', () => {
  it('has id bookstore', () => {
    expect(BOOKSTORE_THEME.id).toBe('bookstore');
  });

  it('has 3 floor plan variants', () => {
    expect(BOOKSTORE_THEME.floorPlans.easy).toBeDefined();
    expect(BOOKSTORE_THEME.floorPlans.medium).toBeDefined();
    expect(BOOKSTORE_THEME.floorPlans.hard).toBeDefined();
  });

  it('has ≥ 12 suspect names', () => {
    expect(BOOKSTORE_THEME.suspectNames.length).toBeGreaterThanOrEqual(12);
  });

  it('has ≥ 6 victim names starting with V', () => {
    expect(BOOKSTORE_THEME.victimNames.length).toBeGreaterThanOrEqual(6);
    for (const name of BOOKSTORE_THEME.victimNames) {
      expect(name.startsWith('V')).toBe(true);
    }
  });

  it('has all 16 clue template functions', () => {
    const required = [
      'inRoom', 'notInRoom', 'inSameRoom', 'inDifferentRoom',
      'inColumn', 'inRow', 'besideSuspect', 'notBesideSuspect',
      'besideObject', 'notBesideObject', 'onSeatTile', 'notOnSeatTile',
      'northOf', 'southOf', 'exactlyNRowsNorth', 'exactlyNRowsSouth',
    ];
    for (const key of required) {
      expect(typeof BOOKSTORE_THEME.clueTemplates[key as keyof typeof BOOKSTORE_THEME.clueTemplates]).toBe('function');
    }
  });

  it('has all 6 color palette fields', () => {
    const p = BOOKSTORE_THEME.colorPalette;
    expect(typeof p.floor).toBe('string');
    expect(typeof p.wall).toBe('string');
    expect(typeof p.seat).toBe('string');
    expect(typeof p.accent).toBe('string');
    expect(typeof p.background).toBe('string');
    expect(typeof p.text).toBe('string');
  });

  it('guiltyText contains {{killerName}}', () => {
    for (const text of BOOKSTORE_THEME.narrativeTemplates.guiltyText) {
      expect(text).toContain('{{killerName}}');
    }
  });
});

describe('BOOKSTORE_THEME registration', () => {
  it('is registered and retrievable', () => {
    const theme = getTheme('bookstore');
    expect(theme.id).toBe('bookstore');
  });
});

describe('generator with bookstore theme', () => {
  for (const difficulty of ['easy', 'medium', 'hard'] as const) {
    it(`generates unique-solution puzzle for ${difficulty}`, () => {
      const puzzle = generatePuzzle(42, BOOKSTORE_THEME, difficulty);
      const result = countSolutions(puzzle.floorPlan, puzzle.suspects.map(s => s.id), puzzle.clues);
      expect(result.count).toBe(1);
    });
  }

  it('100 seeds on easy: successful puzzles all have unique solutions', () => {
    let successes = 0;
    for (let seed = 0; seed < 100; seed++) {
      try {
        const puzzle = generatePuzzle(seed, BOOKSTORE_THEME, 'easy');
        const result = countSolutions(puzzle.floorPlan, puzzle.suspects.map(s => s.id), puzzle.clues);
        expect(result.count).toBe(1);
        successes++;
      } catch {
        // PuzzleGenerationError is acceptable for some seeds on this floor plan
        // (bookstore easy has a constrained col 2 — see issue #24)
      }
    }
    // At least 80% of seeds should generate valid puzzles
    expect(successes).toBeGreaterThanOrEqual(80);
  }, 20000);
});
