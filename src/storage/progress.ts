/**
 * localStorage read/write for ALIBI.
 *
 * ALL localStorage access for puzzle state goes through this module.
 * No other module reads or writes alibi_puzzle_state.
 *
 * Campaign, daily, stats, and prefs storage is handled here too
 * (stubs for now; fully implemented in item #17).
 */

import type { PuzzleState, PlayerPrefs } from './schema';
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
