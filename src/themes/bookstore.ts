/**
 * The Bookstore theme — a quiet local bookshop with shelves of mysteries,
 * a cozy reading table, and a suspicious checkout counter.
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
    `${s} was browsing in the ${r}.`,
    `${s} was found in the ${r} section.`,
    `The clerk placed ${s} in the ${r}.`,
    `${s} spent time in the ${r}.`,
  ], s + r),

  notInRoom: (s, r) => pickVariant([
    `${s} was not in the ${r}.`,
    `${s} never set foot in the ${r} section.`,
    `The clerk confirmed ${s} wasn't in the ${r}.`,
    `${s} was nowhere near the ${r}.`,
  ], s + r),

  inSameRoom: (s, o) => pickVariant([
    `${s} was in the same section as ${o}.`,
    `A customer spotted ${s} browsing alongside ${o}.`,
    `${s} and ${o} were seen in the same aisle.`,
  ], s + o),

  inDifferentRoom: (s, o) => pickVariant([
    `${s} and ${o} were in different sections.`,
    `${s} was nowhere near ${o}'s section.`,
    `The clerk noted ${s} and ${o} were apart.`,
    `${s} and ${o} didn't share a section.`,
  ], s + o),

  inColumn: (s, c) => pickVariant([
    `${s} was in the ${ordinal(c)} column.`,
    `${s} stood in column ${c}.`,
    `${s}'s position was the ${ordinal(c)} column from the left.`,
  ], s + c),

  inRow: (s, r) => pickVariant([
    `${s} was in the ${ordinal(r)} row.`,
    `${s} was browsing along row ${r}.`,
    `${s}'s position was on the ${ordinal(r)} row.`,
  ], s + r),

  besideSuspect: (s, o) => pickVariant([
    `${s} was standing right next to ${o}.`,
    `${s} was browsing just beside ${o}.`,
    `${s} and ${o} were in adjacent spots.`,
    `A witness saw ${s} shoulder-to-shoulder with ${o}.`,
  ], s + o),

  notBesideSuspect: (s, o) => pickVariant([
    `${s} was not beside ${o}.`,
    `${s} and ${o} were not in the same aisle.`,
    `${s} kept well away from ${o}.`,
  ], s + o),

  besideObject: (s, obj) => pickVariant([
    `${s} was standing near ${obj}.`,
    `${s} was right beside ${obj}.`,
    `${s} was seen next to ${obj}.`,
  ], s + obj),

  notBesideObject: (s, obj) => pickVariant([
    `${s} was not near ${obj}.`,
    `${s} was not beside ${obj}.`,
    `${s} kept away from ${obj}.`,
  ], s + obj),

  onSeatTile: (s, t) =>
    t === 'chair'
      ? pickVariant([
          `${s} was sitting in a reading chair.`,
          `${s} had settled into one of the chairs.`,
          `${s} was seated at the time.`,
        ], s)
      : `${s} was sitting on the ${t}.`,

  notOnSeatTile: (s) => pickVariant([
    `${s} was not sitting down.`,
    `${s} was browsing on their feet.`,
    `${s} remained standing.`,
  ], s),

  northOf: (s, o) => pickVariant([
    `${s} was north of ${o}.`,
    `${s} was in the front section, closer to the door than ${o}.`,
    `${s} was ahead of ${o} in the store.`,
  ], s + o),

  southOf: (s, o) => pickVariant([
    `${s} was south of ${o}.`,
    `${s} was in the back of the store, behind ${o}.`,
    `${s} was further from the entrance than ${o}.`,
  ], s + o),

  exactlyNRowsNorth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
    `${s} stood ${n} row${n > 1 ? 's' : ''} ahead of ${o}.`,
  ], s + o + n),

  exactlyNRowsSouth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
    `${s} stood ${n} row${n > 1 ? 's' : ''} behind ${o}.`,
  ], s + o + n),
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
