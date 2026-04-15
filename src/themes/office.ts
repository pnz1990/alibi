/**
 * The Office theme — a corporate open-plan office with meeting rooms,
 * a server room, and someone who definitely took a long lunch.
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
    `${s} was seen working in the ${r}.`,
    `Access logs confirm ${s} was in the ${r}.`,
    `${s} spent time in the ${r} that day.`,
  ], s + r),

  notInRoom: (s, r) => pickVariant([
    `${s} was not in the ${r}.`,
    `${s} never entered the ${r}.`,
    `Access logs show ${s} was not in the ${r}.`,
    `Colleagues confirmed ${s} wasn't in the ${r}.`,
  ], s + r),

  inSameRoom: (s, o) => pickVariant([
    `${s} was working in the same area as ${o}.`,
    `${s} and ${o} shared the same workspace.`,
    `A colleague saw ${s} near ${o}.`,
    `${s} was at the same section as ${o}.`,
  ], s + o),

  inDifferentRoom: (s, o) => pickVariant([
    `${s} and ${o} were in different parts of the office.`,
    `${s} was not in the same area as ${o}.`,
    `The floor plan places ${s} and ${o} in separate zones.`,
    `${o} confirmed they weren't near ${s}.`,
  ], s + o),

  inColumn: (s, c) => pickVariant([
    `${s} was in the ${ordinal(c)} column.`,
    `${s}'s position was column ${c}.`,
    `${s} was in the ${ordinal(c)} column.`,
  ], s + c),

  inRow: (s, r) => pickVariant([
    `${s} was in the ${ordinal(r)} row.`,
    `${s} was on row ${r}.`,
    `${s} was on the ${ordinal(r)} row of the floor plan.`,
  ], s + r),

  besideSuspect: (s, o) => pickVariant([
    `${s} was right next to ${o}.`,
    `${s} and ${o} were in adjacent positions.`,
    `${s} was barely a step from ${o}.`,
    `A colleague noticed ${s} right beside ${o}.`,
  ], s + o),

  notBesideSuspect: (s, o) => pickVariant([
    `${s} was not beside ${o}.`,
    `${s} and ${o} were not in adjacent positions.`,
    `${s} was not close to ${o}.`,
  ], s + o),

  besideObject: (s, obj) => pickVariant([
    `${s} was beside ${obj}.`,
    `${s} was right next to ${obj}.`,
    `${s} was near ${obj}.`,
  ], s + obj),

  notBesideObject: (s, obj) => pickVariant([
    `${s} was not near ${obj}.`,
    `${s} was not beside ${obj}.`,
    `${s} kept away from ${obj}.`,
  ], s + obj),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSeatTile: (s, _t) => pickVariant([
    `${s} was sitting down.`,
    `${s} was seated at the time.`,
    `${s} had taken a seat.`,
    `${s} was not on their feet.`,
  ], s),

  notOnSeatTile: (s) => pickVariant([
    `${s} was not sitting down.`,
    `${s} was on their feet.`,
    `${s} was standing or moving around.`,
    `${s} was not seated.`,
  ], s),

  northOf: (s, o) => pickVariant([
    `${s} was north of ${o}.`,
    `${s} was closer to the entrance than ${o}.`,
    `${s} was in the front section of the office relative to ${o}.`,
  ], s + o),

  southOf: (s, o) => pickVariant([
    `${s} was south of ${o}.`,
    `${s} was further from the entrance than ${o}.`,
    `${s} was in the back section relative to ${o}.`,
  ], s + o),

  exactlyNRowsNorth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
    `${s} was ${n} row${n > 1 ? 's' : ''} ahead of ${o}.`,
  ], s + o + n),

  exactlyNRowsSouth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
    `${s} was ${n} row${n > 1 ? 's' : ''} behind ${o}.`,
  ], s + o + n),
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
