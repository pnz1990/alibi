/**
 * The Holiday Mall theme — a festive Christmas shopping center with electronics,
 * a toy store, Santa's village, and more tinsel than sense.
 *
 * Floor plans: defined in floor-plans.ts (hand-authored, do not modify here).
 * Registration: src/themes/index.ts imports this module and calls registerTheme().
 */

import type { Theme, ClueTemplates } from './index';
import { FLOOR_PLANS } from './floor-plans';

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

const clueTemplates: ClueTemplates = {
  inRoom:             (s, r) => `${s} was in the ${r}.`,
  notInRoom:          (s, r) => `${s} was not in the ${r}.`,
  inSameRoom:         (s, o) => `${s} was shopping in the same area as ${o}.`,
  inDifferentRoom:    (s, o) => `${s} and ${o} were in different parts of the mall.`,
  inColumn:           (s, c) => `${s} was in the ${ordinal(c)} column.`,
  inRow:              (s, r) => `${s} was in the ${ordinal(r)} row.`,
  besideSuspect:      (s, o) => `${s} was standing right next to ${o}.`,
  notBesideSuspect:   (s, o) => `${s} was not beside ${o}.`,
  besideObject:       (s, obj) => `${s} was beside ${obj}.`,
  notBesideObject:    (s, obj) => `${s} was not near ${obj}.`,
  onSeatTile:         (s, t) => `${s} was sitting${t === 'chair' ? '' : ' on a ' + t}.`,
  notOnSeatTile:      (s) => `${s} was not sitting down.`,
  northOf:            (s, o) => `${s} was north of ${o}.`,
  southOf:            (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
  exactlyNRowsSouth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
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
    'Kyle', 'Melody',
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
