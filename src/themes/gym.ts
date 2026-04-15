/**
 * The Gym theme — a fitness center with weights, cardio, lockers, and a
 * suspicious protein shake left unattended.
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
  inDifferentRoom:    (s, o) => `${s} and ${o} were training in different zones.`,
  inColumn:           (s, c) => `${s} was in the ${ordinal(c)} column.`,
  inRow:              (s, r) => `${s} was in the ${ordinal(r)} row.`,
  besideSuspect:      (s, o) => `${s} was working out right next to ${o}.`,
  notBesideSuspect:   (s, o) => `${s} was not beside ${o}.`,
  besideObject:       (s, obj) => `${s} was beside ${obj}.`,
  notBesideObject:    (s, obj) => `${s} was not near ${obj}.`,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSeatTile:         (s, _t) => `${s} was sitting on a bench.`,
  notOnSeatTile:      (s) => `${s} was not sitting down.`,
  northOf:            (s, o) => `${s} was north of ${o}.`,
  southOf:            (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
  exactlyNRowsSouth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
};

export const GYM_THEME: Theme = {
  id: 'gym',
  name: 'The Gym',
  floorPlans: {
    easy:   FLOOR_PLANS['gym'].easy,
    medium: FLOOR_PLANS['gym'].medium,
    hard:   FLOOR_PLANS['gym'].hard,
  },
  suspectNames: [
    'Atlas', 'Blair', 'Corey', 'Dakota', 'Evander',
    'Fitz', 'Gabe', 'Hunter', 'Indira', 'Jordan',
    'Knox', 'Leila',
  ],
  victimNames: ['Vance', 'Valentina', 'Viktor', 'Vera', 'Vito', 'Vesper'],
  clueTemplates,
  narrativeTemplates: {
    intro: [
      'FitLife Gym opens at 5am. This morning it opened to a body near the weight rack. The morning regulars are sweating for a different reason now.',
      'Somebody skipped leg day — and left somebody else skipping all days. The body was found in the Weights area. You badge through the turnstile.',
      'The gym is 24 hours. The victim wasn\'t. You arrive with your notepad and a distinct lack of enthusiasm for the treadmill.',
    ],
    victimFound: [
      'The victim was found near the weight rack before the early shift.',
      'A trainer discovered the victim collapsed in the cardio area.',
      'The victim was found in the pool area during the morning check.',
    ],
    guiltyText: [
      '{{killerName}} — no amount of cardio outpaces the truth.',
      '{{killerName}} — their reps are done.',
      '{{killerName}} — spotting the killer was the easy part.',
    ],
  },
  colorPalette: {
    floor:      '#e8e0d8',
    wall:       '#2c3e50',
    seat:       '#7f8c8d',
    accent:     '#e74c3c',
    background: '#0d1117',
    text:       '#ffffff',
  },
  spriteMap: {
    'object:weight-rack': '',
    'object:treadmill':   '',
    'object:counter':     '',
    'object:jacuzzi-tile': '',
  },
};
