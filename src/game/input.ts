/**
 * Input handler — wires canvas cell overlays, radial menu, and keyboard shortcuts.
 *
 * Overlays absolutely-positioned divs over each grid cell for Playwright-compatible
 * click targeting (banned: page.click('canvas', {position:…})).
 *
 * No engine logic. Delegates placement to game/state.ts via callbacks.
 */

import type { Puzzle } from '../engine/generator';
import type { Theme } from '../themes/index';
import { isPlaceable } from '../engine/grid';
import { CELL_SIZE } from '../render/canvas';
import type { GameState } from './state';

const RADIAL_STYLES = `
.alibi-radial-overlay {
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
}
.alibi-cell-overlay {
  position: absolute;
  cursor: pointer;
  pointer-events: all;
  box-sizing: border-box;
}
.alibi-cell-overlay.placeable:hover {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
}
.alibi-cell-overlay.victim-highlight {
  border: 3px solid #c0392b;
  background: rgba(192,57,43,0.15);
  cursor: pointer;
  animation: victim-pulse 1s ease-in-out infinite alternate;
}
@keyframes victim-pulse {
  from { background: rgba(192,57,43,0.1); }
  to   { background: rgba(192,57,43,0.3); }
}
.alibi-radial-menu {
  position: fixed;
  background: #0a0a12;
  border: 3px solid #c0392b;
  border-radius: 0;
  padding: 4px;
  z-index: 200;
  min-width: 140px;
  font-family: 'Press Start 2P', monospace;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.7);
}
.alibi-radial-item {
  padding: 10px 12px;
  cursor: pointer;
  color: #fff;
  font-size: 9px;
  border-radius: 0;
  white-space: nowrap;
  min-height: 44px;  /* touch target minimum per WCAG */
  display: flex;
  align-items: center;
  line-height: 1.6;
}
.alibi-radial-item:hover {
  background: #c0392b;
}
.alibi-radial-clear {
  color: #888;
  border-top: 2px solid #333;
  margin-top: 4px;
}
`;

let inputStylesInjected = false;
function injectInputStyles(): void {
  if (inputStylesInjected) return;
  const s = document.createElement('style');
  s.textContent = RADIAL_STYLES;
  document.head.appendChild(s);
  inputStylesInjected = true;
}

export interface InputCallbacks {
  onPlace:       (suspectId: string, x: number, y: number) => void;
  onRemove:      (suspectId: string) => void;
  onVictimClick: () => void;
}

/**
 * Attaches cell overlays and input handlers to the canvas wrapper.
 * Returns an object with updateOverlays() to refresh cell state and detach() to remove.
 *
 * @param canvasWrapper  The div wrapping the canvas element
 * @param puzzle         The active puzzle
 * @param _theme         The active theme (reserved for future use)
 * @param getState       Returns the current game state
 * @param callbacks      Placement and victim-click callbacks
 */
