/**
 * The Gym theme — a fitness center with weights, cardio, lockers, and a
 * suspicious protein shake left unattended.
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
    `${s} was spotted training in the ${r}.`,
    `Staff placed ${s} in the ${r} zone.`,
    `${s} spent time working out in the ${r}.`,
  ], s + r),

  notInRoom: (s, r) => pickVariant([
    `${s} was not in the ${r}.`,
    `${s} never used the ${r}.`,
    `The trainer confirmed ${s} wasn't in the ${r}.`,
    `${s} was nowhere near the ${r}.`,
  ], s + r),

  inSameRoom: (s, o) => pickVariant([
    `${s} was training in the same zone as ${o}.`,
    `${s} and ${o} were spotted working out together.`,
    `The trainer saw ${s} near ${o}.`,
    `${s} and ${o} shared the same section of the gym.`,
  ], s + o),

  inDifferentRoom: (s, o) => pickVariant([
    `${s} and ${o} were training in different zones.`,
    `${s} was nowhere near ${o}'s area.`,
    `${s} and ${o} never shared the same zone.`,
    `The trainer noted ${s} and ${o} were apart.`,
  ], s + o),

  inColumn: (s, c) => pickVariant([
    `${s} was in the ${ordinal(c)} column.`,
    `${s} was positioned in column ${c}.`,
    `${s} was located in the ${ordinal(c)} column.`,
  ], s + c),

  inRow: (s, r) => pickVariant([
    `${s} was in the ${ordinal(r)} row.`,
    `${s} trained along row ${r}.`,
    `${s}'s position was on the ${ordinal(r)} row.`,
  ], s + r),

  besideSuspect: (s, o) => pickVariant([
    `${s} was working out right next to ${o}.`,
    `${s} and ${o} were training side by side.`,
    `${s} was barely a step from ${o}.`,
    `A trainer noticed ${s} right beside ${o}.`,
  ], s + o),

  notBesideSuspect: (s, o) => pickVariant([
    `${s} was not beside ${o}.`,
    `${s} and ${o} were not training next to each other.`,
    `${s} kept a distance from ${o}.`,
  ], s + o),

  besideObject: (s, obj) => pickVariant([
    `${s} was beside ${obj}.`,
    `${s} was training right next to ${obj}.`,
    `${s} was seen near ${obj}.`,
  ], s + obj),

  notBesideObject: (s, obj) => pickVariant([
    `${s} was not near ${obj}.`,
    `${s} was not beside ${obj}.`,
    `${s} kept away from ${obj}.`,
  ], s + obj),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSeatTile: (s, _t) => pickVariant([
    `${s} was sitting on a bench.`,
    `${s} had taken a rest on a bench.`,
    `${s} was seated at the time.`,
  ], s),

  notOnSeatTile: (s) => pickVariant([
    `${s} was not sitting down.`,
    `${s} was on their feet.`,
    `${s} was actively moving around.`,
    `${s} never sat down during the session.`,
  ], s),

  northOf: (s, o) => pickVariant([
    `${s} was north of ${o}.`,
    `${s} was in the front section of the gym relative to ${o}.`,
    `${s} was closer to the entrance than ${o}.`,
  ], s + o),

  southOf: (s, o) => pickVariant([
    `${s} was south of ${o}.`,
    `${s} was in the back section of the gym relative to ${o}.`,
    `${s} was further from the entrance than ${o}.`,
  ], s + o),

  exactlyNRowsNorth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
    `${s} was ${n} station${n > 1 ? 's' : ''} ahead of ${o}.`,
  ], s + o + n),

  exactlyNRowsSouth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
    `${s} was ${n} station${n > 1 ? 's' : ''} behind ${o}.`,
  ], s + o + n),
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
