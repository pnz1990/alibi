/**
 * Canvas grid renderer for ALIBI — Stage 7b full rewrite.
 *
 * Renders in this layer order:
 *  1. Room tint fills (distinct color per room)
 *  2. Tile draws (wall brick, floor, seat, object sprites)
 *  3. Room boundary borders
 *  4. Room name labels
 *  5. Rule-of-One shadow overlays
 *  6. Victim cell (placeholder ? or revealed accent)
 *  7. Placed suspect tokens
 *  8. Cell annotations (X marks, ? candidates)
 *
 * No engine logic. Pure side effects: reads Puzzle + state, writes to canvas.
 */

import type { Puzzle } from '../engine/generator';
import type { SuspectPlacement } from '../engine/logic';
import type { Theme } from '../themes/index';
import type { CellAnnotations } from '../storage/schema';
import { getSpatialMask } from '../engine/logic';
import { SPRITE_SVGS } from '../assets/sprites/index';

/** Base cell size — can be overridden by responsive scaling. */
export let CELL_SIZE = 64;

/**
 * Updates CELL_SIZE to fit the available viewport.
 * Call on init and on window resize.
 */
export function updateCellSize(floorWidth: number, floorHeight: number): number {
  const maxH = (window.innerHeight - 80) / floorHeight;
  const maxW = (window.innerWidth * 0.62) / floorWidth;
  CELL_SIZE = Math.max(56, Math.min(96, Math.floor(Math.min(maxH, maxW))));
  return CELL_SIZE;
}

/** Cached sprite images keyed by SVG string hash. */
const spriteCache = new Map<string, HTMLImageElement>();
const spriteLoading = new Set<string>();

function getSprite(svgString: string, onLoaded?: () => void): HTMLImageElement | null {
  if (!svgString) return null;
  if (spriteCache.has(svgString)) return spriteCache.get(svgString)!;
  if (spriteLoading.has(svgString)) return null;
  spriteLoading.add(svgString);
  const img = new Image();
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  img.onload = () => {
    spriteCache.set(svgString, img);
    spriteLoading.delete(svgString);
    URL.revokeObjectURL(url);
    onLoaded?.();
  };
  img.src = url;
  return null;
}

const PIXEL_FONT = "'Press Start 2P', monospace";

/** Room tint palette — distinct, muted, works on both light and dark floor colors. */
const ROOM_TINTS = [
  'rgba(192, 120,  40, 0.18)', // warm amber
  'rgba( 40, 100, 180, 0.16)', // cool slate blue
  'rgba( 40, 150,  80, 0.16)', // muted green
  'rgba(160,  40, 100, 0.16)', // dusty rose
  'rgba(140, 120,  40, 0.16)', // gold
  'rgba( 80,  40, 160, 0.16)', // purple
];
const ROOM_BORDER_COLORS = [
  'rgba(220, 140,  40, 0.75)',
  'rgba( 60, 120, 220, 0.75)',
  'rgba( 40, 170,  80, 0.75)',
  'rgba(200,  40, 120, 0.75)',
  'rgba(180, 160,  20, 0.75)',
  'rgba(100,  40, 200, 0.75)',
];

/** Maps tile short-codes to object type strings. */
const TILE_TO_OBJECT_TYPE: Readonly<Record<string, string>> = {
  pL: 'object:plant',       tB: 'object:table',       sH: 'object:shelf',
  cR: 'object:cash-register', bB: 'object:bar-counter', tV: 'object:tv',
  cT: 'object:counter',     dK: 'object:desk',        pC: 'object:photocopier',
  fB: 'object:flower-bed',  hB: 'object:hospital-bed', mC: 'object:medicine-cabinet',
  tR: 'object:tree',        tD: 'object:teddy-bear',  cH: 'object:carousel-horse',
  tM: 'object:treadmill',   wT: 'object:weight-rack', sT: 'object:stall',
  jZ: 'object:jacuzzi-tile',
};

const SEAT_TILES = new Set(['C', 'S', 'B']);
const SEAT_TO_SPRITE: Record<string, string> = { C: 'chair', S: 'sofa', B: 'bed' };

/** Derive a distinct suspect color from ID. */
function suspectColor(suspectId: string): string {
  let h = 0;
  for (let i = 0; i < suspectId.length; i++) h = (h * 31 + suspectId.charCodeAt(i)) & 0xffff;
  const hues = [0, 30, 60, 120, 180, 210, 270, 300];
  return `hsl(${hues[h % hues.length]}, 70%, 52%)`;
}

/** Build a per-cell room-index lookup map from floorPlan.rooms. */
function buildRoomMap(fp: Puzzle['floorPlan']): Map<string, number> {
  const map = new Map<string, number>();
  fp.rooms.forEach((room, idx) => {
    for (const [cx, cy] of room.cells) {
      map.set(`${cx},${cy}`, idx);
    }
  });
  return map;
}

/**
 * Main render function — all layers.
 */
