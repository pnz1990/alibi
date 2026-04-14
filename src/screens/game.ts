/**
 * Game screen — wires the renderer to a generated puzzle.
 *
 * Reads theme/difficulty/seed from URL params, generates puzzle,
 * renders canvas + sidebar + narrative intro overlay.
 *
 * Input handling (click → placement), undo/redo, sound, and win sequence
 * are implemented in src/game/state.ts (item #15).
 *
 * This module is responsible only for initial render and screen setup.
 */

import type { Difficulty } from '../storage/schema';
import { generatePuzzle } from '../engine/generator';
import { getVictimCell } from '../engine/logic';
import { getTheme } from '../themes/index';
import { renderGrid, getCanvasSize } from '../render/canvas';
import { renderSidebar } from '../render/ui';
import { showNarrativeIntro } from '../render/overlay';

/**
 * Mounts the game screen inside `root` using URL search params.
 * Expects params: theme, difficulty, seed (all optional; defaults to coffee-shop, easy, 0).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function mountGameScreen(_root: HTMLElement): void {
  const params = new URLSearchParams(location.search);
  const themeId    = params.get('theme')      ?? 'coffee-shop';
  const difficulty = (params.get('difficulty') ?? 'easy') as Difficulty;
  const seed       = parseInt(params.get('seed') ?? '0', 10);

  const theme  = getTheme(themeId);
  const puzzle = generatePuzzle(seed, theme, difficulty);

  // DEV/TEST: expose puzzle for Playwright tests
  if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
    (window as Window & { __alibi_puzzle?: unknown }).__alibi_puzzle = puzzle;
  }

  // Build layout: game screen container
  const screen = document.createElement('div');
  screen.setAttribute('data-testid', 'screen-game');
  screen.style.cssText = 'display:flex;align-items:flex-start;gap:0;height:100vh;overflow:hidden;';

  // Canvas
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  const { width, height } = getCanvasSize(puzzle);
  canvas.width  = width;
  canvas.height = height;

  // Initial render — no placements yet
  const placements = new Map<string, { suspectId: string; x: number; y: number }>();
  const victimCell = getVictimCell(puzzle.floorPlan, []);

  renderGrid(ctx, puzzle, theme, placements, victimCell);

  // Sidebar
  const sidebar = document.createElement('div');
  sidebar.setAttribute('data-testid', 'sidebar');
  renderSidebar(sidebar, puzzle, placements, new Set(), new Set());

  // Append canvas and sidebar to screen
  // Canvas is already in body — wrap it in a container div
  const canvasWrapper = document.createElement('div');
  canvasWrapper.style.cssText = 'flex-shrink:0;overflow:auto;';
  canvas.parentElement?.insertBefore(screen, canvas);
  canvasWrapper.appendChild(canvas);
  screen.appendChild(canvasWrapper);
  screen.appendChild(sidebar);

  // Show narrative intro overlay
  showNarrativeIntro(document.body, puzzle, () => {
    // Dismiss callback — input handling wired in item #15
  });
}
