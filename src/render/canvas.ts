/**
 * Canvas grid renderer for ALIBI.
 *
 * Renders the floor plan grid onto a 2D canvas context:
 *  - Room zones with floor color
 *  - Walls with wall color
 *  - Object tiles: sprite image or fallback labeled rect
 *  - Seat tiles with seat color
 *  - Placed suspects as colored circles with initial
 *  - Rule-of-One shadow overlays on blocked rows/cols
 *  - Victim cell highlight with accent border
 *
 * Pure side effects: reads Puzzle + state, writes to canvas. No engine logic.
 */

import type { Puzzle } from '../engine/generator';
import type { SuspectPlacement } from '../engine/logic';
import type { Theme } from '../themes/index';
import { getSpatialMask } from '../engine/logic';
import { getSpriteForObject } from './sprites';

/** Cell size in pixels. */
export const CELL_SIZE = 64;

/** Cached sprite images keyed by SVG string. */
const spriteCache = new Map<string, HTMLImageElement>();

function getSprite(svgString: string): HTMLImageElement | null {
  if (!svgString) return null;
  if (spriteCache.has(svgString)) return spriteCache.get(svgString)!;
  // Kick off async load; return null for this frame (will appear on next render)
  const img = new Image();
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  img.onload = () => {
    spriteCache.set(svgString, img);
    URL.revokeObjectURL(url);
  };
  img.src = url;
  return null;
}

const PIXEL_FONT = "'Press Start 2P', monospace";

