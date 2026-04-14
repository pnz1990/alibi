/**
 * The Coffee Shop theme — a cozy urban café with espresso machines,
 * plants, and a mysterious barista.
 *
 * Floor plans: defined in floor-plans.ts (hand-authored, do not modify here).
 * This module provides narrative content: names, clue templates, palette, sprites.
 *
 * Registration: src/themes/index.ts imports this module and calls registerTheme().
 */

import type { Theme, ClueTemplates } from './index';
import { FLOOR_PLANS } from './floor-plans';

// ─────────────────────────────────────────────
// Ordinal helper (1 → "1st", 2 → "2nd", etc.)
// ─────────────────────────────────────────────
function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

// ─────────────────────────────────────────────
// Clue templates — café-flavored natural language
// ─────────────────────────────────────────────
const clueTemplates: ClueTemplates = {
  inRoom:             (s, r) => `${s} was in the ${r}.`,
  notInRoom:          (s, r) => `${s} was not in the ${r}.`,
  inSameRoom:         (s, o) => `${s} was in the same area as ${o}.`,
  inDifferentRoom:    (s, o) => `${s} and ${o} were in different parts of the café.`,
  inColumn:           (s, c) => `${s} was in the ${ordinal(c)} column.`,
  inRow:              (s, r) => `${s} was in the ${ordinal(r)} row.`,
  besideSuspect:      (s, o) => `${s} was standing next to ${o}.`,
  notBesideSuspect:   (s, o) => `${s} was not beside ${o}.`,
  besideObject:       (s, obj) => `${s} was beside ${obj}.`,
  notBesideObject:    (s, obj) => `${s} was not beside ${obj}.`,
  onSeatTile:         (s, t) =>
    t === 'chair' ? `${s} was sitting in a chair.`
    : t === 'sofa' ? `${s} was on the sofa.`
    : `${s} was on the ${t}.`,
  notOnSeatTile:      (s) => `${s} was not sitting down.`,
  northOf:            (s, o) => `${s} was north of ${o}.`,
  southOf:            (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
  exactlyNRowsSouth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
};

// ─────────────────────────────────────────────
// Coffee Shop Theme
// ─────────────────────────────────────────────
export const COFFEE_SHOP_THEME: Theme = {
  id: 'coffee-shop',
  name: 'The Coffee Shop',

  floorPlans: {
    easy:   FLOOR_PLANS['coffee-shop'].easy,
    medium: FLOOR_PLANS['coffee-shop'].medium,
    hard:   FLOOR_PLANS['coffee-shop'].hard,
  },

  suspectNames: [
    'Alice', 'Ben', 'Chloe', 'Diego', 'Elena',
    'Finlay', 'Grace', 'Hassan', 'Iris', 'Jake',
    'Lena', 'Marco',
  ],

  victimNames: [
    'Victor', 'Violet', 'Vera', 'Valencia', 'Vance', 'Vivian',
  ],

  clueTemplates,

  narrativeTemplates: {
    intro: [
      'A body has been found at the Copper Bean Café. The morning rush never arrived — instead, the regulars found yellow tape across the door. You pour yourself an espresso and get to work.',
      'The Copper Bean Café is closed for a very different reason today. Someone is dead, and the witnesses are all still clutching their lattes. You take out your notebook.',
      'It was supposed to be a quiet Tuesday at the Copper Bean. Then the screaming started. Now it\'s your problem. You order a black coffee and begin.',
    ],
    victimFound: [
      'The victim was discovered near table four, cold cup of coffee still in hand.',
      'Staff found the victim behind the counter during the morning prep.',
      'A regular spotted the victim slumped in the corner booth before opening.',
    ],
    guiltyText: [
      '{{killerName}} — served with a side of motive.',
      '{{killerName}} — the evidence is as clear as an Americano.',
      '{{killerName}} — there\'s no running from the detective on this one.',
    ],
  },

  colorPalette: {
    floor:      '#f5e6d3',
    wall:       '#4a3728',
    seat:       '#8b6914',
    accent:     '#c0392b',
    background: '#1a1a2e',
    text:       '#ffffff',
  },

  // SVG sprite values — empty string uses renderer fallback (labeled rect).
  // Real SVG assets are a Stage 6 quality enhancement.
  spriteMap: {
    'object:bar-counter':   '',
    'object:plant':         '',
    'object:cash-register': '',
    'object:table':         '',
  },
};


