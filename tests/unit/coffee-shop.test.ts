/**
 * Unit tests for src/themes/coffee-shop.ts
 * TDD: these tests were written before the implementation.
 */

import { describe, it, expect } from 'vitest';
import { COFFEE_SHOP_THEME } from '../../src/themes/coffee-shop';
import { getTheme } from '../../src/themes/index';
import { generatePuzzle } from '../../src/engine/generator';
import { countSolutions } from '../../src/engine/solver';

describe('COFFEE_SHOP_THEME structure', () => {
  it('has id coffee-shop', () => {
    expect(COFFEE_SHOP_THEME.id).toBe('coffee-shop');
  });

  it('has a name', () => {
    expect(typeof COFFEE_SHOP_THEME.name).toBe('string');
    expect(COFFEE_SHOP_THEME.name.length).toBeGreaterThan(0);
  });

  it('has 3 floor plan variants', () => {
    expect(COFFEE_SHOP_THEME.floorPlans.easy).toBeDefined();
    expect(COFFEE_SHOP_THEME.floorPlans.medium).toBeDefined();
    expect(COFFEE_SHOP_THEME.floorPlans.hard).toBeDefined();
  });

  it('has ≥ 12 suspect names', () => {
    expect(COFFEE_SHOP_THEME.suspectNames.length).toBeGreaterThanOrEqual(12);
  });

  it('has ≥ 6 victim names starting with V', () => {
    expect(COFFEE_SHOP_THEME.victimNames.length).toBeGreaterThanOrEqual(6);
    for (const name of COFFEE_SHOP_THEME.victimNames) {
      expect(name.startsWith('V')).toBe(true);
    }
  });

  it('has all 16 clue template functions', () => {
    const templates = COFFEE_SHOP_THEME.clueTemplates;
    const required = [
      'inRoom', 'notInRoom', 'inSameRoom', 'inDifferentRoom',
      'inColumn', 'inRow', 'besideSuspect', 'notBesideSuspect',
      'besideObject', 'notBesideObject', 'onSeatTile', 'notOnSeatTile',
      'northOf', 'southOf', 'exactlyNRowsNorth', 'exactlyNRowsSouth',
    ];
    for (const key of required) {
      expect(typeof templates[key as keyof typeof templates]).toBe('function');
    }
  });

  it('clue templates return strings', () => {
    const t = COFFEE_SHOP_THEME.clueTemplates;
    expect(typeof t.inRoom('Alice', 'Bar')).toBe('string');
    expect(typeof t.notInRoom('Bob', 'Restroom')).toBe('string');
    expect(typeof t.inColumn('Carol', 2)).toBe('string');
    expect(typeof t.inRow('Dave', 3)).toBe('string');
    expect(typeof t.exactlyNRowsNorth('Eve', 'Frank', 1)).toBe('string');
    expect(typeof t.exactlyNRowsSouth('Grace', 'Henry', 2)).toBe('string');
    expect(typeof t.notOnSeatTile('Iris')).toBe('string');
    expect(typeof t.onSeatTile('Jack', 'chair')).toBe('string');
  });

  it('has narrative templates with ≥ 3 variants each', () => {
    expect(COFFEE_SHOP_THEME.narrativeTemplates.intro.length).toBeGreaterThanOrEqual(3);
    expect(COFFEE_SHOP_THEME.narrativeTemplates.victimFound.length).toBeGreaterThanOrEqual(3);
    expect(COFFEE_SHOP_THEME.narrativeTemplates.guiltyText.length).toBeGreaterThanOrEqual(3);
  });

  it('guiltyText variants contain {{killerName}}', () => {
    for (const text of COFFEE_SHOP_THEME.narrativeTemplates.guiltyText) {
      expect(text).toContain('{{killerName}}');
    }
  });

  it('has all 6 color palette fields as strings', () => {
    const p = COFFEE_SHOP_THEME.colorPalette;
    expect(typeof p.floor).toBe('string');
    expect(typeof p.wall).toBe('string');
    expect(typeof p.seat).toBe('string');
    expect(typeof p.accent).toBe('string');
    expect(typeof p.background).toBe('string');
    expect(typeof p.text).toBe('string');
  });

  it('spriteMap covers coffee-shop object types', () => {
    const keys = Object.keys(COFFEE_SHOP_THEME.spriteMap);
    // At minimum the objects present in the floor plans
    expect(keys).toContain('object:bar-counter');
    expect(keys).toContain('object:plant');
    expect(keys).toContain('object:cash-register');
  });
});

describe('COFFEE_SHOP_THEME registration', () => {
  it('is registered and retrievable by id', () => {
    // getTheme throws if not registered — if this doesn't throw, the theme is registered
    const theme = getTheme('coffee-shop');
    expect(theme.id).toBe('coffee-shop');
  });
});

describe('generator with coffee-shop theme', () => {
  it('generates a valid puzzle for easy difficulty', () => {
    const puzzle = generatePuzzle(42, COFFEE_SHOP_THEME, 'easy');
    const result = countSolutions(
      puzzle.floorPlan,
      puzzle.suspects.map(s => s.id),
      puzzle.clues,
    );
    expect(result.count).toBe(1);
  });

  it('generates a valid puzzle for medium difficulty', () => {
    const puzzle = generatePuzzle(42, COFFEE_SHOP_THEME, 'medium');
    const result = countSolutions(
      puzzle.floorPlan,
      puzzle.suspects.map(s => s.id),
      puzzle.clues,
    );
    expect(result.count).toBe(1);
  });

  it('generates a valid puzzle for hard difficulty', () => {
    const puzzle = generatePuzzle(42, COFFEE_SHOP_THEME, 'hard');
    const result = countSolutions(
      puzzle.floorPlan,
      puzzle.suspects.map(s => s.id),
      puzzle.clues,
    );
    expect(result.count).toBe(1);
  });

  it('100 seeds on easy all produce unique-solution puzzles', () => {
    for (let seed = 0; seed < 100; seed++) {
      const puzzle = generatePuzzle(seed, COFFEE_SHOP_THEME, 'easy');
      const result = countSolutions(
        puzzle.floorPlan,
        puzzle.suspects.map(s => s.id),
        puzzle.clues,
      );
      expect(result.count).toBe(1);
    }
  }, 20000);
});