export function renderGrid(
  ctx: CanvasRenderingContext2D,
  puzzle: Puzzle,
  theme: Theme,
  placements: ReadonlyMap<string, SuspectPlacement>,
  victimCell: { x: number; y: number } | null,
  annotations?: CellAnnotations,
  onSpriteLoaded?: () => void,
): void {
  const fp = puzzle.floorPlan;
  const palette = theme.colorPalette;
  const { blockedRows, blockedCols } = getSpatialMask(Array.from(placements.values()));
  const roomMap = buildRoomMap(fp);
  const CS = CELL_SIZE;

  // ── 1. Room tint fills ───────────────────────────────────────────────────
  for (let y = 0; y < fp.height; y++) {
    for (let x = 0; x < fp.width; x++) {
      const roomIdx = roomMap.get(`${x},${y}`);
      if (roomIdx === undefined) continue;
      if (fp.tiles[y][x] === 'W') continue;
      ctx.fillStyle = ROOM_TINTS[roomIdx % ROOM_TINTS.length];
      ctx.fillRect(x * CS, y * CS, CS, CS);
    }
  }

  // ── 2. Tile draws ────────────────────────────────────────────────────────
  for (let y = 0; y < fp.height; y++) {
    for (let x = 0; x < fp.width; x++) {
      const tile = fp.tiles[y][x];
      const px = x * CS, py = y * CS;

      if (tile === 'W') {
        ctx.fillStyle = palette.wall;
        ctx.fillRect(px, py, CS, CS);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        const bH = Math.max(6, Math.floor(CS / 8));
        for (let row = 0; row < Math.ceil(CS / bH); row++) {
          const ry = py + row * bH;
          ctx.beginPath(); ctx.moveTo(px, ry); ctx.lineTo(px + CS, ry); ctx.stroke();
          const off = (row % 2) * (CS / 2);
          ctx.beginPath(); ctx.moveTo(px + off, ry); ctx.lineTo(px + off, Math.min(ry + bH, py + CS)); ctx.stroke();
        }
        continue;
      }

      // Floor base
      ctx.fillStyle = palette.floor;
      ctx.fillRect(px, py, CS, CS);
      ctx.strokeStyle = 'rgba(0,0,0,0.10)';
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 0.5, py + 0.5, CS - 1, CS - 1);

      if (SEAT_TILES.has(tile)) {
        const spriteKey = SEAT_TO_SPRITE[tile] ?? 'chair';
        const svg = SPRITE_SVGS[spriteKey] ?? '';
        const img = svg ? getSprite(svg, onSpriteLoaded) : null;
        if (img) {
          const pad = Math.floor(CS * 0.06);
          ctx.drawImage(img, px + pad, py + pad, CS - pad * 2, CS - pad * 2);
        } else {
          // Fallback seat silhouette
          ctx.fillStyle = palette.seat;
          const s = Math.floor(CS * 0.4);
          const ox = px + (CS - s) / 2, oy = py + (CS - s) / 2 + Math.floor(CS * 0.05);
          ctx.fillRect(ox, oy, s, s);
          ctx.fillRect(ox, py + Math.floor(CS * 0.08), s, Math.floor(CS * 0.1));
        }
        continue;
      }

      if (tile !== 'F') {
        const objectType = TILE_TO_OBJECT_TYPE[tile] ?? `object:${tile}`;
        const svg = (theme.spriteMap[objectType] ?? '') || (SPRITE_SVGS[objectType] ?? '');
        const img = svg ? getSprite(svg, onSpriteLoaded) : null;
        if (img) {
          ctx.drawImage(img, px, py, CS, CS);
        } else {
          const label = objectType.replace('object:', '').slice(0, 4).toUpperCase();
          ctx.fillStyle = 'rgba(110,75,28,0.88)';
          ctx.fillRect(px + 2, py + 2, CS - 4, CS - 4);
          ctx.strokeStyle = '#7a5c2e'; ctx.lineWidth = 2;
          ctx.strokeRect(px + 2, py + 2, CS - 4, CS - 4);
          ctx.fillStyle = '#ffe0a0';
          ctx.font = `${Math.max(6, Math.floor(CS * 0.18))}px ${PIXEL_FONT}`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(label, px + CS / 2, py + CS / 2);
          ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
        }
      }
    }
  }

  // ── 3. Room boundary borders ─────────────────────────────────────────────
  const dirs: [number, number][] = [[1,0],[-1,0],[0,1],[0,-1]];
  fp.rooms.forEach((room, idx) => {
    ctx.strokeStyle = ROOM_BORDER_COLORS[idx % ROOM_BORDER_COLORS.length];
    ctx.lineWidth = 2.5;
    for (const [cx, cy] of room.cells) {
      if (fp.tiles[cy]?.[cx] === 'W') continue;
      for (const [dx, dy] of dirs) {
        const nx = cx + dx, ny = cy + dy;
        const nRoomIdx = roomMap.get(`${nx},${ny}`);
        const nTile = fp.tiles[ny]?.[nx];
        if (nRoomIdx !== idx || nTile === 'W' || nTile === undefined) {
          ctx.beginPath();
          if      (dx ===  1) { ctx.moveTo((cx+1)*CS, cy*CS);    ctx.lineTo((cx+1)*CS, (cy+1)*CS); }
          else if (dx === -1) { ctx.moveTo(cx*CS,     cy*CS);    ctx.lineTo(cx*CS,     (cy+1)*CS); }
          else if (dy ===  1) { ctx.moveTo(cx*CS,     (cy+1)*CS); ctx.lineTo((cx+1)*CS, (cy+1)*CS); }
          else                { ctx.moveTo(cx*CS,     cy*CS);    ctx.lineTo((cx+1)*CS, cy*CS);    }
          ctx.stroke();
        }
      }
    }
  });

  // ── 4. Room name labels ──────────────────────────────────────────────────
  fp.rooms.forEach((room, idx) => {
    const cells = room.cells.filter(([cx, cy]) => fp.tiles[cy]?.[cx] !== 'W');
    if (!cells.length) return;
    const xs = cells.map(([cx]) => cx), ys = cells.map(([, cy]) => cy);
    const mx = (Math.min(...xs) + Math.max(...xs) + 1) / 2 * CS;
    const my = (Math.min(...ys) + Math.max(...ys) + 1) / 2 * CS;
    const fs = Math.max(5, Math.min(8, Math.floor(CS * 0.11)));
    ctx.font = `${fs}px ${PIXEL_FONT}`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    // Subtle shadow for legibility
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillText(room.name.toUpperCase(), mx + 1, my + 1);
    ctx.fillStyle = ROOM_BORDER_COLORS[idx % ROOM_BORDER_COLORS.length].replace('0.75', '0.9');
    ctx.fillText(room.name.toUpperCase(), mx, my);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  });

  // ── 5. Rule-of-One shadow ────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
  for (const row of blockedRows) ctx.fillRect(0, row * CS, fp.width * CS, CS);
  for (const col of blockedCols) ctx.fillRect(col * CS, 0, CS, fp.height * CS);

  // ── 6. Victim cell ───────────────────────────────────────────────────────
  if (victimCell) {
    const px = victimCell.x * CS, py = victimCell.y * CS;
    ctx.fillStyle = `${palette.accent}55`;
    ctx.fillRect(px, py, CS, CS);
    ctx.strokeStyle = palette.accent; ctx.lineWidth = 4;
    ctx.strokeRect(px + 2, py + 2, CS - 4, CS - 4);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5;
    ctx.strokeRect(px + 6, py + 6, CS - 12, CS - 12);
    const fs = Math.max(10, Math.floor(CS * 0.28));
    ctx.font = `bold ${fs}px ${PIXEL_FONT}`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('?', px + CS / 2, py + CS / 2);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  // ── 7. Suspect tokens ────────────────────────────────────────────────────
  for (const [suspectId, placement] of placements) {
    const suspect = puzzle.suspects.find(s => s.id === suspectId);
    if (!suspect) continue;
    const px = placement.x * CS, py = placement.y * CS;
    const margin = Math.floor(CS * 0.1);
    const tw = CS - margin * 2;

    ctx.fillStyle = suspectColor(suspectId);
    ctx.fillRect(px + margin, py + margin, tw, tw);
    ctx.strokeStyle = 'rgba(0,0,0,0.7)'; ctx.lineWidth = 2;
    ctx.strokeRect(px + margin + 1, py + margin + 1, tw - 2, tw - 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1;
    ctx.strokeRect(px + margin + 3, py + margin + 3, tw - 6, tw - 6);

    const fs = Math.min(16, Math.floor(tw * 0.5));
    ctx.fillStyle = '#ffffff';
    ctx.font = `${fs}px ${PIXEL_FONT}`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(suspect.name.charAt(0).toUpperCase(), px + CS / 2, py + CS / 2 + 1);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  // ── 8. Cell annotations ──────────────────────────────────────────────────
  if (annotations) {
    for (const [ax, ay] of annotations.x) {
      const px = ax * CS, py = ay * CS;
      ctx.fillStyle = 'rgba(192,57,43,0.18)';
      ctx.fillRect(px, py, CS, CS);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 3;
      const m = Math.floor(CS * 0.18);
      ctx.beginPath(); ctx.moveTo(px+m, py+m); ctx.lineTo(px+CS-m, py+CS-m); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(px+CS-m, py+m); ctx.lineTo(px+m, py+CS-m); ctx.stroke();
    }
    for (const [cellKey, candidateIds] of Object.entries(annotations.candidates)) {
      if (!candidateIds.length) continue;
      const [ax, ay] = cellKey.split(',').map(Number);
      const px = ax * CS, py = ay * CS;
      const label = candidateIds
        .map(id => puzzle.suspects.find(s => s.id === id)?.name.charAt(0).toUpperCase() ?? '?')
        .join('') + '?';
      const fs = Math.max(5, Math.floor(CS * 0.14));
      ctx.font = `${fs}px ${PIXEL_FONT}`;
      ctx.fillStyle = 'rgba(80,100,220,0.9)';
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText(label, px + CS / 2, py + CS - 2);
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    }
  }
}

export function getCanvasSize(puzzle: Puzzle): { width: number; height: number } {
  return {
    width:  puzzle.floorPlan.width  * CELL_SIZE,
    height: puzzle.floorPlan.height * CELL_SIZE,
  };
}
