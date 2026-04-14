/**
 * Portrait card renderer.
 * Draws a colored rectangle with the suspect's initial letter centered in it.
 * SVG portrait assets are a Stage 6 enhancement.
 */

/**
 * Derives a deterministic background color from a name string.
 * Returns a CSS hsl() color.
 */
function nameToColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffff;
  }
  const hue = hash % 360;
  return `hsl(${hue}, 55%, 45%)`;
}

/**
 * Draws a portrait card on canvas: colored background + initial letter.
 *
 * @param ctx   Canvas 2D context
 * @param x     Top-left x position
 * @param y     Top-left y position
 * @param size  Width and height of the card square
 * @param name  Suspect name (first letter drawn as initial)
 */
export function drawPortrait(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  name: string,
): void {
  const color = nameToColor(name);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);

  // Initial letter
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${Math.floor(size * 0.55)}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.charAt(0).toUpperCase(), x + size / 2, y + size / 2);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}
