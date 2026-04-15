/**
 * Input handler — cell overlays + circular wheel radial menu.
 *
 * Stage 7b: radial menu replaced with a circular pie-wheel centered on the
 * clicked cell. Supports drag-to-select on touch devices.
 *
 * Cell overlays remain absolutely-positioned divs for Playwright testid access.
 * No engine logic. Delegates to game/state.ts via callbacks.
 */

import type { Puzzle } from '../engine/generator';
import type { Theme } from '../themes/index';
import { isPlaceable } from '../engine/grid';
import { CELL_SIZE } from '../render/canvas';
import type { GameState } from './state';

const WHEEL_STYLES = `
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
  background: rgba(255,255,255,0.1);
}
.alibi-cell-overlay.victim-highlight {
  border: 4px solid #c0392b;
  background: rgba(192,57,43,0.18);
  cursor: pointer;
  animation: victim-pulse 0.9s ease-in-out infinite alternate;
}
@keyframes victim-pulse {
  from { background: rgba(192,57,43,0.1); }
  to   { background: rgba(192,57,43,0.35); }
}

/* ── Wheel container ──────────────────────────────────────────────────── */
.alibi-wheel {
  position: fixed;
  z-index: 500;
  pointer-events: none;
  /* Centered on click via transform */
}
.alibi-wheel-backdrop {
  position: fixed;
  inset: 0;
  z-index: 499;
  background: transparent;
  cursor: default;
}
.alibi-wheel-svg {
  pointer-events: all;
  overflow: visible;
  filter: drop-shadow(0 4px 16px rgba(0,0,0,0.7));
  animation: wheel-open 0.14s cubic-bezier(0.22,1,0.36,1) both;
  transform-origin: center;
}
@keyframes wheel-open {
  from { transform: scale(0.2); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}
.alibi-wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28px;
  height: 28px;
  background: #1a1a2e;
  border: 2px solid #555;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #888;
  cursor: pointer;
  pointer-events: all;
  z-index: 501;
  font-family: 'Press Start 2P', monospace;
}
.alibi-wheel-center:hover {
  border-color: #c0392b;
  color: #c0392b;
}
/* Hidden testid targets for Playwright — each item gets a real DOM div */
.alibi-wheel-item-target {
  position: absolute;
  pointer-events: none;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
}
`;

let wheelStylesInjected = false;
function injectWheelStyles(): void {
  if (wheelStylesInjected) return;
  const s = document.createElement('style');
  s.textContent = WHEEL_STYLES;
  document.head.appendChild(s);
  wheelStylesInjected = true;
}

export interface InputCallbacks {
  onPlace:            (suspectId: string, x: number, y: number) => void;
  onRemove:           (suspectId: string) => void;
  onVictimClick:      () => void;
  onToggleX:          (x: number, y: number) => void;
  onAddCandidate:     (suspectId: string, x: number, y: number) => void;
  onRemoveCandidate:  (suspectId: string, x: number, y: number) => void;
}

/** A wheel menu item. */
interface WheelItem {
  label: string;      // short display label (initial or icon)
  sublabel: string;   // full description
  testid: string;
  color: string;
  onClick: () => void;
}

// Active wheel state
let activeWheel: HTMLElement | null = null;
let activeBackdrop: HTMLElement | null = null;

function removeWheel(): void {
  activeWheel?.remove();
  activeBackdrop?.remove();
  activeWheel = null;
  activeBackdrop = null;
}

/**
 * Opens the circular wheel menu centered at (screenX, screenY).
 * Items are arranged in arcs; drag-to-select on touch.
 */
