# alibi — Project Agent Context

## What This Is

ALIBI is a browser murder mystery logic-deduction game inspired by the book Murdoku (Manuel Garand). Players place suspects on a top-down illustrated floor plan by satisfying natural-language "alibis." Every puzzle is procedurally generated from a theme template. Infinite replayability. Statically hosted on GitHub Pages.

**Status**: Pre-release. Architecture complete. Implementation not started.

---

## SDLC Process

The team process lives in `.specify/memory/sdlc.md` — read it.
This file contains only project-specific context.

---

## Agent Identities

All sessions share GitHub account pnz1990. Every GitHub comment, issue, and PR review MUST start with the agent's badge.

| Session | Role | Badge | AGENT_ID |
|---|---|---|---|
| 1 | Coordinator | `[🎯 COORDINATOR]` | `COORDINATOR` |
| 2–N | Engineer | `[🔨 ENGINEER-N]` | `ENGINEER-N` |
| N+1 | QA | `[🔍 QA]` | `QA` |
| N+2 | Scrum Master | `[🔄 SCRUM-MASTER]` | `SCRUM-MASTER` |
| N+3 | Product Manager | `[📋 PM]` | `PM` |

```bash
export AGENT_ID="COORDINATOR"  # change per session
```

---

## Project Config

```yaml
PROJECT_NAME:   alibi
CLI_BINARY:     ""
PR_LABEL:       alibi
REPORT_ISSUE:   1
REPORT_URL:     https://github.com/pnz1990/alibi/issues/1
BOARD_URL:      ""
BUILD_COMMAND:  npm run build
TEST_COMMAND:   npm test
E2E_COMMAND:    npm run test:e2e
LINT_COMMAND:   npm run lint
VULN_COMMAND:   ""
DEV_SERVER:     npm run dev
```

---

## Architecture

ALIBI is a **frontend-only** SPA. No server, no database, no runtime API calls.

**Stack**: TypeScript + Vite. Rendered to HTML5 Canvas 2D (pixel-perfect integer scaling). Puzzle state in plain TS objects. Seed in URL hash.

**Core pipeline:**
```
Seed (PRNG)
  → Theme Template (floor plan, sprite catalog, name set)
    → Generator (place suspects, place objects, verify constraint, generate clues)
      → Puzzle (grid state, clue list, solution)
        → Renderer (canvas + DOM overlay)
          → Input (click → radial menu → placement)
            → Win condition check
```

**Grid**: 6×6. Columns 1–6 (x=0–5, left to right). Rows 1–6 (y=0–5, top to bottom).
**North = smaller y. South = larger y.**

**Suspects**: 6–8 per puzzle, drawn from the theme's name set.
**Victim**: Always the last remaining empty cell after all suspects are placed.
**Killer**: The suspect whose cell shares a Room Zone with the victim's cell.

---

## Package Layout

```
src/
  engine/
    grid.ts           # 6×6 grid model: tile types, zones, object placement
    logic.ts          # Rule of One, spatial mask, win condition
    clues.ts          # All clue type evaluators — pure functions
    generator.ts      # Procedural puzzle generator (seeded PRNG)
    solver.ts         # Constraint solver — verifies unique solution
  render/
    canvas.ts         # Canvas renderer: tiles, sprites, shadows, overlays
    sprites.ts        # SVG sprite loader and blit (floor objects)
    portraits.ts      # Suspect portrait card renderer
    ui.ts             # Sidebar: clue cards, satisfaction strikethrough
    overlay.ts        # How-to-play modal, narrative intro, share card
  game/
    state.ts          # State machine: idle → narrative → placing → solved → reveal → guilty → end
    input.ts          # Click → radial menu → placement; keyboard nav
    undo.ts           # Undo/redo stack
    sound.ts          # Web Audio API synthesis (no audio files)
    save.ts           # localStorage seed persistence + placement auto-save
    share.ts          # Completion card + clipboard copy
  themes/             # One module per theme
    coffee-shop.ts
    bookstore.ts
    backyard.ts
    holiday-shopping.ts
    index.ts          # Theme registry
  assets/
    sprites/          # SVG furniture icons (bundled, not fetched at runtime)
      chair.svg
      plant.svg
      table.svg
      shelf.svg
      cash-register.svg
      bed.svg
      sofa.svg
      jacuzzi.svg
      tree.svg
      tv.svg
      door.svg
      # ... all furniture types used by all themes
    portraits/        # SVG suspect portrait illustrations (one per name)
  main.ts
tests/
  e2e/
    smoke.spec.ts
    gameplay.spec.ts  # Full playthrough (generate puzzle → solve → GUILTY)
    generator.spec.ts # Generator produces valid, unique-solution puzzles
    undo.spec.ts
    save.spec.ts
    share.spec.ts
index.html
vite.config.ts
playwright.config.ts
tsconfig.json
package.json
```

