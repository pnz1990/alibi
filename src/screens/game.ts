/**
 * Game screen — full game state machine wiring.
 *
 * Orchestrates: puzzle generation → renderer → input handling → undo/redo
 *   → sound → save/resume → win sequence → share card.
 *
 * Reads URL params: ?theme=X&difficulty=Y&seed=Z
 */

import type { Difficulty } from '../storage/schema';
import type { Puzzle } from '../engine/generator';
import { generatePuzzle } from '../engine/generator';
import { getTheme } from '../themes/index';
import { renderGrid, getCanvasSize } from '../render/canvas';
import { renderSidebar } from '../render/ui';
import { showNarrativeIntro, showGuiltyScreen, showClueGateMessage } from '../render/overlay';
import { createGameState, placeSuspect, removeSuspect, restoreSnapshot, checkWin } from '../game/state';
import type { GameState } from '../game/state';
import { UndoStack } from '../game/undo';
import { playSound, toggleMute } from '../game/sound';
import { generateShareText, copyToClipboard } from '../game/share';
import { savePuzzleState, loadPuzzleState, clearPuzzleState } from '../storage/progress';
import { attachInputHandlers } from '../game/input';

type AlibiWindow = Window & {
  __alibi_puzzle?: unknown;
  __alibi_placeSuspect?: (suspectId: string, x: number, y: number) => void;
};

