/**
 * Stub theme — used exclusively for engine unit tests in Stage 1.
 * Uses coffee-shop floor plans for deterministic test geometry.
 * Not registered in production; exported and registered by index.ts.
 */

import type { Theme, ClueTemplates } from './index';
import { FLOOR_PLANS } from './floor-plans';

const stubClueTemplates: ClueTemplates = {
  inRoom:            (s, r) => `${s} was in the ${r}.`,
  notInRoom:         (s, r) => `${s} was not in the ${r}.`,
  inSameRoom:        (s, o) => `${s} was in the same room as ${o}.`,
  inDifferentRoom:   (s, o) => `${s} and ${o} were in different rooms.`,
  inColumn:          (s, c) => `${s} was in column ${c}.`,
  inRow:             (s, r) => `${s} was in row ${r}.`,
  besideSuspect:     (s, o) => `${s} was beside ${o}.`,
  notBesideSuspect:  (s, o) => `${s} was not beside ${o}.`,
  besideObject:      (s, obj) => `${s} was beside ${obj}.`,
  notBesideObject:   (s, obj) => `${s} was not beside ${obj}.`,
  onSeatTile:        (s, t) => `${s} was on a ${t}.`,
  notOnSeatTile:     (s) => `${s} was not sitting down.`,
  northOf:           (s, o) => `${s} was north of ${o}.`,
  southOf:           (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth: (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
  exactlyNRowsSouth: (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
};

export const STUB_THEME: Theme = {
  id: 'stub',
  name: 'Test Room',
  floorPlans: {
    easy:   FLOOR_PLANS['coffee-shop'].easy,
    medium: FLOOR_PLANS['coffee-shop'].medium,
    hard:   FLOOR_PLANS['coffee-shop'].hard,
  },
  suspectNames: [
    'Alice','Bob','Carol','Dave','Eve',
    'Frank','Grace','Henry','Iris','Jack',
    'Kate','Leo',
  ],
  victimNames: ['Vera','Victor','Violet','Valencia','Vance','Vivian'],
  clueTemplates: stubClueTemplates,
  narrativeTemplates: {
    intro: [
      'A crime has occurred in the Test Room.',
      'Witnesses report suspicious activity.',
      'The detective arrives on the scene.',
    ],
    victimFound: [
      'The victim was found at the scene.',
      'A body has been discovered.',
      'The victim was discovered here.',
    ],
    guiltyText: [
      '{{killerName}} — caught red-handed.',
      '{{killerName}} — the evidence is clear.',
      '{{killerName}} — guilty as charged.',
    ],
  },
  colorPalette: {
    floor: '#f5e6d3',
    wall:  '#4a3728',
    seat:  '#8b6914',
    accent:'#c0392b',
    background: '#1a1a2e',
    text:  '#ffffff',
  },
  spriteMap: {},
};
