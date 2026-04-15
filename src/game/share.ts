/**
 * Share card generator for ALIBI.
 * Generates a plain-text completion card and copies to clipboard.
 * No network calls.
 */

import type { Puzzle } from '../engine/generator';

/**
 * Generates a plain-text share card string.
 * Format: theme name, difficulty, solve time, clue count.
 */
export function generateShareText(puzzle: Puzzle, solveTimeMs: number): string {
  const minutes = Math.floor(solveTimeMs / 60000);
  const seconds = Math.floor((solveTimeMs % 60000) / 1000);
  const timeStr = minutes > 0
    ? `${minutes}m ${seconds}s`
    : `${seconds}s`;

  const difficulty = puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1);

  return [
    `🔍 ALIBI`,
    `Case: ${puzzle.floorPlan === puzzle.floorPlan ? puzzle.themeId.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) : 'Unknown'}`,
    `Difficulty: ${difficulty}`,
    `Clues: ${puzzle.clues.length}`,
    `Time: ${timeStr}`,
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
