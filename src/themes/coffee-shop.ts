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
import { pickVariant } from './text-variants';
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
// Each type offers 3–4 phrasing variants; pickVariant() selects
// deterministically based on the suspect name so variety is consistent.
// ─────────────────────────────────────────────
const clueTemplates: ClueTemplates = {
  inRoom: (s, r) => pickVariant([
    `${s} was in the ${r}.`,
    `${s} was spotted in the ${r}.`,
    `Witnesses placed ${s} in the ${r}.`,
    `According to staff, ${s} was in the ${r}.`,
  ], s + r),

  notInRoom: (s, r) => pickVariant([
    `${s} was not in the ${r}.`,
    `${s} was nowhere near the ${r}.`,
    `Staff confirmed ${s} was not in the ${r}.`,
    `${s} never entered the ${r}.`,
  ], s + r),

  inSameRoom: (s, o) => pickVariant([
    `${s} was in the same area as ${o}.`,
    `${s} and ${o} were seen together.`,
    `A regular noticed ${s} near ${o}.`,
    `${s} shared a space with ${o}.`,
  ], s + o),

  inDifferentRoom: (s, o) => pickVariant([
    `${s} and ${o} were in different parts of the café.`,
    `${s} was nowhere near ${o}.`,
    `${s} and ${o} were not in the same area.`,
    `${o} confirmed they weren't near ${s}.`,
  ], s + o),

  inColumn: (s, c) => pickVariant([
    `${s} was in the ${ordinal(c)} column.`,
    `${s} stood in column ${c}.`,
    `${s}'s position was the ${ordinal(c)} column from the left.`,
  ], s + c),

  inRow: (s, r) => pickVariant([
    `${s} was in the ${ordinal(r)} row.`,
    `${s} sat in row ${r}.`,
    `${s}'s seat was on the ${ordinal(r)} row.`,
  ], s + r),

  besideSuspect: (s, o) => pickVariant([
    `${s} was standing next to ${o}.`,
    `${s} was right beside ${o}.`,
    `${s} and ${o} were adjacent.`,
    `A barista saw ${s} just one step from ${o}.`,
  ], s + o),

  notBesideSuspect: (s, o) => pickVariant([
    `${s} was not beside ${o}.`,
    `${s} and ${o} kept their distance.`,
    `${s} was not close to ${o}.`,
    `${o} said ${s} was not nearby.`,
  ], s + o),

  besideObject: (s, obj) => pickVariant([
    `${s} was beside ${obj}.`,
    `${s} was right next to ${obj}.`,
    `${s} was seen just by ${obj}.`,
    `The security feed shows ${s} near ${obj}.`,
  ], s + obj),

  notBesideObject: (s, obj) => pickVariant([
    `${s} was not beside ${obj}.`,
    `${s} was nowhere near ${obj}.`,
    `${s} was far from ${obj}.`,
  ], s + obj),

  onSeatTile: (s, t) =>
    t === 'chair'
      ? pickVariant([
          `${s} was sitting in a chair.`,
          `${s} had taken a seat.`,
          `${s} was seated at the time.`,
        ], s)
      : t === 'sofa'
      ? pickVariant([
          `${s} was on the sofa.`,
          `${s} had settled onto the sofa.`,
          `${s} was lounging on the sofa.`,
        ], s)
      : `${s} was on the ${t}.`,

  notOnSeatTile: (s) => pickVariant([
    `${s} was not sitting down.`,
    `${s} was on their feet.`,
    `${s} remained standing.`,
    `${s} never took a seat.`,
  ], s),

  northOf: (s, o) => pickVariant([
    `${s} was north of ${o}.`,
    `${s} was positioned above ${o} on the floor plan.`,
    `${s} was closer to the entrance than ${o}.`,
  ], s + o),

  southOf: (s, o) => pickVariant([
    `${s} was south of ${o}.`,
    `${s} was further back than ${o}.`,
    `${s} was positioned below ${o} on the floor plan.`,
  ], s + o),

  exactlyNRowsNorth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
    `${s} sat ${n} row${n > 1 ? 's' : ''} ahead of ${o}.`,
    `There were exactly ${n} row${n > 1 ? 's' : ''} between ${s} and ${o}, with ${s} to the north.`,
  ], s + o + n),

  exactlyNRowsSouth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
    `${s} sat ${n} row${n > 1 ? 's' : ''} behind ${o}.`,
    `There were exactly ${n} row${n > 1 ? 's' : ''} between ${s} and ${o}, with ${s} to the south.`,
  ], s + o + n),
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
    'Kai', 'Lena',
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

  spriteMap: {
    'object:bar-counter':   '',
    'object:plant':         '',
    'object:cash-register': '',
    'object:table':         '',
  },
};
