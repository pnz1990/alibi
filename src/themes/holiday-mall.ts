/**
 * The Holiday Mall theme — a festive Christmas shopping center with electronics,
 * a toy store, Santa's village, and more tinsel than sense.
 *
 * Floor plans: defined in floor-plans.ts (hand-authored, do not modify here).
 * Registration: src/themes/index.ts imports this module and calls registerTheme().
 */

import type { Theme, ClueTemplates } from './index';
import { pickVariant } from './text-variants';
import { FLOOR_PLANS } from './floor-plans';

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

const clueTemplates: ClueTemplates = {
  inRoom: (s, r) => pickVariant([
    `${s} was in the ${r}.`,
    `${s} was spotted in the ${r}.`,
    `Security cameras placed ${s} in the ${r}.`,
    `${s} spent time shopping in the ${r}.`,
  ], s + r),

  notInRoom: (s, r) => pickVariant([
    `${s} was not in the ${r}.`,
    `${s} never entered the ${r}.`,
    `Security confirmed ${s} didn't visit the ${r}.`,
    `${s} was nowhere near the ${r}.`,
  ], s + r),

  inSameRoom: (s, o) => pickVariant([
    `${s} was shopping in the same area as ${o}.`,
    `${s} and ${o} were seen near each other.`,
    `A store clerk spotted ${s} alongside ${o}.`,
    `${s} was browsing beside ${o}.`,
  ], s + o),

  inDifferentRoom: (s, o) => pickVariant([
    `${s} and ${o} were in different parts of the mall.`,
    `${s} was nowhere near ${o}'s section.`,
    `${s} and ${o} didn't cross paths in the same store.`,
    `${o} confirmed they weren't near ${s}.`,
  ], s + o),

  inColumn: (s, c) => pickVariant([
    `${s} was in the ${ordinal(c)} column.`,
    `${s} stood in column ${c}.`,
    `${s}'s position was the ${ordinal(c)} column.`,
  ], s + c),

  inRow: (s, r) => pickVariant([
    `${s} was in the ${ordinal(r)} row.`,
    `${s} was along row ${r}.`,
    `${s}'s spot was on the ${ordinal(r)} row.`,
  ], s + r),

  besideSuspect: (s, o) => pickVariant([
    `${s} was standing right next to ${o}.`,
    `${s} was just a step away from ${o}.`,
    `${s} and ${o} were side by side.`,
    `A shopper saw ${s} right beside ${o}.`,
  ], s + o),

  notBesideSuspect: (s, o) => pickVariant([
    `${s} was not beside ${o}.`,
    `${s} and ${o} kept their distance.`,
    `${s} was not close to ${o}.`,
  ], s + o),

  besideObject: (s, obj) => pickVariant([
    `${s} was beside ${obj}.`,
    `${s} was seen next to ${obj}.`,
    `${s} was standing near ${obj}.`,
  ], s + obj),

  notBesideObject: (s, obj) => pickVariant([
    `${s} was not near ${obj}.`,
    `${s} was not beside ${obj}.`,
    `${s} stayed away from ${obj}.`,
  ], s + obj),

  onSeatTile: (s, t) => pickVariant([
    `${s} was sitting${t === 'chair' ? ' in a chair' : ' on a ' + t}.`,
    `${s} had taken a seat in the mall.`,
    `${s} was resting on a bench.`,
  ], s),

  notOnSeatTile: (s) => pickVariant([
    `${s} was not sitting down.`,
    `${s} was on their feet.`,
    `${s} kept moving, never sat down.`,
  ], s),

  northOf: (s, o) => pickVariant([
    `${s} was north of ${o}.`,
    `${s} was in the front section of the mall relative to ${o}.`,
    `${s} was closer to the main entrance than ${o}.`,
  ], s + o),

  southOf: (s, o) => pickVariant([
    `${s} was south of ${o}.`,
    `${s} was deeper in the mall than ${o}.`,
    `${s} was further from the entrance than ${o}.`,
  ], s + o),

  exactlyNRowsNorth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
    `${s} was ${n} section${n > 1 ? 's' : ''} ahead of ${o}.`,
  ], s + o + n),

  exactlyNRowsSouth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
    `${s} was ${n} section${n > 1 ? 's' : ''} behind ${o}.`,
  ], s + o + n),
};

export const HOLIDAY_MALL_THEME: Theme = {
  id: 'holiday-mall',
  name: 'The Holiday Mall',

  floorPlans: {
    easy:   FLOOR_PLANS['holiday-mall'].easy,
    medium: FLOOR_PLANS['holiday-mall'].medium,
    hard:   FLOOR_PLANS['holiday-mall'].hard,
  },

  suspectNames: [
    'Ashley', 'Brett', 'Cameron', 'Denise', 'Eli',
    'Felicia', 'Grant', 'Holly', 'Irving', 'Jade',
    'Kyle', 'Leighton',
  ],

  victimNames: [
    'Victor', 'Vivian', 'Vera', 'Valencia', 'Vince', 'Velma',
  ],

  clueTemplates,

  narrativeTemplates: {
    intro: [
      'The North Pole Mall was supposed to close early for the holiday rush. Instead, it\'s closed indefinitely. The security cameras caught everything except whoever did this. You wade through the tinsel.',
      'Christmas shopping season. The most wonderful time of year — unless you\'re the one who ends up under the tree with a chalk outline. You badge your way in through the entrance.',
      'The last thing anyone expects on December 23rd is a murder at the mall. The second-to-last thing is the detective they send. Here you are anyway.',
    ],
    victimFound: [
      'The victim was discovered near the gift-wrapping station before the mall opened.',
      'Security found the victim in the walkway between the stalls.',
      'A store manager found the victim near the Christmas tree display.',
    ],
    guiltyText: [
      '{{killerName}} — some gifts aren\'t worth giving.',
      '{{killerName}} — unwrapped at last.',
      '{{killerName}} — the season\'s greetings end here.',
    ],
  },

  colorPalette: {
    floor:      '#e8e0d0',
    wall:       '#2c3e50',
    seat:       '#7f8c8d',
    accent:     '#c0392b',
    background: '#0d1117',
    text:       '#ffffff',
  },

  spriteMap: {
    'object:stall':      '',
    'object:shelf':      '',
    'object:cash-register': '',
    'object:tree':       '',
    'object:teddy-bear': '',
  },
};
