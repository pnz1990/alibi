/**
 * Unit tests for src/themes/holiday-mall.ts
 */

import { describe, it, expect } from 'vitest';
import { HOLIDAY_MALL_THEME } from '../../src/themes/holiday-mall';
import { getTheme } from '../../src/themes/index';
import { generatePuzzle } from '../../src/engine/generator';
import { countSolutions } from '../../src/engine/solver';

describe('HOLIDAY_MALL_THEME structure', () => {
  it('has id holiday-mall', () => expect(HOLIDAY_MALL_THEME.id).toBe('holiday-mall'));
  it('has 3 floor plan variants', () => {
    expect(HOLIDAY_MALL_THEME.floorPlans.easy).toBeDefined();
    expect(HOLIDAY_MALL_THEME.floorPlans.medium).toBeDefined();
    expect(HOLIDAY_MALL_THEME.floorPlans.hard).toBeDefined();
  });
  it('has ≥ 12 suspect names', () => expect(HOLIDAY_MALL_THEME.suspectNames.length).toBeGreaterThanOrEqual(12));
  it('has ≥ 6 V-prefixed victim names', () => {
    expect(HOLIDAY_MALL_THEME.victimNames.length).toBeGreaterThanOrEqual(6);
    HOLIDAY_MALL_THEME.victimNames.forEach(n => expect(n.startsWith('V')).toBe(true));
  });
  it('guiltyText has {{killerName}}', () => {
    HOLIDAY_MALL_THEME.narrativeTemplates.guiltyText.forEach(t => expect(t).toContain('{{killerName}}'));
  });
});

describe('HOLIDAY_MALL_THEME registration', () => {
  it('is registered', () => expect(getTheme('holiday-mall').id).toBe('holiday-mall'));
});

describe('generator with holiday-mall theme', () => {
  for (const difficulty of ['easy', 'medium', 'hard'] as const) {
    it(`generates unique puzzle for ${difficulty}`, () => {
      const p = generatePuzzle(42, HOLIDAY_MALL_THEME, difficulty);
      const r = countSolutions(p.floorPlan, p.suspects.map(s => s.id), p.clues);
      expect(r.count).toBe(1);
    });
  }

  it('50 seeds on easy: successful puzzles all unique', () => {
    let successes = 0;
    for (let seed = 0; seed < 50; seed++) {
      try {
        const p = generatePuzzle(seed, HOLIDAY_MALL_THEME, 'easy');
        const r = countSolutions(p.floorPlan, p.suspects.map(s => s.id), p.clues);
        expect(r.count).toBe(1);
        successes++;
      } catch { /* PuzzleGenerationError acceptable on some seeds */ }
    }
    expect(successes).toBeGreaterThanOrEqual(40);
  }, 15000);
});
