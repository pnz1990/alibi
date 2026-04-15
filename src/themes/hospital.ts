/**
 * The Hospital theme — a busy medical ward with operating theatre,
 * pharmacy, and a body that shouldn't be here.
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
    `${s} was recorded in the ${r}.`,
    `Hospital logs confirm ${s} was in the ${r}.`,
    `${s} was present in the ${r} at the time.`,
  ], s + r),

  notInRoom: (s, r) => pickVariant([
    `${s} was not in the ${r}.`,
    `${s} was not recorded in the ${r}.`,
    `Staff confirmed ${s} was absent from the ${r}.`,
    `${s} had no reason to be in the ${r}.`,
  ], s + r),

  inSameRoom: (s, o) => pickVariant([
    `${s} was in the same ward as ${o}.`,
    `${s} and ${o} were logged in the same area.`,
    `A nurse placed ${s} alongside ${o}.`,
    `${s} was observed near ${o} at the time.`,
  ], s + o),

  inDifferentRoom: (s, o) => pickVariant([
    `${s} and ${o} were in different parts of the hospital.`,
    `${s} was not in the same area as ${o}.`,
    `Logs confirm ${s} and ${o} were in separate zones.`,
    `${o} was not in ${s}'s section.`,
  ], s + o),

  inColumn: (s, c) => pickVariant([
    `${s} was in the ${ordinal(c)} column.`,
    `${s}'s position was column ${c}.`,
    `${s} was recorded in column ${c}.`,
  ], s + c),

  inRow: (s, r) => pickVariant([
    `${s} was in the ${ordinal(r)} row.`,
    `${s} was logged at row ${r}.`,
    `${s}'s position was on the ${ordinal(r)} row.`,
  ], s + r),

  besideSuspect: (s, o) => pickVariant([
    `${s} was standing right next to ${o}.`,
    `${s} was observed in proximity to ${o}.`,
    `${s} and ${o} were in adjacent positions.`,
    `A nurse noted ${s} directly beside ${o}.`,
  ], s + o),

  notBesideSuspect: (s, o) => pickVariant([
    `${s} was not beside ${o}.`,
    `${s} and ${o} were not in adjacent positions.`,
    `${s} was not in proximity to ${o}.`,
  ], s + o),

  besideObject: (s, obj) => pickVariant([
    `${s} was beside ${obj}.`,
    `${s} was found adjacent to ${obj}.`,
    `${s} was in the immediate vicinity of ${obj}.`,
  ], s + obj),

  notBesideObject: (s, obj) => pickVariant([
    `${s} was not near ${obj}.`,
    `${s} was not adjacent to ${obj}.`,
    `${s} was not beside ${obj}.`,
  ], s + obj),

  onSeatTile: (s, t) =>
    t === 'bed'
      ? pickVariant([
          `${s} was in a hospital bed.`,
          `${s} was admitted and lying in bed.`,
          `${s} was bedridden at the time.`,
        ], s)
      : t === 'sofa'
      ? pickVariant([
          `${s} was in the waiting area.`,
          `${s} was seated in the waiting room.`,
          `${s} had not yet been admitted — still waiting.`,
        ], s)
      : pickVariant([
          `${s} was sitting down.`,
          `${s} was seated at the time.`,
        ], s),

  notOnSeatTile: (s) => pickVariant([
    `${s} was not sitting or lying down.`,
    `${s} was on their feet.`,
    `${s} was ambulatory at the time.`,
    `${s} was standing throughout.`,
  ], s),

  northOf: (s, o) => pickVariant([
    `${s} was north of ${o}.`,
    `${s}'s position was closer to the entrance than ${o}'s.`,
    `${s} was further north in the building than ${o}.`,
  ], s + o),

  southOf: (s, o) => pickVariant([
    `${s} was south of ${o}.`,
    `${s} was further back in the building than ${o}.`,
    `${s}'s position was further from the entrance than ${o}'s.`,
  ], s + o),

  exactlyNRowsNorth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
    `${s} was ${n} floor${n > 1 ? 's' : ''} ahead of ${o}.`,
  ], s + o + n),

  exactlyNRowsSouth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
    `${s} was ${n} floor${n > 1 ? 's' : ''} behind ${o}`,
  ], s + o + n),
};

export const HOSPITAL_THEME: Theme = {
  id: 'hospital',
  name: 'The Hospital',
  floorPlans: {
    easy:   FLOOR_PLANS['hospital'].easy,
    medium: FLOOR_PLANS['hospital'].medium,
    hard:   FLOOR_PLANS['hospital'].hard,
  },
  suspectNames: [
    'Aleksei', 'Beatrix', 'Conrad', 'Dorothea', 'Emil',
    'Francesca', 'Gunnar', 'Hilde', 'Igor', 'Jana',
    'Klaus', 'Liselotte',
  ],
  victimNames: ['Viktor', 'Valentina', 'Vera', 'Valentin', 'Vesna', 'Volkmar'],
  clueTemplates,
  narrativeTemplates: {
    intro: [
      'St Crispin\'s Hospital is where people come to recover. This one didn\'t make it. The night shift just ended and nobody has an alibi. You flash your badge at the nurses\' station.',
      'A hospital is the last place you expect a murder — or the first. The body was found during morning rounds. You put on gloves and start taking statements.',
      'The patient was admitted last night. By morning, they were a victim. Someone in this building knows what happened and you\'re going to find out who.',
    ],
    victimFound: [
      'The victim was found in the Ward during the overnight nursing check.',
      'The on-call doctor discovered the victim in the Operating Theatre.',
      'The victim was found in the Pharmacy storage area.',
    ],
    guiltyText: [
      '{{killerName}} — the prognosis was never good.',
      '{{killerName}} — no treatment for this outcome.',
      '{{killerName}} — discharged permanently.',
    ],
  },
  colorPalette: {
    floor:      '#f0f4f8',
    wall:       '#2c3e50',
    seat:       '#7f8c8d',
    accent:     '#e74c3c',
    background: '#0a0d12',
    text:       '#ffffff',
  },
  spriteMap: {
    'object:hospital-bed':    '',
    'object:medicine-cabinet':'',
  },
};
