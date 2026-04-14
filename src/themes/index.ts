/**
 * Theme registry — maps theme IDs to Theme objects.
 * All themes except the stub are implemented in Stages 2–5.
 */

import type { FloorPlanDef } from './floor-plans';
import type { ClueType } from '../engine/clues';
import { FLOOR_PLANS } from './floor-plans';
import { COFFEE_SHOP_THEME } from './coffee-shop';

export type { ClueType };

export interface ClueTemplates {
  inRoom:             (suspectName: string, roomName: string) => string;
  notInRoom:          (suspectName: string, roomName: string) => string;
  inSameRoom:         (suspectName: string, otherName: string) => string;
  inDifferentRoom:    (suspectName: string, otherName: string) => string;
  inColumn:           (suspectName: string, colNumber: number) => string;
  inRow:              (suspectName: string, rowNumber: number) => string;
  besideSuspect:      (suspectName: string, otherName: string) => string;
  notBesideSuspect:   (suspectName: string, otherName: string) => string;
  besideObject:       (suspectName: string, objectName: string) => string;
  notBesideObject:    (suspectName: string, objectName: string) => string;
  onSeatTile:         (suspectName: string, tileName: string) => string;
  notOnSeatTile:      (suspectName: string) => string;
  northOf:            (suspectName: string, otherName: string) => string;
  southOf:            (suspectName: string, otherName: string) => string;
  exactlyNRowsNorth:  (suspectName: string, otherName: string, n: number) => string;
  exactlyNRowsSouth:  (suspectName: string, otherName: string, n: number) => string;
}

export interface ThemePalette {
  floor: string;
  wall: string;
  seat: string;
  accent: string;
  background: string;
  text: string;
}

export interface Theme {
  id: string;
  name: string;
  floorPlans: {
    easy: FloorPlanDef;
    medium: FloorPlanDef;
    hard: FloorPlanDef;
  };
  suspectNames: string[];  // ≥ 12 names
  victimNames: string[];   // start with V, ≥ 6 names
  clueTemplates: ClueTemplates;
  narrativeTemplates: {
    intro: string[];         // ≥ 3 variants
    victimFound: string[];   // ≥ 3 variants
    guiltyText: string[];    // ≥ 3 variants
  };
  colorPalette: ThemePalette;
  spriteMap: Record<string, string>; // objectType code → SVG string (Vite ?raw)
}

// Theme registry — populated as themes are implemented
const THEMES = new Map<string, Theme>();

export function registerTheme(theme: Theme): void {
  THEMES.set(theme.id, theme);
}

export function getTheme(id: string): Theme {
  const theme = THEMES.get(id);
  if (!theme) throw new Error(`Unknown theme: ${id}`);
  return theme;
}

export function getAllThemeIds(): string[] {
  return Array.from(THEMES.keys());
}

export function getAllThemes(): Theme[] {
  return Array.from(THEMES.values());
}

// ─────────────────────────────────────────────
// Theme registrations
// Import each theme module here; registration is explicit, not side-effect-based.
// ─────────────────────────────────────────────
registerTheme(COFFEE_SHOP_THEME);

// ─────────────────────────────────────────────
// STUB THEME — used for generator tests in Stage 1
// Simple 4×5 floor plan, 2 rooms, valid for Easy/Medium/Hard
// ─────────────────────────────────────────────

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
    wall: '#4a3728',
    seat: '#8b6914',
    accent: '#c0392b',
    background: '#1a1a2e',
    text: '#ffffff',
  },
  spriteMap: {},
};

registerTheme(STUB_THEME);
