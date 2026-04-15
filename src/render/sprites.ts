/**
 * Sprite loader for ALIBI.
 * Sprites are plain SVG strings passed in from the theme's spriteMap.
 * No runtime fetches. No file I/O. Pure functions.
 */

/**
 * Returns an HTMLImageElement loaded from an SVG string.
 * Resolves when the image has loaded; rejects on error.
 */
export function loadSprite(svgString: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Sprite failed to load'));
    };
    img.src = url;
  });
}

/**
 * Returns the SVG string for a given object tile type,
 * or empty string if no sprite is registered.
 */
export function getSpriteForObject(
  objectType: string,
  spriteMap: Record<string, string>,
): string {
  return spriteMap[objectType] ?? '';
}
