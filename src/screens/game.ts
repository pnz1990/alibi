/**
 * Game screen — full game state machine wiring.
 *
 * Orchestrates: puzzle generation → renderer → input handling → undo/redo
 *   → sound → save/resume → win sequence → share card.
 *
 * Reads URL params: ?theme=X&difficulty=Y&seed=Z[&mode=daily][&campaignSlot=N&campaignCase=M]
 */

import type { Difficulty } from '../storage/schema';
import type { Puzzle } from '../engine/generator';
import { generatePuzzle } from '../engine/generator';
import { getTheme } from '../themes/index';
import { renderGrid, getCanvasSize, updateCellSize } from '../render/canvas';
import { renderSidebar } from '../render/ui';
import { showNarrativeIntro, showGuiltyScreen, showClueGateMessage } from '../render/overlay';
import {
  createGameState, placeSuspect, removeSuspect, checkWin,
  takeSnapshot, restoreFromSnapshot,
  toggleXAnnotation, addCandidateAnnotation, removeCandidateAnnotation,
  clearCandidatesForPlacement,
} from '../game/state';
import type { GameState, GameSnapshot } from '../game/state';
import { UndoStack } from '../game/undo';
import { playSound, toggleMute } from '../game/sound';
import { generateShareText, generateDailyShareText, copyToClipboard } from '../game/share';
import {
  savePuzzleState, loadPuzzleState, clearPuzzleState,
  loadCampaign, saveCampaign,
  saveDailySave, loadDailySave, loadStreak, saveStreak,
  recordCompletion,
} from '../storage/progress';
import { completeCampaignCase } from '../modes/campaign';
import { todayString } from '../modes/daily';
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

  // Game mode context — determines what to persist on completion
  const gameMode = params.get('mode'); // 'daily' | null (null = Quick Play)

  // Campaign context — present when launched from campaign board
  const campaignSlotParam = params.get('campaignSlot');
  const campaignCaseParam = params.get('campaignCase');
  const campaignSlot = campaignSlotParam ? (parseInt(campaignSlotParam, 10) as 1 | 2 | 3) : null;
  const campaignCase = campaignCaseParam ? parseInt(campaignCaseParam, 10) : null;

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
  canvas.style.imageRendering = 'pixelated';

  function resizeAndRedraw(): void {
    // Use the grid panel's actual rendered size for accurate cell sizing
    const panel = screen.querySelector('.alibi-grid-panel') as HTMLElement | null;
    const panelRect = panel?.getBoundingClientRect();
    const availW = panelRect && panelRect.width  > 16 ? panelRect.width  - 16 : undefined;
    const availH = panelRect && panelRect.height > 16 ? panelRect.height - 16 : undefined;
    updateCellSize(puzzle.floorPlan.width, puzzle.floorPlan.height, availW, availH);
    const { width, height } = getCanvasSize(puzzle);
    canvas.width  = width;
    canvas.height = height;
    canvas.style.width  = `${width}px`;
    canvas.style.height = `${height}px`;
    redraw();
  }

  canvasWrapper.appendChild(canvas);

  let state = createGameState(puzzle);
  const undoStack = new UndoStack();

  // ── Timer ──────────────────────────────────────────────────────────────────
  // Tracks actual wall-clock time since game start (or resume).
  // restoredMs is the elapsed time restored from a save; startTime is when
  // this session started; together they give the true total elapsed time.
  let startTime = Date.now();
  let restoredMs = 0;

  /** Returns total elapsed ms: time from this session + any restored save time. */
  function getElapsedMs(): number {
    return (Date.now() - startTime) + restoredMs;
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  function savePlacements(k: string, s: GameState): void {
    const placements: Record<string, { x: number; y: number }> = {};
    s.placements.forEach((p, id) => { placements[id] = { x: p.x, y: p.y }; });
    savePuzzleState({
      key: k,
      placements,
      elapsedMs: getElapsedMs(),
      savedAt: new Date().toISOString(),
      annotations: s.annotations,
    });
  }

  function redraw(): void {
    renderGrid(ctx, puzzle, theme, state.placements, state.victimCell, state.annotations, () => redraw());
    renderSidebar(sidebarContainer, puzzle, state.placements, state.satisfiedClues, state.errorClues);
    handlers.updateOverlays();
  }

  // ── Input ──────────────────────────────────────────────────────────────────
  const handlers = attachInputHandlers(canvasWrapper, puzzle, theme, () => state, {
    onPlace(suspectId, x, y) {
      if (state.phase !== 'playing') return;
      undoStack.push(takeSnapshot(state));
      state = placeSuspect(state, puzzle, suspectId, x, y);
      state = clearCandidatesForPlacement(state, suspectId, x, y);
      savePlacements(key, state);
      playSound(state.satisfiedClues.size > 0 ? 'clue-satisfied' : 'place');
      redraw();
    },
    onRemove(suspectId) {
      if (state.phase !== 'playing') return;
      undoStack.push(takeSnapshot(state));
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
        const finalElapsedMs = getElapsedMs();
        clearPuzzleState(key);
        playSound('solve');
        redraw();
        showGuiltyScreen(document.body, puzzle);

        // ── Persistence on completion ──────────────────────────────────────
        if (campaignSlot !== null && campaignCase !== null) {
          // Campaign: update case status + rank, navigate back to board
          const save = loadCampaign(campaignSlot);
          if (save) {
            const updated = completeCampaignCase(
              save,
              campaignCase,
              finalElapsedMs,
              puzzle.killer.name,
            );
            saveCampaign(updated);
            setTimeout(() => {
              window.location.href =
                `${window.location.pathname}?mode=campaign&campaignSlot=${campaignSlot}`;
            }, 3000);
          }
        } else if (gameMode === 'daily') {
          // Daily Case: save solve record, update streak, record completion
          const today = todayString();
          const alreadySolved = loadDailySave(today)?.solved ?? false;
          if (!alreadySolved) {
            saveDailySave({ date: today, solved: true, solveTimeMs: finalElapsedMs, killerName: puzzle.killer.name });
            // Streak: consecutive if yesterday's daily was also solved
            const yesterday = getPreviousDate(today);
            const solvedYesterday = loadDailySave(yesterday)?.solved ?? false;
            const currentStreak = loadStreak();
            const newStreak = solvedYesterday ? currentStreak + 1 : 1;
            saveStreak(newStreak);
            recordCompletion(puzzle.themeId, puzzle.difficulty, finalElapsedMs);
            addShareButton(puzzle, finalElapsedMs, newStreak);
          } else {
            // Already solved today — show share without modifying streak
            const streak = loadStreak();
            addShareButton(puzzle, finalElapsedMs, streak);
          }
        } else {
          // Quick Play: just record completion stats
          recordCompletion(puzzle.themeId, puzzle.difficulty, finalElapsedMs);
          addShareButton(puzzle, finalElapsedMs, 0);
        }
        // ──────────────────────────────────────────────────────────────────
      } else {
        playSound('error');
        redraw();
        showClueGateMessage(document.body);
      }
    },
    onToggleX(x, y) {
      if (state.phase !== 'playing') return;
      undoStack.push(takeSnapshot(state));
      state = toggleXAnnotation(state, x, y);
      savePlacements(key, state);
      redraw();
    },
    onAddCandidate(suspectId, x, y) {
      if (state.phase !== 'playing') return;
      undoStack.push(takeSnapshot(state));
      state = addCandidateAnnotation(state, x, y, suspectId);
      savePlacements(key, state);
      redraw();
    },
    onRemoveCandidate(suspectId, x, y) {
      if (state.phase !== 'playing') return;
      undoStack.push(takeSnapshot(state));
      state = removeCandidateAnnotation(state, x, y, suspectId);
      savePlacements(key, state);
      redraw();
    },
  });

  // ── Undo/redo ──────────────────────────────────────────────────────────────
  const undoBtn = screen.querySelector('[data-testid="btn-undo"]') as HTMLButtonElement;
  const redoBtn = screen.querySelector('[data-testid="btn-redo"]') as HTMLButtonElement;

  undoBtn.addEventListener('click', doUndo);
  redoBtn.addEventListener('click', doRedo);

  function doUndo(): void {
    const snap = undoStack.undo(takeSnapshot(state));
    if (snap) { state = restoreFromSnapshot(state, puzzle, snap as GameSnapshot); redraw(); }
  }
  function doRedo(): void {
    const snap = undoStack.redo(takeSnapshot(state));
    if (snap) { state = restoreFromSnapshot(state, puzzle, snap as GameSnapshot); redraw(); }
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
      undoStack.push(takeSnapshot(state));
      state = placeSuspect(state, puzzle, suspectId, x, y);
      state = clearCandidatesForPlacement(state, suspectId, x, y);
      savePlacements(key, state);  // persist for save/resume tests
      redraw();
    };
  }

  // ── Resume ─────────────────────────────────────────────────────────────────
  const saved = loadPuzzleState(key);
  if (saved && Object.keys(saved.placements).length > 0) {
    showResumePrompt(screen, () => {
      const snapPlacements = new Map<string, import('../engine/logic').SuspectPlacement>(
        Object.entries(saved.placements).map(([id, pos]) => [id, { suspectId: id, x: pos.x, y: pos.y }])
      );
      const snapAnnotations = saved.annotations ?? { x: [], candidates: {} };
      const snap: GameSnapshot = { placements: snapPlacements, annotations: snapAnnotations };
      state = restoreFromSnapshot(createGameState(puzzle), puzzle, snap);
      // Restore timer: reset startTime so getElapsedMs() continues from save point
      restoredMs = saved.elapsedMs;
      startTime = Date.now();
      resizeAndRedraw();
      showNarrativeIntro(document.body, puzzle, () => {});
    }, () => {
      clearPuzzleState(key);
      showNarrativeIntro(document.body, puzzle, () => {});
    });
  } else {
    showNarrativeIntro(document.body, puzzle, () => {});
  }

  // Initial render — defer one frame so the DOM has been laid out and
  // getBoundingClientRect returns real dimensions (critical on mobile).
  requestAnimationFrame(() => resizeAndRedraw());

  // Responsive resize
  const resizeObserver = new ResizeObserver(() => resizeAndRedraw());
  resizeObserver.observe(document.body);
}

