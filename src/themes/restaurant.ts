/**
 * The Restaurant theme — an upscale dinner service with kitchen, dining room,
 * private rooms, and a very suspicious wine selection.
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
    `${s} was seen dining in the ${r}.`,
    `The maître d' placed ${s} in the ${r}.`,
    `${s} was observed in the ${r} that evening.`,
  ], s + r),

  notInRoom: (s, r) => pickVariant([
    `${s} was not in the ${r}.`,
    `${s} never passed through the ${r}.`,
    `Staff confirmed ${s} wasn't in the ${r}.`,
    `${s} was nowhere near the ${r}.`,
  ], s + r),

  inSameRoom: (s, o) => pickVariant([
    `${s} was dining in the same area as ${o}.`,
    `${s} and ${o} shared the same section of the restaurant.`,
    `A waiter saw ${s} near ${o}.`,
    `${s} was at the same table section as ${o}.`,
  ], s + o),

  inDifferentRoom: (s, o) => pickVariant([
    `${s} and ${o} were in different parts of the restaurant.`,
    `${s} was not dining near ${o}.`,
    `The host confirmed ${s} and ${o} were seated apart.`,
    `${s} and ${o} never crossed paths that evening.`,
  ], s + o),

  inColumn: (s, c) => pickVariant([
    `${s} was in the ${ordinal(c)} column.`,
    `${s} was seated in column ${c}.`,
    `${s}'s table was in the ${ordinal(c)} column.`,
  ], s + c),

  inRow: (s, r) => pickVariant([
    `${s} was in the ${ordinal(r)} row.`,
    `${s} was seated along row ${r}.`,
    `${s}'s table was on the ${ordinal(r)} row.`,
  ], s + r),

  besideSuspect: (s, o) => pickVariant([
    `${s} was seated right next to ${o}.`,
    `${s} and ${o} were at adjacent tables.`,
    `${s} was barely an arm's length from ${o}.`,
    `A server noted ${s} right beside ${o}.`,
  ], s + o),

  notBesideSuspect: (s, o) => pickVariant([
    `${s} was not beside ${o}.`,
    `${s} and ${o} were not at adjacent tables.`,
    `${s} was seated well away from ${o}.`,
  ], s + o),

  besideObject: (s, obj) => pickVariant([
    `${s} was beside ${obj}.`,
    `${s} was seated next to ${obj}.`,
    `The floor plan shows ${s} right by ${obj}.`,
  ], s + obj),

  notBesideObject: (s, obj) => pickVariant([
    `${s} was not near ${obj}.`,
    `${s} was not beside ${obj}.`,
    `${s}'s seat was well away from ${obj}.`,
  ], s + obj),

  onSeatTile: (s, t) =>
    t === 'sofa'
      ? pickVariant([
          `${s} was on the banquette seating.`,
          `${s} had taken the banquette.`,
          `${s} was settled into a banquette seat.`,
        ], s)
      : pickVariant([
          `${s} was sitting at a table.`,
          `${s} was seated for the evening.`,
          `${s} had a chair at the table.`,
        ], s),

  notOnSeatTile: (s) => pickVariant([
    `${s} was not seated.`,
    `${s} was standing at the time.`,
    `${s} had not yet been seated.`,
    `${s} was on their feet.`,
  ], s),

  northOf: (s, o) => pickVariant([
    `${s} was north of ${o}.`,
    `${s} was closer to the entrance than ${o}.`,
    `${s} was seated in the front section relative to ${o}.`,
  ], s + o),

  southOf: (s, o) => pickVariant([
    `${s} was south of ${o}.`,
    `${s} was at a table deeper in the restaurant than ${o}.`,
    `${s} was in the back section relative to ${o}.`,
  ], s + o),

  exactlyNRowsNorth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
    `${s} was ${n} table-row${n > 1 ? 's' : ''} ahead of ${o}.`,
  ], s + o + n),

  exactlyNRowsSouth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
    `${s} was ${n} table-row${n > 1 ? 's' : ''} behind ${o}.`,
  ], s + o + n),
};

export const RESTAURANT_THEME: Theme = {
  id: 'restaurant',
  name: 'The Restaurant',
  floorPlans: {
    easy:   FLOOR_PLANS['restaurant'].easy,
    medium: FLOOR_PLANS['restaurant'].medium,
    hard:   FLOOR_PLANS['restaurant'].hard,
  },
  suspectNames: [
    'Andre', 'Bianca', 'Carlo', 'Delphine', 'Emilio',
    'Francoise', 'Gerard', 'Helena', 'Ignacio', 'Josephine',
    'Kristoffer', 'Loretta',
  ],
  victimNames: ['Victor', 'Violette', 'Vincenzo', 'Vera', 'Valeria', 'Vidal'],
  clueTemplates,
  narrativeTemplates: {
    intro: [
      'La Maison Rouge was fully booked for a private function. It\'s now fully booked by the police. Someone didn\'t make it to dessert — and you\'re the unwanted amuse-bouche.',
      'The head chef found the body before the morning prep. The restaurant is closed, the reservations are cancelled, and the chef is refusing to speak without a lawyer. You order espresso.',
      'Five-star dining. One-star outcome. The Michelin inspector will not be pleased. Neither will whoever left the body in the private dining room.',
    ],
    victimFound: [
      'The victim was found slumped in the private dining room.',
      'Kitchen staff discovered the victim near the counter.',
      'The sommelier found the victim in the dining room early in the morning.',
    ],
    guiltyText: [
      '{{killerName}} — an amuse-bouche of justice.',
      '{{killerName}} — the bill has arrived.',
      '{{killerName}} — this dish is best served cold.',
    ],
  },
  colorPalette: {
    floor:      '#f5e8d0',
    wall:       '#3b1f1f',
    seat:       '#8b1a1a',
    accent:     '#c0392b',
    background: '#180a0a',
    text:       '#ffffff',
  },
  spriteMap: {
    'object:bar-counter': '',
    'object:counter':     '',
    'object:table':       '',
    'object:plant':       '',
  },
};
