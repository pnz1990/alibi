/**
 * DOM sidebar renderer for ALIBI — Stage 7b.
 *
 * Renders: room legend, victim section, suspect portrait cards, clue cards.
 * Clue text uses readable system font (not pixel font).
 * No engine logic. No localStorage.
 */

import type { Puzzle } from '../engine/generator';
import type { SuspectPlacement } from '../engine/logic';

const SIDEBAR_STYLES = `
/* ── Sidebar container ─────────────────────────────────────────────────── */
.alibi-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  background: #f0ead8;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 23px,
    rgba(100,80,60,0.07) 23px,
    rgba(100,80,60,0.07) 24px
  );
  color: #1a0e08;
  font-family: 'Press Start 2P', monospace;
  width: 100%;
  min-width: 200px;
  max-width: 300px;
  overflow-y: auto;
  border-left: 3px solid #8b6914;
  box-shadow: inset 4px 0 12px rgba(0,0,0,0.12);
}

/* ── Section headers ───────────────────────────────────────────────────── */
.alibi-sidebar-section {
  padding: 8px 12px 4px;
}
.alibi-sidebar-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  color: #8b6914;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(139,105,20,0.3);
  padding-bottom: 4px;
  margin-bottom: 6px;
}

/* ── Room legend ───────────────────────────────────────────────────────── */
.alibi-room-legend {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 6px 12px 8px;
}
.alibi-room-entry {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Press Start 2P', monospace;
  font-size: 6px;
  color: #2a1a08;
}
.alibi-room-swatch {
  width: 10px;
  height: 10px;
  border: 1px solid rgba(0,0,0,0.2);
  flex-shrink: 0;
}

/* ── Victim section ────────────────────────────────────────────────────── */
.alibi-victim-section {
  padding: 6px 12px 8px;
  border-top: 1px solid rgba(139,105,20,0.2);
}
.alibi-victim-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: rgba(180, 40, 40, 0.07);
  border: 1px dashed rgba(180,40,40,0.3);
}
.alibi-victim-icon {
  width: 28px;
  height: 28px;
  background: rgba(180,40,40,0.15);
  border: 1px solid rgba(180,40,40,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}
.alibi-victim-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 6px;
  color: #8a1010;
  line-height: 1.8;
}

/* ── Suspect section ───────────────────────────────────────────────────── */
.alibi-suspect-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 12px 8px;
  border-top: 1px solid rgba(139,105,20,0.2);
}
.alibi-suspect-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: #e8dfc8;
  border: 2px solid #b09060;
  cursor: default;
  transition: border-color 0.1s;
}
.alibi-suspect-card.placed {
  border-color: #c0392b;
  background: #f5d8c0;
}
.alibi-suspect-portrait {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
.alibi-suspect-portrait canvas {
  display: block;
}
.alibi-suspect-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}
.alibi-suspect-name {
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  color: #1a0e08;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.alibi-suspect-status {
  font-family: 'Press Start 2P', monospace;
  font-size: 5px;
  color: #888;
}
.alibi-suspect-card.placed .alibi-suspect-status {
  color: #c0392b;
}

/* ── Evidence (clue) section ───────────────────────────────────────────── */
.alibi-clue-section {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px 12px 12px;
  border-top: 1px solid rgba(139,105,20,0.2);
}
.alibi-clue-card {
  padding: 7px 10px;
  background: transparent;
  border: 0;
  border-left: 3px solid rgba(139,105,20,0.5);
  /* KEY: use readable system font for clue body text, not pixel font */
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 11px;
  line-height: 1.55;
  color: #2a1a08;
}
.alibi-clue-card:hover {
  background: rgba(139,105,20,0.06);
}
.alibi-clue-card.clue-satisfied {
  text-decoration: line-through;
  color: #a09070;
  border-left-color: #6a9040;
  opacity: 0.7;
}
.alibi-clue-card.clue-error {
  border-left-color: #c0392b;
  background: rgba(192,57,43,0.07);
  color: #c0392b;
  animation: alibi-clue-flash 0.5s ease-in-out 3;
}
@keyframes alibi-clue-flash {
  0%, 100% { background: transparent; }
  50%       { background: rgba(192,57,43,0.2); }
}

/* ── Mobile overrides ───────────────────────────────────────────────── */
@media (max-width: 699px) {
  .alibi-sidebar {
    min-width: 0;
    max-width: none;
    width: 100%;
    border-left: none;
  }
  .alibi-sidebar-label {
    font-size: 8px;
  }
  .alibi-room-entry {
    font-size: 8px;
  }
  .alibi-victim-label {
    font-size: 8px;
  }
  .alibi-suspect-name {
    font-size: 9px;
  }
  .alibi-suspect-status {
    font-size: 7px;
  }
  .alibi-clue-card {
    font-size: 13px;
    padding: 8px 12px;
  }
  /* Bigger tap targets for suspect cards */
  .alibi-suspect-card {
    padding: 8px 10px;
  }
}
`;