---

## Game Mechanics Reference

### Grid

- **6×6 cells.** Column 1–6 (x=0–5), Row 1–6 (y=0–5).
- **North = smaller y (up on screen). South = larger y.**
- Each cell has exactly one tile type:
  - `floor` — walkable, placeable
  - `wall` — impassable, not placeable
  - `chair` / `sofa` / `bed` — seat tile, placeable (suspect can sit here)
  - `object` — furniture object (plant, shelf, table, cash register, etc.) — NOT placeable, but usable as landmark in clues. Has a `objectType` string (e.g. "plant", "table", "shelf").
- Each non-wall cell belongs to exactly one **Room Zone** (e.g. "Bar", "Main Area").
- `isBeside(A, B)` = Moore neighbourhood: `max(abs(dx), abs(dy)) <= 1` (includes diagonals).
- `isBeside(A, objectType)` = A is beside any cell of that object type.

### Suspects

- 6–8 suspects per puzzle, drawn from theme name set.
- Each has a name, a portrait SVG, and a suspect ID (A–H in order).
- 1 victim per puzzle — named V (e.g. "Vander", "Violet", "Vlimbo"). The victim is NOT placed by the player; they are revealed at the last empty valid cell.
- The killer = the suspect whose placed cell shares a Room Zone with the victim's cell.

### Rule of One (Layer A)

Every row (1–6) and every column (1–6) contains at most one suspect. Placing a suspect blocks that row and column for all other suspects. After all suspects are placed, exactly one non-wall, non-object cell remains unblocked — this is the victim's cell.

### Spatial Mask (Layer B)

Suspects can only be placed on `floor`, `chair`, `sofa`, or `bed` tiles. `wall` and `object` tiles cannot be occupied.

### Clue Types (Layer C — all 14)

All clue type evaluators are pure functions in `src/engine/clues.ts`. Natural-language templates live in each theme module.

| ID | Natural language example | Logic |
|----|--------------------------|-------|
| `inRoom` | "She was in the Bar." | suspect.zone == zoneId |
| `notInRoom` | "He was not in the Kitchen." | suspect.zone != zoneId |
| `inSameRoom` | "She was in the same room as Alan." | A.zone == B.zone |
| `inDifferentRoom` | "They were in different rooms." | A.zone != B.zone |
| `inColumn` | "He was in the third column." | suspect.x == col-1 |
| `inRow` | "She was in the second row." | suspect.y == row-1 |
| `isBesideSuspect` | "She was beside Finlay." | Chebyshev(A,B) <= 1 |
| `isNotBesideSuspect` | "He was not beside a plant." (suspect) | Chebyshev(A,B) > 1 |
| `isBesideObject` | "He was beside a table." | any object cell of type within Chebyshev 1 |
| `isNotBesideObject` | "She was not beside a shelf." | no object cell of type within Chebyshev 1 |
| `onTileType` | "She was in a chair." / "She was sitting." | suspect.tileType == "chair" or "sofa" |
| `notOnTileType` | "She was not sitting in a chair." | suspect.tileType != "chair" |
| `northOf` | "He was north of Chloe." (any row above) | A.y < B.y |
| `southOf` | "He was south of Aria." (any row below) | A.y > B.y |
| `exactlyNorthOf` | "He was exactly one row north of Gemma." | B.y - A.y == n |
| `exactlySouthOf` | "She was exactly two rows south of Alan." | A.y - B.y == n |

