/**
 * The Carnival theme — a travelling fairground with carousel, funhouse,
 * food stands, and someone who didn't enjoy the ride.
 */

import type { Theme, ClueTemplates } from './index';
import { FLOOR_PLANS } from './floor-plans';

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

const clueTemplates: ClueTemplates = {
  inRoom:             (s, r) => `${s} was at the ${r}.`,
  notInRoom:          (s, r) => `${s} was not at the ${r}.`,
  inSameRoom:         (s, o) => `${s} was in the same area as ${o}.`,
  inDifferentRoom:    (s, o) => `${s} and ${o} were in different parts of the carnival.`,
  inColumn:           (s, c) => `${s} was in the ${ordinal(c)} column.`,
  inRow:              (s, r) => `${s} was in the ${ordinal(r)} row.`,
  besideSuspect:      (s, o) => `${s} was right next to ${o}.`,
  notBesideSuspect:   (s, o) => `${s} was not beside ${o}.`,
  besideObject:       (s, obj) => `${s} was beside ${obj}.`,
  notBesideObject:    (s, obj) => `${s} was not near ${obj}.`,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSeatTile:         (s, _t) => `${s} was seated at one of the stalls.`,
  notOnSeatTile:      (s) => `${s} was not sitting down.`,
  northOf:            (s, o) => `${s} was north of ${o}.`,
  southOf:            (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
  exactlyNRowsSouth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
};

export const CARNIVAL_THEME: Theme = {
  id: 'carnival',
  name: 'The Carnival',
  floorPlans: {
    easy:   FLOOR_PLANS['carnival'].easy,
    medium: FLOOR_PLANS['carnival'].medium,
    hard:   FLOOR_PLANS['carnival'].hard,
  },
  suspectNames: [
    'Alistair', 'Brigitte', 'Cosmo', 'Dafne', 'Ezra',
    'Flavia', 'Gideon', 'Harriet', 'Ignatius', 'Juno',
    'Ludo', 'Mirabel',
  ],
  victimNames: ['Victor', 'Valentina', 'Vex', 'Vane', 'Vesper', 'Volta'],
  clueTemplates,
  narrativeTemplates: {
    intro: [
      'The Twilight Carnival has been travelling for thirty years without incident. Last night ended that streak. The body was found between the Carousel and the Funhouse. You came for the cotton candy.',
      'Someone killed the Ringmaster. Or maybe the Ringmaster killed someone. Either way, the show is not going on tonight. You arrive as the last customers are being turned away.',
      'Carnivals attract all sorts. This one attracted a detective. The body was found before morning setup. You pull on your coat and walk between the tents.',
    ],
    victimFound: [
      'The victim was found near the Carousel before the carnival opened.',
      'The ride operator discovered the victim in the Funhouse corridor.',
      'The victim was found behind the Food Stands at dawn.',
    ],
    guiltyText: [
      '{{killerName}} — the last act.',
      '{{killerName}} — the fun is over.',
      '{{killerName}} — tickets have been cancelled.',
    ],
  },
  colorPalette: {
    floor:      '#f5deb3',
    wall:       '#4a235a',
    seat:       '#884ea0',
    accent:     '#e74c3c',
    background: '#0d0a14',
    text:       '#ffffff',
  },
  spriteMap: {
    'object:carousel-horse': '',
    'object:stall':          '',
  },
};
