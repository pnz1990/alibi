/**
 * Unit tests for daily mode logic.
 */

import { describe, it, expect } from 'vitest';
import { djb2hash, getDailyPuzzleFor, calculateStreak, todayString } from '../../src/modes/daily';

describe('djb2hash', () => {
  it('is deterministic', () => {
    expect(djb2hash('2026-04-15')).toBe(djb2hash('2026-04-15'));
  });

  it('returns non-negative integer', () => {
    expect(djb2hash('2026-04-15')).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(djb2hash('2026-04-15'))).toBe(true);
  });

  it('produces different hashes for different dates', () => {
    expect(djb2hash('2026-04-15')).not.toBe(djb2hash('2026-04-16'));
  });
});

describe('getDailyPuzzleFor', () => {
  it('is deterministic for same date', () => {
    const a = getDailyPuzzleFor('2026-04-15');
    const b = getDailyPuzzleFor('2026-04-15');
    expect(a.seed).toBe(b.seed);
    expect(a.themeId).toBe(b.themeId);
    expect(a.difficulty).toBe(b.difficulty);
  });

  it('produces different puzzles for different dates', () => {
    const a = getDailyPuzzleFor('2026-04-15');
    const b = getDailyPuzzleFor('2026-04-16');
    expect(a.seed).not.toBe(b.seed);
  });

  it('returns valid difficulty', () => {
    const { difficulty } = getDailyPuzzleFor('2026-04-15');
    expect(['easy', 'medium', 'hard']).toContain(difficulty);
  });

  it('returns a themeId string', () => {
    const { themeId } = getDailyPuzzleFor('2026-04-15');
    expect(typeof themeId).toBe('string');
    expect(themeId.length).toBeGreaterThan(0);
  });

  it('returns the input dateStr', () => {
    const date = '2026-04-15';
    expect(getDailyPuzzleFor(date).dateStr).toBe(date);
  });
});

describe('calculateStreak', () => {
  it('returns 1 on first solve (no prior date)', () => {
    expect(calculateStreak(0, '', '2026-04-15')).toBe(1);
  });

  it('increments on consecutive days', () => {
    expect(calculateStreak(3, '2026-04-14', '2026-04-15')).toBe(4);
  });

  it('resets on non-consecutive days', () => {
    expect(calculateStreak(5, '2026-04-10', '2026-04-15')).toBe(1);
  });

  it('stays same if solved same day', () => {
    expect(calculateStreak(3, '2026-04-15', '2026-04-15')).toBe(3);
  });
});

describe('todayString', () => {
  it('returns YYYY-MM-DD format', () => {
    const today = todayString();
    expect(/^\d{4}-\d{2}-\d{2}$/.test(today)).toBe(true);
  });
});