Note: `northOf` and `southOf` without "exactly" mean **any** row above/below (not just adjacent), matching the Murdoku book's definition. "Exactly" clues specify a precise offset.

### Win Condition

1. All suspects placed (satisfying all clues AND Rule of One AND spatial mask).
2. Exactly one valid non-wall, non-object cell remains unblocked — the victim's cell — highlighted.
3. Player clicks it → victim portrait appears + victim-found narrative.
4. Engine finds which suspect's cell shares a zone with the victim → that is the killer.
5. GUILTY stamp + killer name displayed.
6. Share card generated. "New Puzzle" button available.

### Clue Satisfaction Gate

If a player clicks the victim cell while any clue is unsatisfied: unsatisfied clue cards flash red, message "Something doesn't add up..." — no GUILTY. Player must resolve clues first.

---

## Procedural Generator

`src/engine/generator.ts` takes a `seed: number` and a `theme: Theme` and returns a complete `Puzzle` object with verified unique solution.

### Generator algorithm

```
1. Initialize PRNG with seed.
2. Load theme floor plan (fixed room layout + tile types).
3. Place furniture objects: randomly sample from theme's object catalog,
   place on floor tiles, ensure no object blocks all walkable cells in a zone.
4. Choose N suspects (6–8) from theme's name set (PRNG order).
5. Compute all valid cells (floor/chair/sofa/bed, not wall/object).
6. Place suspects: assign each suspect to a unique row AND unique column
   (Latin square constraint) on a valid cell. Use PRNG + backtracking.
7. Derive victim cell: the single remaining valid cell after all suspects'
   rows and columns are blocked.
8. Derive killer: suspect whose cell shares a zone with victim cell.
9. Generate clues: for each suspect, generate 1 clue that constrains their
   position using the 14 clue types. Mix zone clues, column/row clues,
   adjacency clues, tile-type clues. Prefer variety.
10. Verify uniqueness: run solver. If multiple solutions exist, add one more
    clue and re-verify. Repeat until unique.
11. Return Puzzle object.
```

### Uniqueness contract

The solver MUST confirm exactly 1 solution before the puzzle is returned to the renderer. The generator retries (up to 20 attempts with fresh PRNG state) if no unique-solution clue set is found. If all retries fail, `generator.ts` throws an error — this must never reach the player.

### Seeding and sharing

```typescript
// URL hash format: #theme=coffee-shop&seed=1234567890
// "New Puzzle" generates a new random seed and pushes to URL hash.
// Sharing the URL always reproduces the exact same puzzle.
```

---

## Theme Module Interface

Each theme exports a `Theme` object implementing this interface:

```typescript
interface Theme {
  id: string;                          // "coffee-shop"
  name: string;                        // "The Coffee Shop"
  floorPlan: FloorPlan;                // fixed 6×6 tile layout + zone definitions
  objectCatalog: ObjectType[];         // furniture types available in this theme
  suspectNames: SuspectName[];         // name pool (at least 12 names)
  victimNames: string[];               // victim name pool (start with V)
  narrativeTemplates: NarrativeTemplates;
  colorPalette: ThemePalette;          // floor/wall/zone colors
  spriteMap: Record<ObjectType, string>; // objectType → SVG asset path
}
```

---

## Sprite Assets

SVG furniture sprites live in `src/assets/sprites/`. They are imported directly by Vite (bundled into the JS/HTML at build time, no runtime fetch). Portrait SVGs live in `src/assets/portraits/`.

**Sprites required for v1.0** (one SVG per type):
`chair`, `sofa`, `bed`, `plant`, `table`, `shelf`, `cash-register`, `tree`, `jacuzzi`, `tv`, `door`, `teddy-bear`, `register`

