/**
 * The Carnival theme — a travelling fairground with carousel, funhouse,
 * food stands, and someone who didn't enjoy the ride.
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
    `${s} was at the ${r}.`,
    `${s} was spotted at the ${r}.`,
    `Carnies placed ${s} at the ${r}.`,
    `${s} was seen hanging around the ${r}.`,
  ], s + r),

  notInRoom: (s, r) => pickVariant([
    `${s} was not at the ${r}.`,
    `${s} never visited the ${r}.`,
    `The carnie confirmed ${s} wasn't at the ${r}.`,
    `${s} steered clear of the ${r}.`,
  ], s + r),

  inSameRoom: (s, o) => pickVariant([
    `${s} was in the same area as ${o}.`,
    `${s} and ${o} were seen at the same attraction.`,
    `A vendor spotted ${s} near ${o}.`,
    `${s} and ${o} were together in the crowd.`,
  ], s + o),

  inDifferentRoom: (s, o) => pickVariant([
    `${s} and ${o} were in different parts of the carnival.`,
    `${s} was nowhere near ${o}'s attraction.`,
    `${s} and ${o} were at opposite ends of the fairground.`,
    `${o} said they hadn't seen ${s} nearby.`,
  ], s + o),

  inColumn: (s, c) => pickVariant([
    `${s} was in the ${ordinal(c)} column.`,
    `${s} stood in column ${c} of the fairground.`,
    `${s}'s position was the ${ordinal(c)} column.`,
  ], s + c),

  inRow: (s, r) => pickVariant([
    `${s} was in the ${ordinal(r)} row.`,
    `${s} was along the ${ordinal(r)} row of attractions.`,
    `${s}'s position was on the ${ordinal(r)} row.`,
  ], s + r),

  besideSuspect: (s, o) => pickVariant([
    `${s} was right next to ${o}.`,
    `${s} and ${o} were shoulder to shoulder in the crowd.`,
    `A vendor saw ${s} just beside ${o}.`,
    `${s} was barely a step from ${o}.`,
  ], s + o),

  notBesideSuspect: (s, o) => pickVariant([
    `${s} was not beside ${o}.`,
    `${s} and ${o} were apart in the crowd.`,
    `${s} was not close to ${o}.`,
  ], s + o),

  besideObject: (s, obj) => pickVariant([
    `${s} was beside ${obj}.`,
    `${s} was seen right by ${obj}.`,
    `${s} was standing near ${obj}.`,
  ], s + obj),

  notBesideObject: (s, obj) => pickVariant([
    `${s} was not near ${obj}.`,
    `${s} was not beside ${obj}.`,
    `${s} kept away from ${obj}.`,
  ], s + obj),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSeatTile: (s, _t) => pickVariant([
    `${s} was seated at one of the stalls.`,
    `${s} had taken a seat by a stall.`,
    `${s} was sitting at the time.`,
    `${s} was resting on one of the benches.`,
  ], s),

  notOnSeatTile: (s) => pickVariant([
    `${s} was not sitting down.`,
    `${s} was moving through the crowd.`,
    `${s} was on their feet.`,
    `${s} hadn't stopped to sit all evening.`,
  ], s),

  northOf: (s, o) => pickVariant([
    `${s} was north of ${o}.`,
    `${s} was in the front section of the carnival relative to ${o}.`,
    `${s} was closer to the main entrance than ${o}.`,
  ], s + o),

  southOf: (s, o) => pickVariant([
    `${s} was south of ${o}.`,
    `${s} was in the back of the fairground relative to ${o}.`,
    `${s} was further from the entrance than ${o}.`,
  ], s + o),

  exactlyNRowsNorth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
    `${s} was ${n} attraction-row${n > 1 ? 's' : ''} ahead of ${o}.`,
  ], s + o + n),

  exactlyNRowsSouth: (s, o, n) => pickVariant([
    `${s} was exactly ${n} row${n > 1 ? 's' : ''} south of ${o}.`,
    `${s} was ${n} attraction-row${n > 1 ? 's' : ''} behind ${o}.`,
  ], s + o + n),
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
    'Kit', 'Ludo',
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