export function attachInputHandlers(
  canvasWrapper: HTMLElement,
  puzzle: Puzzle,
  _theme: Theme,
  getState: () => GameState,
  callbacks: InputCallbacks,
): { updateOverlays: () => void; detach: () => void } {
  injectInputStyles();

  const fp = puzzle.floorPlan;

  // Overlay container — fills the canvas area
  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'alibi-radial-overlay';
  overlayDiv.style.cssText =
    `position:absolute;top:0;left:0;` +
    `width:${fp.width * CELL_SIZE}px;height:${fp.height * CELL_SIZE}px;`;
  canvasWrapper.style.position = 'relative';
  canvasWrapper.appendChild(overlayDiv);

  // Create cell overlays for each grid cell
  const cellDivs: HTMLElement[][] = [];
  for (let y = 0; y < fp.height; y++) {
    cellDivs[y] = [];
    for (let x = 0; x < fp.width; x++) {
      const tile = fp.tiles[y][x];
      const cell = document.createElement('div');
      cell.setAttribute('data-testid', `cell-${x}-${y}`);
      cell.style.cssText =
        `position:absolute;left:${x * CELL_SIZE}px;top:${y * CELL_SIZE}px;` +
        `width:${CELL_SIZE}px;height:${CELL_SIZE}px;`;

      if (isPlaceable(tile)) {
        cell.classList.add('alibi-cell-overlay', 'placeable');
        cell.addEventListener('click', (e) => {
          e.stopPropagation();
          handleCellClick(x, y, getState, puzzle, callbacks);
        });
      }
      cellDivs[y][x] = cell;
      overlayDiv.appendChild(cell);
    }
  }

  let victimDiv: HTMLElement | null = null;

  // Dismiss radial menu on outside click
  const dismissRadial = () => removeRadialMenu();
  document.addEventListener('click', dismissRadial);

  function updateOverlays(): void {
    const state = getState();

    // Update victim cell overlay
    if (victimDiv) { victimDiv.remove(); victimDiv = null; }
    if (state.victimCell) {
      const { x, y } = state.victimCell;
      victimDiv = document.createElement('div');
      victimDiv.setAttribute('data-testid', 'victim-cell');
      victimDiv.className = 'alibi-cell-overlay victim-highlight';
      victimDiv.style.cssText =
        `position:absolute;left:${x * CELL_SIZE}px;top:${y * CELL_SIZE}px;` +
        `width:${CELL_SIZE}px;height:${CELL_SIZE}px;pointer-events:all;`;
      victimDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        callbacks.onVictimClick();
      });
      overlayDiv.appendChild(victimDiv);
    }

    // Pointer-events: none for blocked rows/cols (Rule of One enforced visually)
    const blockedRows = new Set<number>();
    const blockedCols = new Set<number>();
    for (const p of state.placements.values()) {
      blockedRows.add(p.y);
      blockedCols.add(p.x);
    }
    for (let y = 0; y < fp.height; y++) {
      for (let x = 0; x < fp.width; x++) {
        const d = cellDivs[y]?.[x];
        if (!d) continue;
        const tile = fp.tiles[y][x];
        const blocked = blockedRows.has(y) || blockedCols.has(x);
        // Allow clicking on a cell that already has a suspect (to remove/replace)
        const hasSuspect = Array.from(state.placements.values())
          .some(p => p.x === x && p.y === y);
        d.style.pointerEvents = (isPlaceable(tile) && (!blocked || hasSuspect)) ? 'all' : 'none';
      }
    }
  }

  function detach(): void {
    document.removeEventListener('click', dismissRadial);
    overlayDiv.remove();
  }

  updateOverlays();
  return { updateOverlays, detach };
}

// ─────────────────────────────────────────────
// Radial menu
// ─────────────────────────────────────────────

let activeRadial: HTMLElement | null = null;

function removeRadialMenu(): void {
  if (activeRadial) { activeRadial.remove(); activeRadial = null; }
}

function handleCellClick(
  x: number,
  y: number,
  getState: () => GameState,
  puzzle: Puzzle,
  callbacks: InputCallbacks,
): void {
  removeRadialMenu();
  const state = getState();

  // Find if a suspect is already at this cell
  const existing = Array.from(state.placements.entries())
    .find(([, p]) => p.x === x && p.y === y);

  const menu = document.createElement('div');
  menu.className = 'alibi-radial-menu';
  menu.setAttribute('data-testid', 'radial-menu');

  // Position menu to the right of the clicked cell
  const canvasEl = document.getElementById('game-canvas') as HTMLCanvasElement | null;
  const rect = canvasEl?.getBoundingClientRect() ?? { left: 0, top: 0 };
  menu.style.left = `${rect.left + (x + 1) * CELL_SIZE}px`;
  menu.style.top  = `${rect.top + y * CELL_SIZE}px`;

  // Unplaced suspects (or the one in this cell for replacement)
  const placedIds = new Set(state.placements.keys());
  const suspects = puzzle.suspects.filter(s => !placedIds.has(s.id));

  for (const suspect of suspects) {
    const item = document.createElement('div');
    item.className = 'alibi-radial-item';
    item.setAttribute('data-testid', `suspect-option-${suspect.id}`);
    item.textContent = suspect.name;
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      removeRadialMenu();
      callbacks.onPlace(suspect.id, x, y);
    });
    menu.appendChild(item);
  }

  // Clear option
  if (existing) {
    const clearItem = document.createElement('div');
    clearItem.className = 'alibi-radial-item alibi-radial-clear';
    clearItem.setAttribute('data-testid', 'suspect-option-clear');
    clearItem.textContent = 'Clear';
    clearItem.addEventListener('click', (e) => {
      e.stopPropagation();
      removeRadialMenu();
      callbacks.onRemove(existing[0]);
    });
    menu.appendChild(clearItem);
  }

  if (menu.children.length === 0) return;

  document.body.appendChild(menu);
  activeRadial = menu;
}