function openWheel(
  screenX: number,
  screenY: number,
  items: WheelItem[],
): void {
  removeWheel();
  if (!items.length) return;

  const R = 52;   // arc center radius (px from center)
  const r = 22;   // arc slice radius (half-width of each slice)

  // Clamp wheel center to stay fully within viewport
  const halfSize = R + r + 4;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const clampedX = Math.max(halfSize, Math.min(vw - halfSize, screenX));
  const clampedY = Math.max(halfSize, Math.min(vh - halfSize, screenY));

  // Backdrop — closes wheel on click outside
  const backdrop = document.createElement('div');
  backdrop.className = 'alibi-wheel-backdrop';
  backdrop.addEventListener('click', removeWheel);
  backdrop.addEventListener('touchstart', removeWheel, { passive: true });
  document.body.appendChild(backdrop);
  activeBackdrop = backdrop;

  // Wheel container
  const wheel = document.createElement('div');
  wheel.className = 'alibi-wheel';
  wheel.setAttribute('data-testid', 'radial-menu');
  wheel.style.left = `${clampedX}px`;
  wheel.style.top  = `${clampedY}px`;
  wheel.style.transform = 'translate(-50%, -50%)';
  wheel.style.pointerEvents = 'all';

  const N = items.length;
  const svgSize = (R + r + 4) * 2;
  const cx = svgSize / 2, cy = svgSize / 2;

  // SVG for arcs
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'alibi-wheel-svg');
  svg.setAttribute('width', String(svgSize));
  svg.setAttribute('height', String(svgSize));
  svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);

  // Track hover segment for drag
  let hoveredIdx = -1;

  items.forEach((item, i) => {
    const startAngle = (i / N) * Math.PI * 2 - Math.PI / 2;
    const endAngle   = ((i + 1) / N) * Math.PI * 2 - Math.PI / 2;
    const midAngle   = (startAngle + endAngle) / 2;

    const gap = 0.06; // radian gap between slices
    const innerR = 18, outerR = R + r;

    // Arc path
    const x1i = cx + innerR * Math.cos(startAngle + gap);
    const y1i = cy + innerR * Math.sin(startAngle + gap);
    const x2i = cx + innerR * Math.cos(endAngle - gap);
    const y2i = cy + innerR * Math.sin(endAngle - gap);
    const x1o = cx + outerR * Math.cos(startAngle + gap);
    const y1o = cy + outerR * Math.sin(startAngle + gap);
    const x2o = cx + outerR * Math.cos(endAngle - gap);
    const y2o = cy + outerR * Math.sin(endAngle - gap);
    const laf = (endAngle - startAngle - gap * 2) > Math.PI ? 1 : 0;

    const pathD = [
      `M ${x1i} ${y1i}`,
      `A ${innerR} ${innerR} 0 ${laf} 1 ${x2i} ${y2i}`,
      `L ${x2o} ${y2o}`,
      `A ${outerR} ${outerR} 0 ${laf} 0 ${x1o} ${y1o}`,
      'Z',
    ].join(' ');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('fill', item.color);
    path.setAttribute('stroke', 'rgba(0,0,0,0.5)');
    path.setAttribute('stroke-width', '1.5');
    path.style.cursor = 'pointer';
    path.style.transition = 'filter 0.08s';

    // Label text
    const labelR = (innerR + outerR) / 2;
    const tx = cx + labelR * Math.cos(midAngle);
    const ty = cy + labelR * Math.sin(midAngle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', String(tx));
    text.setAttribute('y', String(ty));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', '#ffffff');
    text.setAttribute('font-size', N > 8 ? '7' : '8');
    text.setAttribute('font-family', "'Press Start 2P', monospace");
    text.setAttribute('pointer-events', 'none');
    text.style.userSelect = 'none';
    text.textContent = item.label;

    path.setAttribute('data-testid', item.testid);

    // Hover
    path.addEventListener('mouseenter', () => {
      path.style.filter = 'brightness(1.4)';
      text.setAttribute('fill', '#ffffc0');
    });
    path.addEventListener('mouseleave', () => {
      path.style.filter = '';
      text.setAttribute('fill', '#ffffff');
    });
    path.addEventListener('click', (e) => {
      e.stopPropagation();
      removeWheel();
      item.onClick();
    });

    svg.appendChild(path);
    svg.appendChild(text);
  });

  // Touch drag: angle → segment selection
  let touchActive = false;
  svg.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchActive = true;
  }, { passive: false });

  svg.addEventListener('touchmove', (e) => {
    if (!touchActive) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = svg.getBoundingClientRect();
    const dx = touch.clientX - (rect.left + rect.width / 2);
    const dy = touch.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 16) { // center — no highlight
      if (hoveredIdx >= 0) {
        (svg.children[hoveredIdx * 2] as SVGElement).style.filter = '';
        hoveredIdx = -1;
      }
      return;
    }
    let angle = Math.atan2(dy, dx) + Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;
    const idx = Math.floor((angle / (Math.PI * 2)) * N) % N;
    if (idx !== hoveredIdx) {
      if (hoveredIdx >= 0) (svg.children[hoveredIdx * 2] as SVGElement).style.filter = '';
      hoveredIdx = idx;
      (svg.children[idx * 2] as SVGElement).style.filter = 'brightness(1.5)';
    }
  }, { passive: false });

  svg.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchActive = false;
    if (hoveredIdx >= 0 && hoveredIdx < items.length) {
      removeWheel();
      items[hoveredIdx].onClick();
    }
    hoveredIdx = -1;
  }, { passive: false });

  wheel.appendChild(svg);

  // Center cancel button
  const center = document.createElement('div');
  center.className = 'alibi-wheel-center';
  center.textContent = '✕';
  center.addEventListener('click', (e) => { e.stopPropagation(); removeWheel(); });
  wheel.appendChild(center);

  document.body.appendChild(wheel);
  activeWheel = wheel;
}

