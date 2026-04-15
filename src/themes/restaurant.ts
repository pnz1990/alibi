/**
 * The Restaurant theme — an upscale dinner service with kitchen, dining room,
 * private rooms, and a very suspicious wine selection.
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
  inSameRoom:         (s, o) => `${s} was dining in the same area as ${o}.`,
  inDifferentRoom:    (s, o) => `${s} and ${o} were in different parts of the restaurant.`,
  inColumn:           (s, c) => `${s} was in the ${ordinal(c)} column.`,
  inRow:              (s, r) => `${s} was in the ${ordinal(r)} row.`,
  besideSuspect:      (s, o) => `${s} was seated right next to ${o}.`,
  notBesideSuspect:   (s, o) => `${s} was not beside ${o}.`,
  besideObject:       (s, obj) => `${s} was beside ${obj}.`,
  notBesideObject:    (s, obj) => `${s} was not near ${obj}.`,
  onSeatTile:         (s, t) =>
    t === 'sofa' ? `${s} was on the banquette seating.`
    : `${s} was sitting at a table.`,
  notOnSeatTile:      (s) => `${s} was not seated.`,
  northOf:            (s, o) => `${s} was north of ${o}.`,
  southOf:            (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
  exactlyNRowsSouth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
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