// Room tint colors matching canvas.ts (must stay in sync)
const ROOM_TINT_FILLS = [
  'rgba(220,140,40,0.35)',
  'rgba(60,120,220,0.35)',
  'rgba(40,170,80,0.35)',
  'rgba(200,40,120,0.35)',
  'rgba(180,160,20,0.35)',
  'rgba(100,40,200,0.35)',
];
const ROOM_BORDER_CSS = [
  '#dc8c28', '#3c78dc', '#28aa50', '#c82878', '#b4a014', '#6428c8',
];

let stylesInjected = false;
function injectStyles(): void {
  if (stylesInjected) return;
  const s = document.createElement('style');
  s.textContent = SIDEBAR_STYLES;
  document.head.appendChild(s);
  stylesInjected = true;
}

/** Returns a deterministic HSL color for a suspect ID — matches canvas.ts suspectColor(). */
function suspectColor(suspectId: string): string {
  let h = 0;
  for (let i = 0; i < suspectId.length; i++) h = (h * 31 + suspectId.charCodeAt(i)) & 0xffff;
  const hues = [0, 30, 60, 120, 180, 210, 270, 300];
  return `hsl(${hues[h % hues.length]}, 70%, 52%)`;
}

/** Draw a small geometric portrait on a canvas element. */
function drawPortrait(canvas: HTMLCanvasElement, suspectId: string, name: string, placed: boolean): void {
  const size = 32;
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const color = suspectColor(suspectId);

  // Background
  ctx.fillStyle = placed ? color : 'rgba(180,160,120,0.3)';
  ctx.fillRect(0, 0, size, size);

  // Simple geometric face
  // Head circle
  ctx.fillStyle = placed ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)';
  ctx.beginPath();
  ctx.arc(size / 2, size * 0.38, size * 0.28, 0, Math.PI * 2);
  ctx.fill();

  // Body trapezoid
  ctx.fillStyle = placed ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.06)';
  ctx.beginPath();
  ctx.moveTo(size * 0.28, size * 0.65);
  ctx.lineTo(size * 0.72, size * 0.65);
  ctx.lineTo(size * 0.85, size);
  ctx.lineTo(size * 0.15, size);
  ctx.closePath();
  ctx.fill();

  // Initial letter
  ctx.fillStyle = placed ? '#ffffff' : 'rgba(60,40,10,0.6)';
  ctx.font = `bold ${Math.floor(size * 0.45)}px 'Press Start 2P', monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.charAt(0).toUpperCase(), size / 2, size * 0.38);
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';

  // Border
  ctx.strokeStyle = placed ? color : 'rgba(139,105,20,0.5)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, size - 2, size - 2);
}

/**
 * Renders the full sidebar: room legend, victim, suspects, clues.
 */
export function renderSidebar(
  container: HTMLElement,
  puzzle: Puzzle,
  placements: ReadonlyMap<string, SuspectPlacement>,
  satisfiedClues: ReadonlySet<number>,
  errorClues: ReadonlySet<number>,
): void {
  injectStyles();
  container.innerHTML = '';
  container.className = 'alibi-sidebar';

  // ── Room legend ────────────────────────────────────────────────────────
  const legendSection = document.createElement('div');
  legendSection.className = 'alibi-sidebar-section';
  const legendLabel = document.createElement('div');
  legendLabel.className = 'alibi-sidebar-label';
  legendLabel.textContent = 'Rooms';
  legendSection.appendChild(legendLabel);

  const legend = document.createElement('div');
  legend.className = 'alibi-room-legend';
  puzzle.floorPlan.rooms.forEach((room, idx) => {
    const entry = document.createElement('div');
    entry.className = 'alibi-room-entry';
    const swatch = document.createElement('div');
    swatch.className = 'alibi-room-swatch';
    swatch.style.background = ROOM_TINT_FILLS[idx % ROOM_TINT_FILLS.length];
    swatch.style.borderColor = ROOM_BORDER_CSS[idx % ROOM_BORDER_CSS.length];
    const nameEl = document.createElement('span');
    nameEl.textContent = room.name;
    entry.appendChild(swatch);
    entry.appendChild(nameEl);
    legend.appendChild(entry);
  });
  legendSection.appendChild(legend);
  container.appendChild(legendSection);

  // ── Victim section ─────────────────────────────────────────────────────
  const victimSection = document.createElement('div');
  victimSection.className = 'alibi-victim-section';
  const victimLabel = document.createElement('div');
  victimLabel.className = 'alibi-sidebar-label';
  victimLabel.textContent = 'Victim';
  victimSection.appendChild(victimLabel);

  const victimCard = document.createElement('div');
  victimCard.className = 'alibi-victim-card';
  victimCard.setAttribute('data-testid', 'victim-token');

  const victimIcon = document.createElement('div');
  victimIcon.className = 'alibi-victim-icon';
  victimIcon.textContent = '?';

  const victimInfo = document.createElement('div');
  victimInfo.className = 'alibi-victim-label';
  const allPlaced = placements.size >= puzzle.suspects.length;
  if (allPlaced) {
    victimInfo.textContent = 'Location revealed!\nClick victim cell';
    victimIcon.textContent = '☠';
    victimCard.style.borderColor = 'rgba(192,57,43,0.7)';
    victimCard.style.background = 'rgba(192,57,43,0.12)';
  } else {
    victimInfo.textContent = `Unknown\nPlace all ${puzzle.suspects.length} suspects`;
  }
  victimCard.appendChild(victimIcon);
  victimCard.appendChild(victimInfo);
  victimSection.appendChild(victimCard);
  container.appendChild(victimSection);

  // ── Suspects section ───────────────────────────────────────────────────
  const suspectSection = document.createElement('div');
  suspectSection.className = 'alibi-sidebar-section';
  const suspectLabel = document.createElement('div');
  suspectLabel.className = 'alibi-sidebar-label';
  suspectLabel.textContent = 'Suspects';
  suspectSection.appendChild(suspectLabel);

  const suspectList = document.createElement('div');
  suspectList.className = 'alibi-suspect-section';
  for (const suspect of puzzle.suspects) {
    const isPlaced = placements.has(suspect.id);
    const card = document.createElement('div');
    card.className = 'alibi-suspect-card' + (isPlaced ? ' placed' : '');
    card.setAttribute('data-testid', `suspect-card-${suspect.id}`);

    // Portrait canvas
    const portraitWrap = document.createElement('div');
    portraitWrap.className = 'alibi-suspect-portrait';
    const portraitCanvas = document.createElement('canvas');
    drawPortrait(portraitCanvas, suspect.id, suspect.name, isPlaced);
    portraitWrap.appendChild(portraitCanvas);

    // Info
    const info = document.createElement('div');
    info.className = 'alibi-suspect-info';
    const nameEl = document.createElement('div');
    nameEl.className = 'alibi-suspect-name';
    nameEl.textContent = suspect.name;
    const statusEl = document.createElement('div');
    statusEl.className = 'alibi-suspect-status';
    if (isPlaced) {
      const placement = placements.get(suspect.id)!;
      statusEl.textContent = `Col ${placement.x + 1}, Row ${placement.y + 1}`;
    } else {
      statusEl.textContent = 'Not placed';
    }
    info.appendChild(nameEl);
    info.appendChild(statusEl);

    card.appendChild(portraitWrap);
    card.appendChild(info);
    suspectList.appendChild(card);
  }
  suspectSection.appendChild(suspectList);
  container.appendChild(suspectSection);

  // ── Evidence section ───────────────────────────────────────────────────
  const clueSection = document.createElement('div');
  clueSection.className = 'alibi-sidebar-section';
  const clueLabel = document.createElement('div');
  clueLabel.className = 'alibi-sidebar-label';
  clueLabel.textContent = 'Evidence';
  clueSection.appendChild(clueLabel);

  const clueList = document.createElement('div');
  clueList.className = 'alibi-clue-section';
  puzzle.clues.forEach((clue, i) => {
    const card = document.createElement('div');
    card.className = 'alibi-clue-card';
    card.setAttribute('data-testid', `clue-${i}`);
    if (satisfiedClues.has(i)) card.classList.add('clue-satisfied');
    if (errorClues.has(i)) card.classList.add('clue-error');
    card.textContent = clue.text;
    clueList.appendChild(card);
  });
  clueSection.appendChild(clueList);
  container.appendChild(clueSection);
}