/**
 * Attaches cell overlays and input handlers to the canvas wrapper.
 */
export function attachInputHandlers(
  canvasWrapper: HTMLElement,
  puzzle: Puzzle,
  _theme: Theme,
  getState: () => GameState,
  callbacks: InputCallbacks,
): { updateOverlays: () => void; detach: () => void } {
  injectWheelStyles();

  const fp = puzzle.floorPlan;
  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'alibi-radial-overlay';
  overlayDiv.style.cssText =
    `position:absolute;top:0;left:0;` +
    `width:${fp.width * CELL_SIZE}px;height:${fp.height * CELL_SIZE}px;`;
  canvasWrapper.style.position = 'relative';
  canvasWrapper.appendChild(overlayDiv);

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
        cell.style.touchAction = 'manipulation'; // no 300ms delay on mobile
        cell.addEventListener('click', (e) => {
          e.stopPropagation();
          // Calculate screen center of the cell
          const rect = canvasWrapper.getBoundingClientRect();
          const screenX = rect.left + (x + 0.5) * CELL_SIZE;
          const screenY = rect.top  + (y + 0.5) * CELL_SIZE;
          handleCellClick(x, y, screenX, screenY, getState, puzzle, callbacks);
        });
      }
      cellDivs[y][x] = cell;
      overlayDiv.appendChild(cell);
    }
  }

  let victimDiv: HTMLElement | null = null;
  const dismissWheel = () => removeWheel();
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') removeWheel(); });

  function updateOverlays(): void {
    const state = getState();

    // Victim overlay
    if (victimDiv) { victimDiv.remove(); victimDiv = null; }
    if (state.victimCell) {
      const { x, y } = state.victimCell;
      victimDiv = document.createElement('div');
      victimDiv.setAttribute('data-testid', 'victim-cell');
      victimDiv.className = 'alibi-cell-overlay victim-highlight';
      victimDiv.style.cssText =
        `position:absolute;left:${x * CELL_SIZE}px;top:${y * CELL_SIZE}px;` +
        `width:${CELL_SIZE}px;height:${CELL_SIZE}px;pointer-events:all;touch-action:manipulation;`;
      victimDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        callbacks.onVictimClick();
      });
      overlayDiv.appendChild(victimDiv);
    }

    // Update cell pointer-events
    const blockedRows = new Set<number>(), blockedCols = new Set<number>();
    for (const p of state.placements.values()) {
      blockedRows.add(p.y); blockedCols.add(p.x);
    }
    for (let y = 0; y < fp.height; y++) {
      for (let x = 0; x < fp.width; x++) {
        const d = cellDivs[y]?.[x]; if (!d) continue;
        const tile = fp.tiles[y][x];
        const hasSuspect = Array.from(state.placements.values()).some(p => p.x === x && p.y === y);
        const blocked = blockedRows.has(y) || blockedCols.has(x);
        d.style.pointerEvents = (isPlaceable(tile) && (!blocked || hasSuspect)) ? 'all' : 'none';
      }
    }

    // Resize overlay if CELL_SIZE changed
    overlayDiv.style.width  = `${fp.width  * CELL_SIZE}px`;
    overlayDiv.style.height = `${fp.height * CELL_SIZE}px`;
    for (let y = 0; y < fp.height; y++) {
      for (let x = 0; x < fp.width; x++) {
        const d = cellDivs[y]?.[x]; if (!d) continue;
        d.style.left   = `${x * CELL_SIZE}px`;
        d.style.top    = `${y * CELL_SIZE}px`;
        d.style.width  = `${CELL_SIZE}px`;
        d.style.height = `${CELL_SIZE}px`;
      }
    }

    // Remove old annotation overlays
    overlayDiv.querySelectorAll('[data-annotation]').forEach(el => el.remove());
    for (const [ax, ay] of state.annotations.x) {
      const xEl = document.createElement('div');
      xEl.setAttribute('data-testid', `cell-annotation-x-${ax}-${ay}`);
      xEl.setAttribute('data-annotation', 'x');
      xEl.style.cssText =
        `position:absolute;left:${ax*CELL_SIZE}px;top:${ay*CELL_SIZE}px;` +
        `width:${CELL_SIZE}px;height:${CELL_SIZE}px;pointer-events:none;`;
      overlayDiv.appendChild(xEl);
    }
    for (const [cellKey, candidateIds] of Object.entries(state.annotations.candidates)) {
      if (!candidateIds.length) continue;
      const [ax, ay] = cellKey.split(',').map(Number);
      const qEl = document.createElement('div');
      qEl.setAttribute('data-testid', `cell-annotation-candidates-${ax}-${ay}`);
      qEl.setAttribute('data-annotation', 'candidates');
      qEl.setAttribute('data-candidates', candidateIds.join(','));
      qEl.style.cssText =
        `position:absolute;left:${ax*CELL_SIZE}px;top:${ay*CELL_SIZE}px;` +
        `width:${CELL_SIZE}px;height:${CELL_SIZE}px;pointer-events:none;`;
      overlayDiv.appendChild(qEl);
    }
  }

  function detach(): void {
    document.removeEventListener('click', dismissWheel);
    overlayDiv.remove();
    removeWheel();
  }

  updateOverlays();
  return { updateOverlays, detach };
}

