# Coffee Shop Theme Module

## What this does

Provides the Coffee Shop theme — a fully populated `Theme` object that the generator,
renderer, and mode screens can use to generate Coffee Shop puzzles across Easy, Medium,
and Hard difficulties. The floor plan definitions already exist in `src/themes/floor-plans.ts`.
This module adds the narrative content: suspect names, victim names, clue template
functions, color palette, sprite map, and narrative text variants.

## Obligations (Zone 1)

- `src/themes/coffee-shop.ts` exports a `COFFEE_SHOP_THEME` constant of type `Theme`.
- The module calls `registerTheme(COFFEE_SHOP_THEME)` at module load time.
- `floorPlans.easy` = `FLOOR_PLANS['coffee-shop'].easy` (from `floor-plans.ts`).
- `floorPlans.medium` = `FLOOR_PLANS['coffee-shop'].medium`.
- `floorPlans.hard` = `FLOOR_PLANS['coffee-shop'].hard`.
- `suspectNames` contains ≥ 12 distinct strings, all café-appropriate first names.
- `victimNames` contains ≥ 6 strings, each starting with 'V'.
- `clueTemplates` satisfies the `ClueTemplates` interface — all 16 methods present and callable.
- `narrativeTemplates.intro` has ≥ 3 string variants.
- `narrativeTemplates.victimFound` has ≥ 3 string variants.
- `narrativeTemplates.guiltyText` has ≥ 3 string variants, each containing `{{killerName}}`.
- `colorPalette` satisfies `ThemePalette` — all 6 color properties are valid CSS color strings.
- `spriteMap` maps at least the object types present in coffee-shop floor plans:
  `'object:bar-counter'`, `'object:plant'`, `'object:cash-register'` to non-empty strings.
- `src/themes/index.ts` imports and re-exports `COFFEE_SHOP_THEME`; the theme registry
  includes it under id `'coffee-shop'`.
- The generator can run with `(seed, 'coffee-shop', 'easy'|'medium'|'hard')` without error.
- A Vitest test suite `tests/unit/coffee-shop.test.ts` covers all obligations above.
- The test `generator runs 100 seeds on coffee-shop` produces 100 valid unique-solution puzzles.

## Implementer's judgment (Zone 2)

- Exact wording of suspect names, victim names, narrative text (within the café flavor constraint).
- Whether sprite map values are SVG path strings, empty strings (placeholder), or a sentinel.
- How clue template strings are phrased (tone, formality level) — examples in AGENTS.md are guidance, not requirements.
- Whether to colocate clue templates inline or extract to a `const` above the theme object.
- File structure within `src/themes/coffee-shop.ts` (single file, no subdirectories needed).

## Scoped out (Zone 3)

- SVG sprite file creation — sprite map values may be empty strings; renderer has fallback.
- Portrait SVG assets.
- Any rendering logic.
- Any localStorage interaction.
- The floor plan tile definitions (already in `floor-plans.ts`, must not change).

## Interfaces / Schema / Examples

### Theme interface (from index.ts)
```typescript
interface Theme {
  id: string;
  name: string;
  floorPlans: { easy: FloorPlanDef; medium: FloorPlanDef; hard: FloorPlanDef; };
  suspectNames: string[];
  victimNames: string[];
  clueTemplates: ClueTemplates;
  narrativeTemplates: {
    intro: string[];
    victimFound: string[];
    guiltyText: string[];
  };
  colorPalette: ThemePalette;
  spriteMap: Record<string, string>;
}
```

### Color palette target
Coffee Shop warm brown palette:
- `floor`: `'#f5e6d3'` (warm cream)
- `wall`: `'#4a3728'` (dark espresso)
- `seat`: `'#8b6914'` (caramel)
- `accent`: `'#c0392b'` (red accent)
- `background`: `'#1a1a2e'` (dark bg)
- `text`: `'#ffffff'`

### Sprite map keys to cover
Object types in coffee-shop floor plans: `'object:bar-counter'`, `'object:plant'`, `'object:cash-register'`.
Values: empty string `''` is acceptable for v1 (renderer falls back to labeled rect).

### Clue template example (from AGENTS.md)
```typescript
inRoom: (s, r) => `${s} was in the ${r}.`,
besideSuspect: (s, o) => `${s} was standing next to ${o}.`,
exactlyNRowsNorth: (s, o, n) => `${s} was exactly ${n} row${n > 1 ? 's' : ''} north of ${o}.`,
```

### Test success criteria
1. `COFFEE_SHOP_THEME` satisfies `Theme` interface — TypeScript compiles.
2. `suspectNames.length >= 12` — assertion passes.
3. `victimNames.length >= 6` — assertion passes.
4. All 16 `clueTemplates` keys are functions — assertion passes.
5. Generator produces a valid puzzle for seeds 0, 1, 42 on easy/medium/hard — no throw.
6. 100 seeds on coffee-shop easy: all result in unique solution (solverCount === 1).
