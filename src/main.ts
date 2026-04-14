/**
 * ALIBI — main entry point (Stage 0: blank canvas)
 * Game engine, rendering, and modes are implemented in subsequent stages.
 */

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
if (!ctx) throw new Error('Canvas 2D context not available');

// Blank canvas — game content rendered in Stage 2+
ctx.fillStyle = '#1a1a2e';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// DEV/TEST: expose puzzle reference (populated by generator in Stage 1)
if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
  (window as Window & { __alibi_puzzle?: unknown }).__alibi_puzzle = undefined;
}