// ─────────────────────────────────────────────
// DOM structure
// ─────────────────────────────────────────────

const SCREEN_STYLES = `
/* ── Desktop: horizontal side-by-side layout ───────────────────────── */
.alibi-game-screen {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #0d0d1a;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.012) 0px,
    rgba(255,255,255,0.012) 1px,
    transparent 1px,
    transparent 8px
  );
}
.alibi-grid-panel {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow: hidden;
  position: relative;
}
.alibi-canvas-wrapper {
  overflow: hidden;
  position: relative;
  border: 3px solid #8b6914;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.6), 0 0 32px rgba(139,105,20,0.2);
  background: #1a120a;
}
.alibi-right-pane {
  display: flex;
  flex-direction: column;
  width: 280px;
  flex-shrink: 0;
  height: 100vh;
}
.alibi-sidebar-container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border-left: 2px solid #8b6914;
  box-shadow: -4px 0 16px rgba(0,0,0,0.4);
  min-width: 200px;
  max-width: 300px;
}
.alibi-toolbar {
  display: flex;
  gap: 6px;
  padding: 8px 10px;
  background: #0a0a12;
  border-bottom: 2px solid #333;
  flex-shrink: 0;
}
.alibi-toolbar button {
  background: #1a1a2e;
  color: #ccc;
  border: 2px solid #444;
  border-radius: 0;
  padding: 5px 10px;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 0 #000;
}
.alibi-toolbar button:hover { background: #2a2a50; color: #fff; }
.alibi-toolbar button:active { transform: translate(1px,1px); box-shadow: 1px 1px 0 #000; }

/* ── Mobile (<700px): vertical stacked layout ──────────────────────── */
@media (max-width: 699px) {
  .alibi-game-screen {
    flex-direction: column;
    height: 100dvh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .alibi-grid-panel {
    flex: 0 0 auto;
    width: 100%;
    padding: 8px;
    align-items: flex-start;
    justify-content: center;
  }
  .alibi-right-pane {
    width: 100%;
    height: auto;
    flex-shrink: 0;
  }
  .alibi-sidebar-container {
    min-width: 0;
    max-width: none;
    width: 100%;
    height: auto;
    border-left: none;
    border-top: 2px solid #8b6914;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.4);
    -webkit-overflow-scrolling: touch;
  }
  .alibi-toolbar {
    flex-wrap: wrap;
    gap: 4px;
    padding: 6px 8px;
  }
  .alibi-toolbar button {
    padding: 8px 12px;
    font-size: 9px;
    min-height: 44px;
  }
}
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

  // Grid panel — layout controlled by .alibi-grid-panel CSS class
  const gridPanel = document.createElement('div');
  gridPanel.className = 'alibi-grid-panel';

  const canvasWrapper = document.createElement('div');
  canvasWrapper.className = 'alibi-canvas-wrapper';

  gridPanel.appendChild(canvasWrapper);

  // Right pane: toolbar + sidebar — layout controlled by .alibi-right-pane CSS class
  const rightPane = document.createElement('div');
  rightPane.className = 'alibi-right-pane';

  const toolbar = document.createElement('div');
  toolbar.className = 'alibi-toolbar';
  const undoBtn = btn('btn-undo', '↩ Undo');
  const redoBtn = btn('btn-redo', '↪ Redo');
  const muteBtn = btn('btn-mute', '🔊');
  toolbar.append(undoBtn, redoBtn, muteBtn);

  const sidebarContainer = document.createElement('div');
  sidebarContainer.className = 'alibi-sidebar-container';

  rightPane.append(toolbar, sidebarContainer);
  screen.append(gridPanel, rightPane);

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

function addShareButton(puzzle: Puzzle, elapsedMs: number, streak: number): void {
  const isDaily = new URLSearchParams(location.search).get('mode') === 'daily';
  const b = document.createElement('button');
  b.setAttribute('data-testid', 'btn-share');
  b.style.cssText =
    'position:fixed;bottom:24px;right:24px;z-index:300;' +
    'background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:10px 20px;' +
    'font-family:"Press Start 2P",monospace;font-size:11px;cursor:pointer;box-shadow:3px 3px 0 #6b0000;';
  b.textContent = '📋 Share Result';
  b.addEventListener('click', async () => {
    const text = isDaily && streak > 0
      ? generateDailyShareText(puzzle, elapsedMs, streak)
      : generateShareText(puzzle, elapsedMs);
    const ok = await copyToClipboard(text);
    b.textContent = ok ? '✓ Copied!' : '📋 Share Result';
    if (ok) setTimeout(() => { b.textContent = '📋 Share Result'; }, 2000);
  });
  document.body.appendChild(b);
}

/** Returns the date string for the day before the given YYYY-MM-DD. */
function getPreviousDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() - 1);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
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
    'align-items:center;justify-content:center;z-index:150;font-family:"Press Start 2P",monospace;';

  const box = document.createElement('div');
  box.style.cssText =
    'background:#0a0a12;border:3px solid #c0392b;border-radius:0;' +
    'box-shadow:4px 4px 0 #6b0000;padding:28px;max-width:360px;text-align:center;color:#fff;';

  const h = document.createElement('h2');
  h.style.cssText = 'color:#c0392b;margin-bottom:16px;font-family:"Press Start 2P",monospace;font-size:0.75em;line-height:1.6;';
  h.textContent = 'Resume?';

  const p = document.createElement('p');
  p.style.cssText = 'color:#aaa;margin-bottom:20px;font-family:"Press Start 2P",monospace;font-size:0.45em;line-height:2;';
  p.textContent = 'Continue your in-progress case?';

  const resumeB = document.createElement('button');
  resumeB.style.cssText =
    'background:#c0392b;color:#fff;border:2px solid #ff5a47;border-radius:0;padding:9px 20px;' +
    'font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;margin-right:8px;box-shadow:2px 2px 0 #6b0000;';
  resumeB.textContent = 'Resume';
  resumeB.addEventListener('click', () => { overlay.remove(); onResume(); });

  const freshB = document.createElement('button');
  freshB.style.cssText =
    'background:#1a1a2e;color:#fff;border:2px solid #555;border-radius:0;padding:9px 20px;' +
    'font-family:"Press Start 2P",monospace;font-size:9px;cursor:pointer;box-shadow:2px 2px 0 #000;';
  freshB.textContent = 'Start Fresh';
  freshB.addEventListener('click', () => { overlay.remove(); onFresh(); });

  box.append(h, p, resumeB, freshB);
  overlay.appendChild(box);
  screen.appendChild(overlay);
}
