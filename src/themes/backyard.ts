/**
 * The Backyard theme — a suburban home setting with jacuzzi, deck,
 * and that one suspicious neighbor who's always outside.
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
  inSameRoom:         (s, o) => `${s} was in the same area as ${o}.`,
  inDifferentRoom:    (s, o) => `${s} and ${o} were in different parts of the yard.`,
  inColumn:           (s, c) => `${s} was in the ${ordinal(c)} column.`,
  inRow:              (s, r) => `${s} was in the ${ordinal(r)} row.`,
  besideSuspect:      (s, o) => `${s} was right next to ${o}.`,
  notBesideSuspect:   (s, o) => `${s} was not beside ${o}.`,
  besideObject:       (s, obj) => `${s} was beside ${obj}.`,
  notBesideObject:    (s, obj) => `${s} was not near ${obj}.`,
  onSeatTile:         (s, t) =>
    t === 'sofa' ? `${s} was on the outdoor sofa.`
    : t === 'bed' ? `${s} was in the bedroom.`
    : `${s} was sitting in a chair.`,
  notOnSeatTile:      (s) => `${s} was not sitting down.`,
  northOf:            (s, o) => `${s} was north of ${o}.`,
  southOf:            (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
  exactlyNRowsSouth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
};

export const BACKYARD_THEME: Theme = {
  id: 'backyard',
  name: 'The Backyard',

  floorPlans: {
    easy:   FLOOR_PLANS['backyard'].easy,
    medium: FLOOR_PLANS['backyard'].medium,
    hard:   FLOOR_PLANS['backyard'].hard,
  },

  suspectNames: [
    'Aaron', 'Becca', 'Chad', 'Donna', 'Eric',
    'Fran', 'Greg', 'Helen', 'Ian', 'Jess',
    'Kurt', 'Lisa',
  ],

  victimNames: [
    'Victor', 'Vanessa', 'Vince', 'Vera', 'Valentina', 'Virgil',
  ],

  clueTemplates,

  narrativeTemplates: {
    intro: [
      'The Hendersons were supposed to be hosting a barbecue. Instead, they\'re hosting a detective. Someone is dead in the backyard and the potato salad is getting warm. You flash your badge.',
      'Summer parties end in hangovers, not homicides. Usually. The backyard of 14 Maple Drive is now a crime scene and you\'re the one who has to ruin everyone\'s weekend.',
      'It was a perfect Sunday afternoon until it wasn\'t. The body was found near the jacuzzi before anyone noticed their drink had gone untouched. You arrive with your notepad.',
    ],
    victimFound: [
      'The victim was found floating face-down near the jacuzzi.',
      'A guest discovered the victim collapsed on the deck.',
      'The victim was found on the grass between the patio chairs.',
    ],
    guiltyText: [
      '{{killerName}} — summer is ruined.',
      '{{killerName}} — the neighborhood will never be the same.',
      '{{killerName}} — nobody escapes the backyard detective.',
    ],
  },

  colorPalette: {
    floor:      '#d4e8c2',
    wall:       '#5d4037',
    seat:       '#8d6e63',
    accent:     '#e64a19',
    background: '#1a200f',
    text:       '#ffffff',
  },

  spriteMap: {
    'object:plant':       '',
    'object:jacuzzi-tile': '',
    'object:tv':          '',
    'object:sofa':        '',
  },
};
