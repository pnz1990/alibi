/**
 * The Garden Party theme — an outdoor summer party with lawn, gazebo,
 * greenhouse, and a suspicious number of garden shears.
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
    `${s} was seen mingling in the ${r}.`,
    `Other guests placed ${s} in the ${r}.`,
    `${s} spent the afternoon in the ${r}.`,
  ], s + r),

  notInRoom: (s, r) => pickVariant([
    `${s} was not in the ${r}.`,
    `${s} never ventured to the ${r}.`,
    `Guests confirmed ${s} wasn't in the ${r}.`,
    `${s} was not seen in the ${r} all afternoon.`,
  ], s + r),

  inSameRoom: (s, o) => pickVariant([
    `${s} was in the same area as ${o}.`,
    `${s} and ${o} were mingling in the same spot.`,
    `A guest saw ${s} near ${o}.`,
    `${s} and ${o} were together at the party.`,
  ], s + o),

  inDifferentRoom: (s, o) => pickVariant([
    `${s} and ${o} were in different parts of the garden.`,
    `${s} was not near ${o} during the party.`,
    `Guests saw ${s} and ${o} in separate areas.`,
    `${o} mentioned they weren't near ${s}.`,
  ], s + o),

  inColumn: (s, c) => pickVariant([
    `${s} was in the ${ordinal(c)} column.`,
    `${s} stood in column ${c} of the garden.`,
    `${s}'s position was the ${ordinal(c)} column from the edge.`,
  ], s + c),

  inRow: (s, r) => pickVariant([
    `${s} was in the ${ordinal(r)} row.`,
    `${s} was along the ${ordinal(r)} row of the garden.`,
    `${s}'s spot was on the ${ordinal(r)} row.`,
  ], s + r),

  besideSuspect: (s, o) => pickVariant([
    `${s} was standing right next to ${o}.`,
    `${s} and ${o} were chatting side by side.`,
    `A guest noticed ${s} just beside ${o}.`,
    `${s} and ${o} were barely a step apart.`,
  ], s + o),

  notBesideSuspect: (s, o) => pickVariant([
    `${s} was not beside ${o}.`,
    `${s} and ${o} kept apart during the party.`,
    `${s} was not close to ${o}.`,
  ], s + o),

  besideObject: (s, obj) => pickVariant([
    `${s} was beside ${obj}.`,
    `${s} was found near ${obj}.`,
    `${s} was standing just by ${obj}.`,
  ], s + obj),

  notBesideObject: (s, obj) => pickVariant([
    `${s} was not near ${obj}.`,
    `${s} was not beside ${obj}.`,
    `${s} was far from ${obj}.`,
  ], s + obj),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSeatTile: (s, _t) => pickVariant([
    `${s} was sitting on a garden chair.`,
    `${s} had taken one of the garden chairs.`,
    `${s} was seated outside.`,
    `${s} was in a chair at the time.`,
  ], s),

  notOnSeatTile: (s) => pickVariant([
    `${s} was not sitting down.`,
    `${s} was up and circulating.`,
    `${s} was standing during the party.`,
    `${s} had not taken a seat.`,
  ], s),

  northOf: (s, o) => pickVariant([
    `${s} was north of ${o}.`,
    `${s} was in the front section of the garden relative to ${o}.`,
    `${s} was closer to the gate than ${o}.`,
  ], s + o),

  southOf: (s, o) => pickVariant([
    `${s} was south of ${o}.`,
    `${s} was deeper in the garden than ${o}.`,
    `${s} was further from the gate than ${o}.`,
  ], s + o),

  exactlyNRowsNorth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
    `${s} was ${n} step${n > 1 ? 's' : ''} ahead of ${o} in the garden.`,
  ], s + o + n),

  exactlyNRowsSouth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
    `${s} was ${n} step${n > 1 ? 's' : ''} behind ${o} in the garden.`,
  ], s + o + n),
};

export const GARDEN_PARTY_THEME: Theme = {
  id: 'garden-party',
  name: 'The Garden Party',
  floorPlans: {
    easy:   FLOOR_PLANS['garden-party'].easy,
    medium: FLOOR_PLANS['garden-party'].medium,
    hard:   FLOOR_PLANS['garden-party'].hard,
  },
  suspectNames: [
    'Arabella', 'Benedict', 'Cecily', 'Damien', 'Eleanor',
    'Freddie', 'Georgina', 'Hugo', 'Imogen', 'Jasper',
    'Kit', 'Lavinia',
  ],
  victimNames: ['Violet', 'Valentine', 'Verity', 'Viscount', 'Viola', 'Vaughn'],
  clueTemplates,
  narrativeTemplates: {
    intro: [
      'The Westerleigh garden party was the social event of summer. It is no longer a social event. The body was found beneath the roses and you\'ve been asked — very politely — to investigate.',
      'Champagne, strawberries, murder. The annual garden party at Fernwood House has taken a distinctly unfestive turn. You decline the cucumber sandwiches and start asking questions.',
      'The gazebo was booked for afternoon tea. It is now a crime scene. You roll up your sleeves and walk across the manicured lawn.',
    ],
    victimFound: [
      'The victim was found in the Greenhouse before the afternoon guests arrived.',
      'A gardener discovered the victim on the Lawn near the flower beds.',
      'The caterers found the victim in the Gazebo.',
    ],
    guiltyText: [
      '{{killerName}} — the summer is wilted.',
      '{{killerName}} — cut down in their prime.',
      '{{killerName}} — this garden party is over.',
    ],
  },
  colorPalette: {
    floor:      '#d4f0c0',
    wall:       '#5d4037',
    seat:       '#7cb342',
    accent:     '#e91e63',
    background: '#0a1f0a',
    text:       '#ffffff',
  },
  spriteMap: {
    'object:flower-bed': '',
    'object:plant':      '',
  },
};
