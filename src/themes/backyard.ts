/**
 * The Backyard theme — a suburban home setting with jacuzzi, deck,
 * and that one suspicious neighbor who's always outside.
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
    `${s} was spotted out in the ${r}.`,
    `A neighbor saw ${s} in the ${r}.`,
    `${s} was hanging around the ${r}.`,
  ], s + r),

  notInRoom: (s, r) => pickVariant([
    `${s} was not in the ${r}.`,
    `${s} never went near the ${r}.`,
    `A guest confirmed ${s} wasn't in the ${r}.`,
  ], s + r),

  inSameRoom: (s, o) => pickVariant([
    `${s} was in the same area as ${o}.`,
    `${s} and ${o} were seen hanging out together.`,
    `A neighbor spotted ${s} near ${o}.`,
    `${s} was keeping close to ${o}.`,
  ], s + o),

  inDifferentRoom: (s, o) => pickVariant([
    `${s} and ${o} were in different parts of the yard.`,
    `${s} was nowhere near ${o}.`,
    `${s} and ${o} weren't in the same area.`,
    `${o} said they weren't near ${s} all afternoon.`,
  ], s + o),

  inColumn: (s, c) => pickVariant([
    `${s} was in the ${ordinal(c)} column.`,
    `${s} stood in column ${c}.`,
    `${s}'s spot was the ${ordinal(c)} column over.`,
  ], s + c),

  inRow: (s, r) => pickVariant([
    `${s} was in the ${ordinal(r)} row.`,
    `${s} was along row ${r}.`,
    `${s}'s position was on the ${ordinal(r)} row.`,
  ], s + r),

  besideSuspect: (s, o) => pickVariant([
    `${s} was right next to ${o}.`,
    `${s} was standing just beside ${o}.`,
    `${s} and ${o} were right next to each other.`,
    `Someone saw ${s} an arm's length from ${o}.`,
  ], s + o),

  notBesideSuspect: (s, o) => pickVariant([
    `${s} was not beside ${o}.`,
    `${s} and ${o} kept apart.`,
    `${s} was nowhere near ${o}.`,
  ], s + o),

  besideObject: (s, obj) => pickVariant([
    `${s} was beside ${obj}.`,
    `${s} was seen next to ${obj}.`,
    `${s} was hanging around ${obj}.`,
  ], s + obj),

  notBesideObject: (s, obj) => pickVariant([
    `${s} was not near ${obj}.`,
    `${s} was not beside ${obj}.`,
    `${s} stayed well away from ${obj}.`,
  ], s + obj),

  onSeatTile: (s, t) =>
    t === 'sofa'
      ? pickVariant([
          `${s} was on the outdoor sofa.`,
          `${s} had kicked back on the sofa.`,
          `${s} was lounging on the sofa.`,
        ], s)
      : t === 'bed'
      ? pickVariant([
          `${s} was in the bedroom.`,
          `${s} had retreated inside to the bedroom.`,
        ], s)
      : pickVariant([
          `${s} was sitting in a chair.`,
          `${s} had taken one of the lawn chairs.`,
        ], s),

  notOnSeatTile: (s) => pickVariant([
    `${s} was not sitting down.`,
    `${s} was up and about.`,
    `${s} was on their feet the whole time.`,
    `${s} never took a seat.`,
  ], s),

  northOf: (s, o) => pickVariant([
    `${s} was north of ${o}.`,
    `${s} was closer to the fence than ${o}.`,
    `${s} was in front of ${o} on the property.`,
  ], s + o),

  southOf: (s, o) => pickVariant([
    `${s} was south of ${o}.`,
    `${s} was deeper in the yard than ${o}.`,
    `${s} was behind ${o} on the property.`,
  ], s + o),

  exactlyNRowsNorth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
    `${s} was ${n} step${n > 1 ? 's' : ''} ahead of ${o}.`,
  ], s + o + n),

  exactlyNRowsSouth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
    `${s} was ${n} step${n > 1 ? 's' : ''} behind ${o}.`,
  ], s + o + n),
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
