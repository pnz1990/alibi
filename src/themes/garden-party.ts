/**
 * The Garden Party theme — an outdoor summer party with lawn, gazebo,
 * greenhouse, and a suspicious number of garden shears.
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
  inDifferentRoom:    (s, o) => `${s} and ${o} were in different parts of the garden.`,
  inColumn:           (s, c) => `${s} was in the ${ordinal(c)} column.`,
  inRow:              (s, r) => `${s} was in the ${ordinal(r)} row.`,
  besideSuspect:      (s, o) => `${s} was standing right next to ${o}.`,
  notBesideSuspect:   (s, o) => `${s} was not beside ${o}.`,
  besideObject:       (s, obj) => `${s} was beside ${obj}.`,
  notBesideObject:    (s, obj) => `${s} was not near ${obj}.`,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSeatTile:         (s, _t) => `${s} was sitting on a garden chair.`,
  notOnSeatTile:      (s) => `${s} was not sitting down.`,
  northOf:            (s, o) => `${s} was north of ${o}.`,
  southOf:            (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
  exactlyNRowsSouth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
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
