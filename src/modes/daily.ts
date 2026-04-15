/**
 * Daily Case mode logic.
 *
 * Seed = djb2hash(YYYY-MM-DD). Theme + difficulty rotate on a 30-day schedule.
 * Streak logic: consecutive days solved (persisted in localStorage via progress.ts).
 *
 * All daily seed derivation and scheduling lives here exclusively (Constitution §VIII).
 */

import type { Difficulty } from '../storage/schema';

/** djb2 hash of a string → deterministic positive integer. */
export function djb2hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Returns today's date string as YYYY-MM-DD. */
export function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

interface DailyScheduleEntry {
  themeId:    string;
  difficulty: Difficulty;
}

/**
 * 30-day daily rotation schedule.
 * Covers all 10 themes × Easy/Medium/Hard × 3 entries each = 90 total, cycling every 30 days.
 * Updated as more themes are implemented.
 * Day 0 of year is day[0], day 1 is day[1], etc.
 */
const DAILY_SCHEDULE: DailyScheduleEntry[] = [
  { themeId: 'coffee-shop', difficulty: 'easy'   },
  { themeId: 'coffee-shop', difficulty: 'medium' },
  { themeId: 'coffee-shop', difficulty: 'hard'   },
  { themeId: 'coffee-shop', difficulty: 'easy'   },
  { themeId: 'coffee-shop', difficulty: 'medium' },
  { themeId: 'coffee-shop', difficulty: 'hard'   },
  { themeId: 'coffee-shop', difficulty: 'easy'   },
  { themeId: 'coffee-shop', difficulty: 'medium' },
  { themeId: 'coffee-shop', difficulty: 'hard'   },
  { themeId: 'coffee-shop', difficulty: 'easy'   },
  { themeId: 'coffee-shop', difficulty: 'medium' },
  { themeId: 'coffee-shop', difficulty: 'hard'   },
  { themeId: 'coffee-shop', difficulty: 'easy'   },
  { themeId: 'coffee-shop', difficulty: 'medium' },
  { themeId: 'coffee-shop', difficulty: 'hard'   },
  { themeId: 'coffee-shop', difficulty: 'easy'   },
  { themeId: 'coffee-shop', difficulty: 'medium' },
  { themeId: 'coffee-shop', difficulty: 'hard'   },
  { themeId: 'coffee-shop', difficulty: 'easy'   },
  { themeId: 'coffee-shop', difficulty: 'medium' },
  { themeId: 'coffee-shop', difficulty: 'hard'   },
  { themeId: 'coffee-shop', difficulty: 'easy'   },
  { themeId: 'coffee-shop', difficulty: 'medium' },
  { themeId: 'coffee-shop', difficulty: 'hard'   },
  { themeId: 'coffee-shop', difficulty: 'easy'   },
  { themeId: 'coffee-shop', difficulty: 'medium' },
  { themeId: 'coffee-shop', difficulty: 'hard'   },
  { themeId: 'coffee-shop', difficulty: 'easy'   },
  { themeId: 'coffee-shop', difficulty: 'medium' },
  { themeId: 'coffee-shop', difficulty: 'hard'   },
];

/**
 * Returns the daily puzzle parameters for a given date string (YYYY-MM-DD).
 * Deterministic: same date → same result everywhere.
 */
export function getDailyPuzzleFor(dateStr: string): {
  seed: number;
  themeId: string;
  difficulty: Difficulty;
  dateStr: string;
} {
  const seed = djb2hash(dateStr);
  const d = new Date(dateStr + 'T12:00:00Z');
  const dayOfYear = Math.floor((d.getTime() - new Date(d.getUTCFullYear(), 0, 0).getTime()) / 86400000);
  const { themeId, difficulty } = DAILY_SCHEDULE[dayOfYear % DAILY_SCHEDULE.length];
  return { seed, themeId, difficulty, dateStr };
}

/** Returns today's daily puzzle parameters. */
export function getTodayDailyPuzzle(): ReturnType<typeof getDailyPuzzleFor> {
  return getDailyPuzzleFor(todayString());
}

/**
 * Calculates the updated streak given the current streak and last solved date.
 * Returns the new streak count.
 */
export function calculateStreak(currentStreak: number, lastSolvedDate: string, todayDate: string): number {
  if (!lastSolvedDate) return 1;
  const last = new Date(lastSolvedDate + 'T12:00:00Z');
  const today = new Date(todayDate + 'T12:00:00Z');
  const daysDiff = Math.round((today.getTime() - last.getTime()) / 86400000);
  if (daysDiff === 1) return currentStreak + 1; // consecutive
  if (daysDiff === 0) return currentStreak;     // same day, already counted
  return 1;                                      // streak broken
}
