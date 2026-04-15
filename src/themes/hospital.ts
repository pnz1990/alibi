/**
 * The Hospital theme — a busy medical ward with operating theatre,
 * pharmacy, and a body that shouldn't be here.
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
  inSameRoom:         (s, o) => `${s} was in the same ward as ${o}.`,
  inDifferentRoom:    (s, o) => `${s} and ${o} were in different parts of the hospital.`,
  inColumn:           (s, c) => `${s} was in the ${ordinal(c)} column.`,
  inRow:              (s, r) => `${s} was in the ${ordinal(r)} row.`,
  besideSuspect:      (s, o) => `${s} was standing right next to ${o}.`,
  notBesideSuspect:   (s, o) => `${s} was not beside ${o}.`,
  besideObject:       (s, obj) => `${s} was beside ${obj}.`,
  notBesideObject:    (s, obj) => `${s} was not near ${obj}.`,
  onSeatTile:         (s, t) =>
    t === 'bed' ? `${s} was in a hospital bed.`
    : t === 'sofa' ? `${s} was in the waiting area.`
    : `${s} was sitting down.`,
  notOnSeatTile:      (s) => `${s} was not sitting or lying down.`,
  northOf:            (s, o) => `${s} was north of ${o}.`,
  southOf:            (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
  exactlyNRowsSouth:  (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
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
