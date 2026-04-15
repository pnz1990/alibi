/**
 * ALIBI — main entry point
 *
 * Routes to game screen if URL params (theme/difficulty/seed) are present.
 * Home screen, campaign, and daily modes are implemented in Stage 3 (items #16–17).
 */

import { mountGameScreen } from './screens/game';

const params = new URLSearchParams(location.search);

if (params.has('theme') || params.has('difficulty') || params.has('seed')) {
  // Direct puzzle URL — mount game screen immediately
  mountGameScreen(document.body);
} else {
  // No routing params — show blank canvas placeholder (home screen in Stage 3)
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // DEV/TEST: expose null puzzle reference until home screen is wired
  if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
    (window as Window & { __alibi_puzzle?: unknown }).__alibi_puzzle = undefined;
  }
}