Sprites must be: viewBox 32×32, clean flat vector, consistent color style across all. No photographic or raster elements.

Portrait SVGs: one per suspect name (at least 12 per theme × 4 themes = ~24 portraits). Style: flat vector face illustration, unique hair/glasses/features per person, no text. 64×64 viewBox.

**QA does NOT block PRs for missing or placeholder sprite files.** A missing sprite falls back to a labeled colored rectangle. Real SVG sprites are an enhancement within v1.0 — the generator and gameplay must work before sprites are added.

---

## UX Mechanics

### Placement interaction
- Click a `floor/chair/sofa/bed` cell → radial menu opens with available suspects + Clear option.
- Click a `wall` or `object` cell → nothing (no flash, just ignore).
- Click a cell in a blocked row/column → cell flashes red briefly (500ms), no menu.
- Click a cell already occupied by a suspect → radial menu opens with Clear option.

### Shadows
- Placing a suspect draws a semi-transparent overlay over the entire row and column.
- Clearing a suspect removes its row/column shadow.

### Undo / Redo
- Every placement and clear is recorded in an undo stack (max 50 entries).
- `Ctrl/Cmd+Z` undo, `Ctrl/Cmd+Shift+Z` redo. Undo button in sidebar.

### Sound
- Web Audio API synthesis only — no audio files. Zero bundle cost.
- Events: `place`, `clear`, `clue-satisfied`, `blocked`, `victim-reveal`, `guilty-stamp`.
- Mute toggle (🔇) persists to `localStorage`.

### Progress save
- Auto-save current placements to `localStorage` keyed by seed + theme.
- On load: if a save exists for the current seed, restore with "Resume?" prompt.

### Share card
- On GUILTY: show completion card with theme name, time, killer name, seed URL.
- "Copy result" copies text card to clipboard (à la Wordle).

### How-to-play
- Modal on first visit (localStorage flag). 4 slides: concept, placing, clues, accusation.
- Always accessible via "?" button.

---

## Code Standards

- TypeScript strict mode. `"strict": true`.
- No `any` without justifying comment.
- Pure functions for all engine code (`src/engine/`). Side effects only in `src/render/` and `src/game/`.
- Tests: Vitest for engine (unit), Playwright for render/game (e2e).
- Copyright header: `// Copyright 2026 The alibi Authors. Apache-2.0.`
- ESLint with `@typescript-eslint/recommended`. `npm run lint` must exit 0.
- Conventional Commits: `feat(scope):`, `fix(scope):`, `chore(scope):`

---

## E2E Testing — MANDATORY

Every feature affecting the browser must be verified with Playwright (`npm run test:e2e`) AND the OpenCode browser extension (`browser_screenshot`, `browser_click`, `browser_errors`). See §E2E Testing Protocol below.

### Required data-testid attributes

| Element | data-testid |
|---------|-------------|
| Canvas element | `game-canvas` |
| Theme selector | `theme-select` |
| New Puzzle button | `btn-new-puzzle` |
| Radial menu | `radial-menu` |
| Suspect option (A–H) | `suspect-option-[A-H]` |
| Clear option | `suspect-option-clear` |
| Each clue card | `clue-[id]` (e.g. `clue-0`, `clue-1`) |
| Satisfied clue | add class `clue-satisfied` |
| Unsatisfied clue (flashing) | add class `clue-error` |
| Victim cell highlight | `victim-cell` |
| GUILTY stamp | `guilty-stamp` |
| GUILTY killer name | `guilty-killer-name` |
| Undo button | `btn-undo` |
| Redo button | `btn-redo` |
| Mute button | `btn-mute` |
| Share button | `btn-share` |
| Help button | `btn-help` |
| How-to-play modal | `overlay-howtoplay` |
| Narrative intro screen | `narrative-intro` |
| Resume prompt | `prompt-resume` |
| "Something doesn't add up" msg | `msg-clue-gate` |

