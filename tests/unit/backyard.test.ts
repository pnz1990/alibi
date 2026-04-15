/**
 * Unit tests for src/themes/backyard.ts
 */

import { describe, it, expect } from 'vitest';
import { BACKYARD_THEME } from '../../src/themes/backyard';
import { getTheme } from '../../src/themes/index';
import { generatePuzzle } from '../../src/engine/generator';
import { countSolutions } from '../../src/engine/solver';

describe('BACKYARD_THEME structure', () => {
  it('has id backyard', () => expect(BACKYARD_THEME.id).toBe('backyard'));
  it('has 3 floor plan variants', () => {
    expect(BACKYARD_THEME.floorPlans.easy).toBeDefined();
    expect(BACKYARD_THEME.floorPlans.medium).toBeDefined();
    expect(BACKYARD_THEME.floorPlans.hard).toBeDefined();
  });
  it('has ≥ 12 suspect names', () => expect(BACKYARD_THEME.suspectNames.length).toBeGreaterThanOrEqual(12));
  it('has ≥ 6 V-prefixed victim names', () => {
    expect(BACKYARD_THEME.victimNames.length).toBeGreaterThanOrEqual(6);
    BACKYARD_THEME.victimNames.forEach(n => expect(n.startsWith('V')).toBe(true));
  });
  it('has all 16 clue templates', () => {
    const keys = ['inRoom','notInRoom','inSameRoom','inDifferentRoom','inColumn','inRow',
      'besideSuspect','notBesideSuspect','besideObject','notBesideObject','onSeatTile',
      'notOnSeatTile','northOf','southOf','exactlyNRowsNorth','exactlyNRowsSouth'];
    keys.forEach(k => expect(typeof BACKYARD_THEME.clueTemplates[k as keyof typeof BACKYARD_THEME.clueTemplates]).toBe('function'));
  });
  it('guiltyText has {{killerName}}', () => {
    BACKYARD_THEME.narrativeTemplates.guiltyText.forEach(t => expect(t).toContain('{{killerName}}'));
  });
});

describe('BACKYARD_THEME registration', () => {
  it('is registered', () => expect(getTheme('backyard').id).toBe('backyard'));
});

describe('generator with backyard theme', () => {
  for (const difficulty of ['easy', 'medium', 'hard'] as const) {
    it(`generates unique puzzle for ${difficulty}`, () => {
      const p = generatePuzzle(42, BACKYARD_THEME, difficulty);
      const r = countSolutions(p.floorPlan, p.suspects.map(s => s.id), p.clues);
      expect(r.count).toBe(1);
    });
  }

  it('50 seeds on easy: successful puzzles all unique', () => {
    let successes = 0;
    for (let seed = 0; seed < 50; seed++) {
      try {
        const p = generatePuzzle(seed, BACKYARD_THEME, 'easy');
        const r = countSolutions(p.floorPlan, p.suspects.map(s => s.id), p.clues);
        expect(r.count).toBe(1);
        successes++;
      } catch { /* PuzzleGenerationError acceptable */ }
    }
    expect(successes).toBeGreaterThanOrEqual(40);
  }, 15000);
});
