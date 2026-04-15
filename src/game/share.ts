/**
 * Share card generator for ALIBI.
 * Generates a plain-text completion card and copies to clipboard.
 * No network calls.
 */

import type { Puzzle } from '../engine/generator';

/** Formats milliseconds into a human-readable time string. */
function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

/** Theme ID → display name. */
function themeName(themeId: string): string {
  return themeId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Generates a plain-text Quick Play / Campaign share card.
 * Format: theme name, difficulty, solve time, clue count.
 */
export function generateShareText(puzzle: Puzzle, solveTimeMs: number): string {
  const difficulty = puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1);

  return [
    `🔍 ALIBI`,
    `Case: ${themeName(puzzle.themeId)}`,
    `Difficulty: ${difficulty}`,
    `Clues: ${puzzle.clues.length}`,
    `Time: ${formatTime(solveTimeMs)}`,
    `Killer: ${puzzle.killer.name}`,
    ``,
    `pnz1990.github.io/alibi/`,
  ].join('\n');
}

/**
 * Generates a Daily Case share card, including the streak count.
 * Format: date, theme, difficulty, time, streak — like Wordle.
 */
export function generateDailyShareText(puzzle: Puzzle, solveTimeMs: number, streak: number): string {
  const difficulty = puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1);
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const streakStr = streak > 1 ? `🔥 ${streak} day streak` : `1st solve`;

  return [
    `🔍 ALIBI — Daily Case`,
    `📅 ${dateStr}`,
    `Case: ${themeName(puzzle.themeId)} (${difficulty})`,
    `Time: ${formatTime(solveTimeMs)}`,
    streakStr,
    `Killer: ${puzzle.killer.name}`,
    ``,
    `pnz1990.github.io/alibi/`,
  ].join('\n');
}

/**
 * Copies text to clipboard. Returns true on success, false on failure.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback: textarea trick
    const el = document.createElement('textarea');
    el.value = text;
    el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;';
    document.body.appendChild(el);
    el.focus();
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}