function puzzleKey(puzzle: Puzzle): string {
  return `${puzzle.seed}-${puzzle.themeId}-${puzzle.difficulty}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function mountGameScreen(_root: HTMLElement): void {
  const params = new URLSearchParams(location.search);
  const themeId    = params.get('theme')      ?? 'coffee-shop';
  const difficulty = (params.get('difficulty') ?? 'easy') as Difficulty;
  const seed       = parseInt(params.get('seed') ?? '0', 10);

  const theme  = getTheme(themeId);
  const puzzle = generatePuzzle(seed, theme, difficulty);
  const key    = puzzleKey(puzzle);

  if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
    (window as AlibiWindow).__alibi_puzzle = puzzle;
  }

  // Build DOM layout
  const screen = buildScreen();
  const canvasWrapper = screen.querySelector('.alibi-canvas-wrapper') as HTMLElement;
  const sidebarContainer = screen.querySelector('.alibi-sidebar-container') as HTMLElement;

  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ctx    = canvas.getContext('2d')!;
  const { width, height } = getCanvasSize(puzzle);
  canvas.width  = width;
  canvas.height = height;
  canvasWrapper.appendChild(canvas);

  let state = createGameState(puzzle);
  const undoStack = new UndoStack();

  // ── Render ─────────────────────────────────────────────────────────────────
  function savePlacements(k: string, s: GameState): void {
    const placements: Record<string, { x: number; y: number }> = {};
    s.placements.forEach((p, id) => { placements[id] = { x: p.x, y: p.y }; });
    savePuzzleState({ key: k, placements, elapsedMs: s.elapsedMs, savedAt: new Date().toISOString() });
  }

  function redraw(): void {
    renderGrid(ctx, puzzle, theme, state.placements, state.victimCell);
    renderSidebar(sidebarContainer, puzzle, state.placements, state.satisfiedClues, state.errorClues);
    handlers.updateOverlays();
  }

  // ── Input ──────────────────────────────────────────────────────────────────
  const handlers = attachInputHandlers(canvasWrapper, puzzle, theme, () => state, {
    onPlace(suspectId, x, y) {
      if (state.phase !== 'playing') return;
      undoStack.push(state.placements);
      state = placeSuspect(state, puzzle, suspectId, x, y);
      savePlacements(key, state);
      playSound(state.satisfiedClues.size > 0 ? 'clue-satisfied' : 'place');
      redraw();
    },
    onRemove(suspectId) {
      if (state.phase !== 'playing') return;
      undoStack.push(state.placements);
      state = removeSuspect(state, puzzle, suspectId);
      savePlacements(key, state);
      playSound('remove');
      redraw();
    },
    onVictimClick() {
      if (state.phase !== 'playing') return;
      const next = checkWin(state);
      if (next.phase === 'guilty') {
        state = next;
        clearPuzzleState(key);
        playSound('solve');
        redraw();
        showGuiltyScreen(document.body, puzzle);
        addShareButton(puzzle, state);
      } else {
        playSound('error');
        redraw();
        showClueGateMessage(document.body);
      }
    },
  });

  // ── Undo/redo ──────────────────────────────────────────────────────────────
  const undoBtn = screen.querySelector('[data-testid="btn-undo"]') as HTMLButtonElement;
  const redoBtn = screen.querySelector('[data-testid="btn-redo"]') as HTMLButtonElement;

  undoBtn.addEventListener('click', doUndo);
  redoBtn.addEventListener('click', doRedo);

  function doUndo(): void {
    const snap = undoStack.undo(state.placements);
    if (snap) { state = restoreSnapshot(state, puzzle, snap); redraw(); }
  }
  function doRedo(): void {
    const snap = undoStack.redo(state.placements);
    if (snap) { state = restoreSnapshot(state, puzzle, snap); redraw(); }
  }

  // ── Mute ───────────────────────────────────────────────────────────────────
  const muteBtn = screen.querySelector('[data-testid="btn-mute"]') as HTMLButtonElement;
  muteBtn.addEventListener('click', () => {
    const muted = toggleMute();
    muteBtn.textContent = muted ? '🔇' : '🔊';
  });

  // ── Keyboard ───────────────────────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { doUndo(); e.preventDefault(); }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      doRedo(); e.preventDefault();
    }
  });

  // ── DEV helper ─────────────────────────────────────────────────────────────
  if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
    (window as AlibiWindow).__alibi_placeSuspect = (suspectId: string, x: number, y: number) => {
      if (state.phase !== 'playing') return;
      undoStack.push(state.placements);
      state = placeSuspect(state, puzzle, suspectId, x, y);
      savePlacements(key, state);  // persist for save/resume tests
      redraw();
    };
  }

  // ── Resume ─────────────────────────────────────────────────────────────────
  const saved = loadPuzzleState(key);
  if (saved && Object.keys(saved.placements).length > 0) {
    showResumePrompt(screen, () => {
      const snap = new Map<string, import('../engine/logic').SuspectPlacement>(
        Object.entries(saved.placements).map(([id, pos]) => [id, { suspectId: id, x: pos.x, y: pos.y }])
      );
      state = restoreSnapshot(createGameState(puzzle), puzzle, snap);
      state = { ...state, elapsedMs: saved.elapsedMs };
      redraw();
      showNarrativeIntro(document.body, puzzle, () => {});
    }, () => {
      clearPuzzleState(key);
      showNarrativeIntro(document.body, puzzle, () => {});
    });
  } else {
    showNarrativeIntro(document.body, puzzle, () => {});
  }

  redraw();
}

// ─────────────────────────────────────────────
// DOM structure
// ─────────────────────────────────────────────

const SCREEN_STYLES = `
.alibi-game-screen {
  display: flex; align-items: flex-start; gap: 0;
  height: 100vh; overflow: hidden; background: #1a1a2e;
}
.alibi-canvas-wrapper { flex-shrink: 0; overflow: auto; position: relative; }
.alibi-sidebar-container { flex: 1; height: 100vh; overflow-y: auto; display: flex; flex-direction: column; }
.alibi-toolbar {
  display: flex; gap: 6px; padding: 8px 12px;
  background: #0d0d1a; border-bottom: 1px solid #333; flex-shrink: 0;
}
.alibi-toolbar button {
  background: #1e1e35; color: #fff; border: 1px solid #444;
  padding: 4px 10px; font-family: monospace; font-size: 12px;
  cursor: pointer; border-radius: 3px;
}
.alibi-toolbar button:hover { background: #2a2a50; }
`;

let screenStylesInjected = false;
function injectScreenStyles(): void {
  if (screenStylesInjected) return;
  const s = document.createElement('style');
  s.textContent = SCREEN_STYLES;
  document.head.appendChild(s);
  screenStylesInjected = true;
}

function buildScreen(): HTMLElement {
  injectScreenStyles();
  const screen = document.createElement('div');
  screen.setAttribute('data-testid', 'screen-game');
  screen.className = 'alibi-game-screen';

  const canvasWrapper = document.createElement('div');
  canvasWrapper.className = 'alibi-canvas-wrapper';

  const rightPane = document.createElement('div');
  rightPane.style.cssText = 'display:flex;flex-direction:column;height:100vh;flex:1;';

  const toolbar = document.createElement('div');
  toolbar.className = 'alibi-toolbar';
  const undoBtn = btn('btn-undo', '↩ Undo');
  const redoBtn = btn('btn-redo', '↪ Redo');
  const muteBtn = btn('btn-mute', '🔊');
  toolbar.append(undoBtn, redoBtn, muteBtn);

  const sidebarContainer = document.createElement('div');
  sidebarContainer.className = 'alibi-sidebar-container';

  rightPane.append(toolbar, sidebarContainer);
  screen.append(canvasWrapper, rightPane);

  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  canvas.parentElement?.insertBefore(screen, canvas);
  return screen;
}

function btn(testid: string, label: string): HTMLButtonElement {
  const b = document.createElement('button');
  b.setAttribute('data-testid', testid);
  b.textContent = label;
  return b;
}

function addShareButton(puzzle: Puzzle, state: GameState): void {
  const b = document.createElement('button');
  b.setAttribute('data-testid', 'btn-share');
  b.style.cssText =
    'position:fixed;bottom:24px;right:24px;z-index:300;' +
    'background:#c0392b;color:#fff;border:none;padding:10px 20px;' +
    'font-family:monospace;font-size:14px;cursor:pointer;border-radius:4px;';
  b.textContent = '📋 Share Result';
  b.addEventListener('click', async () => {
    const text = generateShareText(puzzle, state.elapsedMs);
    const ok = await copyToClipboard(text);
    b.textContent = ok ? '✓ Copied!' : '📋 Share Result';
    if (ok) setTimeout(() => { b.textContent = '📋 Share Result'; }, 2000);
  });
  document.body.appendChild(b);
}

function showResumePrompt(
  screen: HTMLElement,
  onResume: () => void,
  onFresh:  () => void,
): void {
  const overlay = document.createElement('div');
  overlay.setAttribute('data-testid', 'prompt-resume');
  overlay.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;' +
    'align-items:center;justify-content:center;z-index:150;font-family:monospace;';

  const box = document.createElement('div');
  box.style.cssText =
    'background:#1a1a2e;border:2px solid #c0392b;border-radius:8px;' +
    'padding:28px;max-width:360px;text-align:center;color:#fff;';

  const h = document.createElement('h2');
  h.style.cssText = 'color:#c0392b;margin-bottom:12px;';
  h.textContent = 'Resume Investigation?';

  const p = document.createElement('p');
  p.style.cssText = 'color:#aaa;margin-bottom:20px;font-size:0.9em;';
  p.textContent = 'You have an in-progress case. Resume where you left off?';

  const resumeB = document.createElement('button');
  resumeB.style.cssText =
    'background:#c0392b;color:#fff;border:none;padding:9px 20px;' +
    'font-family:monospace;cursor:pointer;border-radius:4px;margin-right:8px;';
  resumeB.textContent = 'Resume';
  resumeB.addEventListener('click', () => { overlay.remove(); onResume(); });

  const freshB = document.createElement('button');
  freshB.style.cssText =
    'background:#333;color:#fff;border:none;padding:9px 20px;' +
    'font-family:monospace;cursor:pointer;border-radius:4px;';
  freshB.textContent = 'Start Fresh';
  freshB.addEventListener('click', () => { overlay.remove(); onFresh(); });

  box.append(h, p, resumeB, freshB);
  overlay.appendChild(box);
  screen.appendChild(overlay);
}
