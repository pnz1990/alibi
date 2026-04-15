/**
 * localStorage read/write for ALIBI.
 *
 * ALL localStorage access goes through this module. No other file reads or writes
 * any alibi_* key from localStorage.
 */

import type { PuzzleState, PlayerPrefs, CampaignSave, DailySave, PlayerStats } from './schema';
import { STORAGE_KEYS } from './schema';

// ─────────────────────────────────────────────
// PuzzleState (in-progress placement)
// ─────────────────────────────────────────────

/**
 * Saves in-progress puzzle state to localStorage.
 * Key = `${seed}-${themeId}-${difficulty}`.
 */
export function savePuzzleState(state: PuzzleState): void {
  try {
    const all = loadAllPuzzleStates();
    all[state.key] = state;
    localStorage.setItem(STORAGE_KEYS.puzzleState, JSON.stringify(all));
  } catch {
    // localStorage unavailable (private mode, quota exceeded) — silently skip
  }
}

/**
 * Loads in-progress puzzle state for a given key.
 * Returns null if no saved state exists.
 */
export function loadPuzzleState(key: string): PuzzleState | null {
  try {
    const all = loadAllPuzzleStates();
    return all[key] ?? null;
  } catch {
    return null;
  }
}

/**
 * Clears saved puzzle state after completion or fresh start.
 */
export function clearPuzzleState(key: string): void {
  try {
    const all = loadAllPuzzleStates();
    delete all[key];
    localStorage.setItem(STORAGE_KEYS.puzzleState, JSON.stringify(all));
  } catch {
    // ignore
  }
}

function loadAllPuzzleStates(): Record<string, PuzzleState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.puzzleState);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, PuzzleState>;
  } catch {
    return {};
  }
}

// ─────────────────────────────────────────────
// PlayerPrefs
// ─────────────────────────────────────────────

export function loadPrefs(): PlayerPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.prefs);
    if (!raw) return { muted: false, howToPlaySeen: false };
    return JSON.parse(raw) as PlayerPrefs;
  } catch {
    return { muted: false, howToPlaySeen: false };
  }
}

export function savePrefs(prefs: PlayerPrefs): void {
  try {
    localStorage.setItem(STORAGE_KEYS.prefs, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}

// ─────────────────────────────────────────────
// CampaignSave (3 slots)
// ─────────────────────────────────────────────

export function loadCampaign(slot: 1 | 2 | 3): CampaignSave | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.campaign(slot));
    if (!raw) return null;
    return JSON.parse(raw) as CampaignSave;
  } catch {
    return null;
  }
}

export function saveCampaign(save: CampaignSave): void {
  try {
    localStorage.setItem(STORAGE_KEYS.campaign(save.slot), JSON.stringify(save));
  } catch {
    // ignore
  }
}

export function clearCampaign(slot: 1 | 2 | 3): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.campaign(slot));
  } catch {
    // ignore
  }
}

// ─────────────────────────────────────────────
// DailySave
// ─────────────────────────────────────────────

export function loadDailySave(date: string): DailySave | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.daily(date));
    if (!raw) return null;
    return JSON.parse(raw) as DailySave;
  } catch {
    return null;
  }
}

export function saveDailySave(save: DailySave): void {
  try {
    localStorage.setItem(STORAGE_KEYS.daily(save.date), JSON.stringify(save));
  } catch {
    // ignore
  }
}

// ─────────────────────────────────────────────
// Daily streak
// ─────────────────────────────────────────────

export function loadStreak(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.streak);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

export function saveStreak(streak: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.streak, String(streak));
  } catch {
    // ignore
  }
}

// ─────────────────────────────────────────────
// PlayerStats
// ─────────────────────────────────────────────

const DEFAULT_STATS: PlayerStats = {
  totalSolved:    0,
  bestTimes:      {},
  solvedToday:    0,
  lastSolvedDate: '',
};

export function loadStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.stats);
    if (!raw) return { ...DEFAULT_STATS };
    return JSON.parse(raw) as PlayerStats;
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export function saveStats(stats: PlayerStats): void {
  try {
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

/**
 * Records a puzzle completion in PlayerStats.
 * Updates total solved, best time for this theme+difficulty, and today count.
 */
export function recordCompletion(themeId: string, difficulty: string, solveTimeMs: number): void {
  const stats = loadStats();
  const today = new Date().toISOString().slice(0, 10);
  const key = `${themeId}-${difficulty}`;

  stats.totalSolved += 1;
  if (!stats.bestTimes[key] || solveTimeMs < stats.bestTimes[key]) {
    stats.bestTimes[key] = solveTimeMs;
  }
  if (stats.lastSolvedDate === today) {
    stats.solvedToday += 1;
  } else {
    stats.solvedToday    = 1;
    stats.lastSolvedDate = today;
  }
  saveStats(stats);
}
