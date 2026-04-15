/**
 * Quick Play mode logic.
 *
 * Generates a random seed and constructs the puzzle URL.
 * No persistence. No DOM.
 */

import type { Difficulty } from '../storage/schema';

/**
 * Generates a random seed for a Quick Play puzzle.
 */
export function generateQuickPlaySeed(): number {
  return Math.floor(Math.random() * 0xffffffff);
}

/**
 * Constructs the puzzle URL for Quick Play.
 * The seed is embedded in the URL for sharing.
 */
export function quickPlayUrl(themeId: string, difficulty: Difficulty, seed?: number): string {
  const s = seed ?? generateQuickPlaySeed();
  const base = window.location.pathname;
  return `${base}?theme=${themeId}&difficulty=${difficulty}&seed=${s}`;
}
