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

function drawFallbackObject(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  label: string,
): void {
  ctx.fillStyle = '#c8a96e';
  ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
  ctx.fillStyle = '#ffffff';
  ctx.font = '8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label.slice(0, 4), px + CELL_SIZE / 2, py + CELL_SIZE / 2);
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
        ctx.fillStyle = palette.wall;
        ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
        continue;
      }

      if (SEAT_TILES.has(tile)) {
        ctx.fillStyle = palette.seat;
        ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
        // Seat circle indicator
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, CELL_SIZE * 0.3, 0, Math.PI * 2);
        ctx.fill();
        // Grid line
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(px, py, CELL_SIZE, CELL_SIZE);
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

      // Floor tile
      ctx.fillStyle = palette.floor;
      ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(px, py, CELL_SIZE, CELL_SIZE);
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

  // 3. Draw victim cell highlight
  if (victimCell) {
    const px = victimCell.x * CELL_SIZE;
    const py = victimCell.y * CELL_SIZE;
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(px + 2, py + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    ctx.fillStyle = `${palette.accent}33`;
    ctx.fillRect(px + 2, py + 2, CELL_SIZE - 4, CELL_SIZE - 4);
  }

  // 4. Draw placed suspects
  for (const [suspectId, placement] of placements) {
    const suspect = puzzle.suspects.find(s => s.id === suspectId);
    if (!suspect) continue;
    const px = placement.x * CELL_SIZE;
    const py = placement.y * CELL_SIZE;

    ctx.fillStyle = suspectColor(suspectId);
    ctx.beginPath();
    ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, CELL_SIZE * 0.38, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.floor(CELL_SIZE * 0.4)}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(suspect.name.charAt(0).toUpperCase(), px + CELL_SIZE / 2, py + CELL_SIZE / 2);
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
