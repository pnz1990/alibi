/**
 * The Bookstore theme — a quiet local bookshop with shelves of mysteries,
 * a cozy reading table, and a suspicious checkout counter.
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
  inRoom:             (s, r) => `${s} was browsing in the ${r}.`,
  notInRoom:          (s, r) => `${s} was not in the ${r}.`,
  inSameRoom:         (s, o) => `${s} was in the same section as ${o}.`,
  inDifferentRoom:    (s, o) => `${s} and ${o} were in different sections.`,
  inColumn:           (s, c) => `${s} was in the ${ordinal(c)} column.`,
  inRow:              (s, r) => `${s} was in the ${ordinal(r)} row.`,
  besideSuspect:      (s, o) => `${s} was standing right next to ${o}.`,
  notBesideSuspect:   (s, o) => `${s} was not beside ${o}.`,
  besideObject:       (s, obj) => `${s} was standing near ${obj}.`,
  notBesideObject:    (s, obj) => `${s} was not near ${obj}.`,
  onSeatTile:         (s, t) =>
    t === 'chair' ? `${s} was sitting in a reading chair.`
    : `${s} was sitting on the ${t}.`,
  notOnSeatTile:      (s) => `${s} was not sitting down.`,
  northOf:            (s, o) => `${s} was north of ${o}.`,
  southOf:            (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
  exactlyNRowsSouth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
};

export const BOOKSTORE_THEME: Theme = {
  id: 'bookstore',
  name: 'The Bookstore',

  floorPlans: {
    easy:   FLOOR_PLANS['bookstore'].easy,
    medium: FLOOR_PLANS['bookstore'].medium,
    hard:   FLOOR_PLANS['bookstore'].hard,
  },

  suspectNames: [
    'Alex', 'Bridget', 'Colin', 'Diana', 'Edmund',
    'Fiona', 'George', 'Hannah', 'Ivan', 'Julia',
    'Kevin', 'Lydia',
  ],

  victimNames: [
    'Vincent', 'Valerie', 'Violet', 'Victor', 'Vera', 'Valencia',
  ],

  clueTemplates,

  narrativeTemplates: {
    intro: [
      'The First Chapter Bookshop opened this morning to find more than just dust between the shelves. Someone is dead, and the regulars are still clutching their Earl Grey. You step over the crime scene tape and start asking questions.',
      'A reader never returns a book. This one never returned at all. The First Chapter Bookshop is closed indefinitely — and you\'re the reason it might reopen. Notebook out.',
      'Mondays at the bookshop are quiet. This Monday is the quietest it\'s ever been. The body was found in the stacks before the first customer arrived. You\'re on the case.',
    ],
    victimFound: [
      'The victim was discovered slumped against the shelf in the early morning.',
      'A shop assistant found the victim face-down near the reading table.',
      'The victim was found between the shelves before opening time.',
    ],
    guiltyText: [
      '{{killerName}} — the ending nobody saw coming.',
      '{{killerName}} — the plot twist is on the last page.',
      '{{killerName}} — even mysteries have their answers.',
    ],
  },

  colorPalette: {
    floor:      '#f0ead6',
    wall:       '#3d2b1f',
    seat:       '#7a5c3a',
    accent:     '#8b1a1a',
    background: '#1a1510',
    text:       '#ffffff',
  },

  spriteMap: {
    'object:shelf':         '',
    'object:table':         '',
    'object:cash-register': '',
  },
};
