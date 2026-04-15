/**
 * Theme registry — maps theme IDs to Theme objects.
 * All themes except the stub are implemented in Stages 2–5.
 */

import type { FloorPlanDef } from './floor-plans';
import type { ClueType } from '../engine/clues';
import { COFFEE_SHOP_THEME } from './coffee-shop';
import { BOOKSTORE_THEME } from './bookstore';

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
// Theme registrations — add new themes here as they are implemented.
// Themes are imported and explicitly registered to avoid circular dependencies.
// ─────────────────────────────────────────────
registerTheme(COFFEE_SHOP_THEME);
registerTheme(BOOKSTORE_THEME);

// STUB_THEME: test-only theme, registered last so real themes take precedence
import { STUB_THEME } from './stub-theme';
export { STUB_THEME };
registerTheme(STUB_THEME);