Each grid cell: `data-testid="cell-{x}-{y}"` on its clickable overlay element.

### Playwright test pattern

```typescript
import { test, expect } from '@playwright/test';

test('full playthrough — coffee shop', async ({ page }) => {
  // Use seed=12345 which the test suite controls for determinism
  await page.goto('/?theme=coffee-shop&seed=12345');
  await page.click('[data-testid="narrative-intro"] button');

  // The puzzle object is exposed as window.__alibi_puzzle in test builds
  const solution = await page.evaluate(() => (window as any).__alibi_puzzle.solution);

  // Place each suspect
  for (const [suspectId, pos] of Object.entries(solution)) {
    await page.click(`[data-testid="cell-${(pos as any).x}-${(pos as any).y}"]`);
    await page.click(`[data-testid="suspect-option-${suspectId}"]`);
  }

  // All clues satisfied
  const clueCount = await page.locator('[data-testid^="clue-"]').count();
  for (let i = 0; i < clueCount; i++) {
    await expect(page.locator(`[data-testid="clue-${i}"]`)).toHaveClass(/clue-satisfied/);
  }

  // Click victim cell → GUILTY
  await page.click('[data-testid="victim-cell"]');
  await expect(page.locator('[data-testid="guilty-stamp"]')).toBeVisible();
  await expect(page.locator('[data-testid="guilty-killer-name"]')).not.toBeEmpty();
});
```

**Important**: In test/dev builds, `window.__alibi_puzzle` must be set to the current puzzle object so Playwright tests can read the solution without hard-coding it. This is gated by `import.meta.env.DEV || import.meta.env.TEST`.

### Browser extension verification checklist (required before every PR)

```
[ ] browser_navigate("http://localhost:5173")
[ ] browser_screenshot() → grid renders, no blank canvas
[ ] browser_screenshot() after first suspect placement → shadow visible
[ ] browser_screenshot() after all suspects placed → victim cell highlighted
[ ] browser_screenshot() after victim click with unsatisfied clues → error state
[ ] browser_screenshot() after correct solution + victim click → GUILTY stamp visible
[ ] browser_errors() → zero JS errors
[ ] browser_console(filter="error") → empty
```

At least one browser_screenshot must appear in every PR body that touches render/game/themes.

### Anti-patterns (QA blocks PRs containing these)

| Pattern | Caught by |
|---|---|
| Engine logic inside `src/render/` or `src/game/` | QA |
| Any `fetch()` at runtime (sprites must be bundled) | QA |
| `any` type without justifying comment | QA |
| Generator producing puzzle with 0 or 2+ solutions | QA (solver test) |
| `data-testid` missing on interactive/observable element | QA |
| `page.click('canvas', {position:{x,y}})` in Playwright tests | QA — banned |
| PR body missing `browser_screenshot` (for render/game PRs) | QA |
| `window.__alibi_puzzle` not exposed in DEV/TEST builds | QA |
| Runtime npm package import in `src/` | QA |
| Hardcoded solution or seed in engine code | QA |

---

## Banned Filenames

`utils.ts`, `helpers.ts`, `common.ts`, `misc.ts`

---

## Label Taxonomy

| Group | Labels |
|---|---|
| Kind | `kind/enhancement`, `kind/bug`, `kind/chore`, `kind/docs`, `kind/security` |
| Area | `area/engine`, `area/generator`, `area/render`, `area/game`, `area/themes`, `area/ui`, `area/deploy` |
| Priority | `priority/critical`, `priority/high`, `priority/medium`, `priority/low` |
| Size | `size/xs`, `size/s`, `size/m`, `size/l`, `size/xl` |
| Type | `epic` |
| Workflow | `alibi`, `needs-human`, `blocked` |

---

## Files Agents Must Not Modify

- `docs/aide/vision.md`
- `docs/aide/roadmap.md`
- `AGENTS.md`
- `.specify/memory/constitution.md`
- `.specify/memory/sdlc.md`