function drawFallbackObject(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  label: string,
): void {
  // Pixel-art object placeholder: warm beige background with dark 2px border
  ctx.fillStyle = '#c8a96e';
  ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
  ctx.strokeStyle = '#7a5c2e';
  ctx.lineWidth = 2;
  ctx.strokeRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
  ctx.fillStyle = '#3a2010';
  ctx.font = `6px ${PIXEL_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label.slice(0, 4).toUpperCase(), px + CELL_SIZE / 2, py + CELL_SIZE / 2);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

/** Derives a deterministic HSL color from a suspect ID string. */
function suspectColor(suspectId: string): string {
  let hash = 0;
  for (let i = 0; i < suspectId.length; i++) {
    hash = (hash * 31 + suspectId.charCodeAt(i)) & 0xffff;
  }
  return `hsl(${hash % 360}, 65%, 55%)`;
}

/** Maps tile short-codes to object type strings for spriteMap lookup. */
const TILE_TO_OBJECT_TYPE: Readonly<Record<string, string>> = {
  pL: 'object:plant',
  tB: 'object:table',
  sH: 'object:shelf',
  cR: 'object:cash-register',
  bB: 'object:bar-counter',
  tV: 'object:tv',
  cT: 'object:counter',
  dK: 'object:desk',
  pC: 'object:photocopier',
  fB: 'object:flower-bed',
  hB: 'object:hospital-bed',
  mC: 'object:medicine-cabinet',
  tR: 'object:tree',
  tD: 'object:teddy-bear',
  cH: 'object:carousel-horse',
  tM: 'object:treadmill',
  wT: 'object:weight-rack',
  sT: 'object:stall',
  jZ: 'object:jacuzzi-tile',
};

const SEAT_TILES = new Set(['C', 'S', 'B']);

/**
 * Renders the complete floor plan grid onto the canvas context.
 *
 * @param ctx          Canvas 2D rendering context
 * @param puzzle       The active puzzle (floor plan, suspects)
 * @param theme        The active theme (palette, spriteMap)
 * @param placements   Current suspect placements (suspectId → {x,y})
 * @param victimCell   Victim cell position, or null if not yet determined
 */
export function renderGrid(
  ctx: CanvasRenderingContext2D,
  puzzle: Puzzle,
  theme: Theme,
  placements: ReadonlyMap<string, SuspectPlacement>,
  victimCell: { x: number; y: number } | null,
): void {
  const fp = puzzle.floorPlan;
  const palette = theme.colorPalette;
  const { blockedRows, blockedCols } = getSpatialMask(Array.from(placements.values()));

  // 1. Draw all cells
  for (let y = 0; y < fp.height; y++) {
    for (let x = 0; x < fp.width; x++) {
      const tile = fp.tiles[y][x];
      const px = x * CELL_SIZE;
      const py = y * CELL_SIZE;

      if (tile === 'W') {
        // Pixel-art wall: solid fill + brick pattern
        ctx.fillStyle = palette.wall;
        ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
        // Brick lines: horizontal rows every 8px, vertical offset alternates
        ctx.strokeStyle = 'rgba(255,255,255,0.07)';
        ctx.lineWidth = 1;
        const brickH = 8;
        for (let row = 0; row < CELL_SIZE / brickH; row++) {
          const ry = py + row * brickH;
          ctx.beginPath(); ctx.moveTo(px, ry); ctx.lineTo(px + CELL_SIZE, ry); ctx.stroke();
          const offset = (row % 2) * (CELL_SIZE / 2);
          ctx.beginPath(); ctx.moveTo(px + offset, ry); ctx.lineTo(px + offset, ry + brickH); ctx.stroke();
        }
        continue;
      }

      if (SEAT_TILES.has(tile)) {
        // Pixel-art seat: fill with seat color + simple seat shape
        ctx.fillStyle = palette.seat;
        ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
        // 1px dark border
        ctx.strokeStyle = 'rgba(0,0,0,0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 0.5, py + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
        // Chair silhouette: a small centered square (seat) + backrest line
        const s = Math.floor(CELL_SIZE * 0.35);
        const cx = px + (CELL_SIZE - s) / 2;
        const cy = py + (CELL_SIZE - s) / 2 + 4;
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(cx, cy, s, s);        // seat cushion
        ctx.fillRect(cx, py + 6, s, 4);   // backrest
        continue;
      }

      if (tile !== 'F') {
        // Object tile
        const objectType = TILE_TO_OBJECT_TYPE[tile] ?? `object:${tile}`;
        const svgString = getSpriteForObject(objectType, theme.spriteMap);
        if (svgString) {
          const img = getSprite(svgString);
          if (img) {
            ctx.drawImage(img, px, py, CELL_SIZE, CELL_SIZE);
          } else {
            drawFallbackObject(ctx, px, py, objectType.replace('object:', ''));
          }
        } else {
          drawFallbackObject(ctx, px, py, objectType.replace('object:', ''));
        }
        continue;
      }

      // Floor tile — pixel-art crisp 1px border
      ctx.fillStyle = palette.floor;
      ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
      ctx.strokeStyle = 'rgba(0,0,0,0.18)';
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 0.5, py + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
    }
  }

  // 2. Draw Rule-of-One shadow overlays
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  for (const row of blockedRows) {
    ctx.fillRect(0, row * CELL_SIZE, fp.width * CELL_SIZE, CELL_SIZE);
  }
  for (const col of blockedCols) {
    ctx.fillRect(col * CELL_SIZE, 0, CELL_SIZE, fp.height * CELL_SIZE);
  }

  // 3. Draw victim cell highlight — pixel-art thick border
  if (victimCell) {
    const px = victimCell.x * CELL_SIZE;
    const py = victimCell.y * CELL_SIZE;
    // Outer glow fill
    ctx.fillStyle = `${palette.accent}44`;
    ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
    // Chunky 4px pixel border
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 4;
    ctx.strokeRect(px + 2, py + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    // Inner bright line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 5, py + 5, CELL_SIZE - 10, CELL_SIZE - 10);
  }

  // 4. Draw placed suspects — pixel-art square tokens
  for (const [suspectId, placement] of placements) {
    const suspect = puzzle.suspects.find(s => s.id === suspectId);
    if (!suspect) continue;
    const px = placement.x * CELL_SIZE;
    const py = placement.y * CELL_SIZE;
    const margin = 6;
    const tw = CELL_SIZE - margin * 2;

    // Token background square
    ctx.fillStyle = suspectColor(suspectId);
    ctx.fillRect(px + margin, py + margin, tw, tw);
    // 2px dark border for pixel crispness
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.lineWidth = 2;
    ctx.strokeRect(px + margin + 1, py + margin + 1, tw - 2, tw - 2);
    // Inner highlight (top-left pixel)
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(px + margin + 2, py + margin + 2, tw - 4, tw - 4);

    // Initial letter in pixel font
    const fontSize = Math.min(14, Math.floor(tw * 0.45));
    ctx.fillStyle = '#ffffff';
    ctx.font = `${fontSize}px ${PIXEL_FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(suspect.name.charAt(0).toUpperCase(), px + CELL_SIZE / 2, py + CELL_SIZE / 2 + 1);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }
}

/**
 * Returns the pixel canvas dimensions needed to render the floor plan.
 */
export function getCanvasSize(puzzle: Puzzle): { width: number; height: number } {
  return {
    width:  puzzle.floorPlan.width  * CELL_SIZE,
    height: puzzle.floorPlan.height * CELL_SIZE,
  };
}