/** Suspect colors for wheel items. */
function suspectColor(suspectId: string): string {
  let h = 0;
  for (let i = 0; i < suspectId.length; i++) h = (h * 31 + suspectId.charCodeAt(i)) & 0xffff;
  const hues = [0, 30, 60, 120, 180, 210, 270, 300];
  return `hsl(${hues[h % hues.length]}, 65%, 40%)`;
}

function handleCellClick(
  x: number,
  y: number,
  screenX: number,
  screenY: number,
  getState: () => GameState,
  puzzle: Puzzle,
  callbacks: InputCallbacks,
): void {
  const state = getState();

  const existing = Array.from(state.placements.entries())
    .find(([, p]) => p.x === x && p.y === y);

  const placedIds = new Set(state.placements.keys());
  const unplacedSuspects = puzzle.suspects.filter(s => !placedIds.has(s.id));

  // ── Level 1: placement wheel ──────────────────────────────────────────────
  // Items: unplaced suspects + X mark + ? (candidate sub-wheel entry) + remove
  // Maximum N+2 arcs (N suspects + X + ?), plus remove if a suspect is here.
  const items: WheelItem[] = [];

  // Suspect placement options
  for (const suspect of unplacedSuspects) {
    items.push({
      label:    suspect.name.charAt(0).toUpperCase(),
      sublabel: `Place ${suspect.name}`,
      testid:   `suspect-option-${suspect.id}`,
      color:    suspectColor(suspect.id),
      onClick:  () => callbacks.onPlace(suspect.id, x, y),
    });
  }

  // X annotation toggle
  const hasX = state.annotations.x.some(([ax, ay]) => ax === x && ay === y);
  items.push({
    label:    '✕',
    sublabel: hasX ? 'Clear X' : 'Mark X',
    testid:   'suspect-option-markx',
    color:    hasX ? '#5a1a1a' : '#3a1a1a',
    onClick:  () => callbacks.onToggleX(x, y),
  });

  // ? sub-wheel entry point (only if there are unplaced suspects to annotate)
  if (unplacedSuspects.length > 0) {
    items.push({
      label:    '?',
      sublabel: 'Mark candidate',
      testid:   'suspect-option-candidates',
      color:    '#1a3a5a',
      onClick:  () => openCandidateSubWheel(x, y, screenX, screenY, getState, puzzle, callbacks),
    });
  }

  // Remove suspect option (if this cell has a placed suspect)
  if (existing) {
    items.push({
      label:    '↩',
      sublabel: 'Remove',
      testid:   'suspect-option-clear',
      color:    '#2a2a2a',
      onClick:  () => callbacks.onRemove(existing[0]),
    });
  }

  if (!items.length) return;
  openWheel(screenX, screenY, items);
}

/**
 * Opens the candidate sub-wheel (Level 2).
 * Shows only the ? candidate toggle options for unplaced suspects.
 * Replaces the main wheel — the player gets here via the '?' arc.
 */
function openCandidateSubWheel(
  x: number,
  y: number,
  screenX: number,
  screenY: number,
  getState: () => GameState,
  puzzle: Puzzle,
  callbacks: InputCallbacks,
): void {
  const state = getState();
  const placedIds = new Set(state.placements.keys());
  const cellCandidates = state.annotations.candidates[`${x},${y}`] ?? [];

  const items: WheelItem[] = [];

  for (const suspect of puzzle.suspects) {
    if (placedIds.has(suspect.id)) continue;
    const hasQ = cellCandidates.includes(suspect.id);
    items.push({
      label:    suspect.name.charAt(0).toUpperCase() + '?',
      sublabel: hasQ ? `Remove ${suspect.name}?` : `Maybe ${suspect.name}`,
      testid:   `suspect-option-candidate-${suspect.id}`,
      color:    hasQ ? '#2a2a5a' : '#1a1a3a',
      onClick:  () => hasQ
        ? callbacks.onRemoveCandidate(suspect.id, x, y)
        : callbacks.onAddCandidate(suspect.id, x, y),
    });
  }

  if (items.length) openWheel(screenX, screenY, items);
}
