/**
 * Clue template text variant selection.
 *
 * Each clue type in each theme provides an array of natural-language phrasings.
 * pickVariant() selects one deterministically based on a hash of the input key
 * (typically suspect name + other name/room), so the same suspect always gets
 * the same phrasing style within a puzzle — but variety exists across suspects.
 *
 * No PRNG access needed; no circular imports.
 */

/**
 * Picks one string from an array of variants using a deterministic hash of `key`.
 * Same key always maps to the same variant (stable across runs).
 */
export function pickVariant(variants: string[], key: string): string {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = Math.imul(31, h) + key.charCodeAt(i) | 0;
  }
  return variants[Math.abs(h) % variants.length];
}
