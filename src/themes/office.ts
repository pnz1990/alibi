/**
 * The Office theme — a corporate open-plan office with meeting rooms,
 * a server room, and someone who definitely took a long lunch.
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
  inSameRoom:         (s, o) => `${s} was working in the same area as ${o}.`,
  inDifferentRoom:    (s, o) => `${s} and ${o} were in different parts of the office.`,
  inColumn:           (s, c) => `${s} was in the ${ordinal(c)} column.`,
  inRow:              (s, r) => `${s} was in the ${ordinal(r)} row.`,
  besideSuspect:      (s, o) => `${s} was working right next to ${o}.`,
  notBesideSuspect:   (s, o) => `${s} was not beside ${o}.`,
  besideObject:       (s, obj) => `${s} was beside ${obj}.`,
  notBesideObject:    (s, obj) => `${s} was not near ${obj}.`,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSeatTile:         (s, _t) => `${s} was sitting at their desk.`,
  notOnSeatTile:      (s) => `${s} was not sitting down.`,
  northOf:            (s, o) => `${s} was north of ${o}.`,
  southOf:            (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
  exactlyNRowsSouth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
};

export const OFFICE_THEME: Theme = {
  id: 'office',
  name: 'The Office',
  floorPlans: {
    easy:   FLOOR_PLANS['office'].easy,
    medium: FLOOR_PLANS['office'].medium,
    hard:   FLOOR_PLANS['office'].hard,
  },
  suspectNames: [
    'Adrian', 'Brooke', 'Clive', 'Daria', 'Edwin',
    'Fiona', 'Graham', 'Harriet', 'Isaac', 'Judith',
    'Kieran', 'Laura',
  ],
  victimNames: ['Vincent', 'Veronica', 'Vance', 'Vivienne', 'Victor', 'Velvet'],
  clueTemplates,
  narrativeTemplates: {
    intro: [
      'Meridian Corp. Floor 12. The quarterly review meeting has been cancelled for the most permanent possible reason. You badge in and start asking questions before the lawyers arrive.',
      'The victim was found at their desk. The access log shows they never left last night. Whoever did this knew the building. You start with the people who knew it best.',
      'It was supposed to be a normal Monday. Then the HR department filed the wrong kind of incident report. You turn off your phone\'s out-of-office message and get to work.',
    ],
    victimFound: [
      'The victim was found at their desk during the morning security check.',
      'The building manager found the victim in the Meeting Room after the overnight shift.',
      'A colleague discovered the victim in the Server Room at 7am.',
    ],
    guiltyText: [
      '{{killerName}} — the performance review was terminal.',
      '{{killerName}} — this one won\'t go in the quarterly report.',
      '{{killerName}} — consider this case closed.',
    ],
  },
  colorPalette: {
    floor:      '#e8e8f0',
    wall:       '#34495e',
    seat:       '#7f8c8d',
    accent:     '#2980b9',
    background: '#0a0a14',
    text:       '#ffffff',
  },
  spriteMap: {
    'object:desk':        '',
    'object:photocopier': '',
    'object:tv':          '',
    'object:plant':       '',
  },
};
