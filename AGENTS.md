# alibi — Project Agent Context

## What This Is

ALIBI is a noir pixel-art logic-deduction game playable in the browser, statically hosted on GitHub Pages. No backend. No server. Pure frontend.

The player is a detective viewing a top-down crime scene grid. By satisfying textual "alibis" (clues) and Sudoku-like grid constraints, they place 8 suspects to reveal the victim's location and identify the killer.

Inspired by the board game Murdoku. Implemented as a vanilla TypeScript + Vite single-page application with pixel-art assets.

**Status**: Pre-release. Specification complete. Implementation not started.

---

## SDLC Process

The team process lives in `.specify/memory/sdlc.md` — read it.
This file contains only project-specific context that specializes the generic process.

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
CLI_BINARY:     ""                  # no CLI — browser only
PR_LABEL:       alibi
REPORT_ISSUE:   1
REPORT_URL:     https://github.com/pnz1990/alibi/issues/1
BOARD_URL:      ""                  # fill after GitHub Projects board creation
BUILD_COMMAND:  npm run build
TEST_COMMAND:   npm test
E2E_COMMAND:    npm run test:e2e
LINT_COMMAND:   npm run lint
VULN_COMMAND:   ""
DEV_SERVER:     npm run dev         # starts Vite dev server on http://localhost:5173
```

---

## Architecture

ALIBI is a **frontend-only** single-page application. No server, no database, no API calls at runtime. Everything runs in the browser.

**Stack**: TypeScript + Vite, rendered to a `<canvas>` element for pixel-art rendering. Game state is plain in-memory objects. Levels are JSON files bundled at build time. Deployed as static files to GitHub Pages via `gh-pages` branch.

**Rendering**: HTML5 Canvas 2D API. Pixel-art sprites rendered at integer scale (2x or 3x). No WebGL.

**State**: All game state (placed suspects, clue satisfaction, win/lose) lives in a plain TypeScript object. No Redux, no external state library. URL hash encodes current level for sharable links.

**Levels**: Each level is a `levels/<id>.json` file describing: the 9×9 grid tile map (floor/solid/seat), room zone boundaries, the 8 suspects + victim, and the clue set.

## Package Layout

```
src/
  engine/
    grid.ts           # 9x9 grid model: tile types, room zones, placement
    logic.ts          # Logic engine: Rule of One (Sudoku), spatial mask, clue eval
    clues.ts          # Clue type definitions + evaluators (adjacency, room, LoS, distance)
    solver.ts         # Constraint solver to verify level solvability
  render/
    canvas.ts         # Canvas renderer: grid, sprites, shadows, UI overlays
    sprites.ts        # Sprite sheet loader and tile blit
    ui.ts             # Sidebar case file, clue strikethrough, radial menus
    overlay.ts        # How-to-play modal
  game/
    state.ts          # Game state machine: idle → narrative → placing → solved → reveal → accusation → end
    input.ts          # Click/tap event handling → radial menu → placement
    levels.ts         # Level loader from JSON
    undo.ts           # Undo/redo stack
    sound.ts          # Web Audio API sound synthesis
    save.ts           # localStorage progress persistence
    share.ts          # Completion card generator
  levels/             # Level JSON files (one per theme)
    001-speakeasy.json
    002-luxury-liner.json
    003-art-gallery.json
    004-greenhouse.json
  assets/
    sprites/          # Pixel-art sprite sheets (PNG, optional for v1.0)
    fonts/            # Pixel font (bitmap)
  main.ts             # Entry point
tests/
  e2e/                # Playwright end-to-end tests — SEE §E2E Testing below
    level1.spec.ts    # Full playthrough of Level 1 (The Speakeasy)
    level2.spec.ts    # Full playthrough of Level 2 (The Luxury Liner)
    level3.spec.ts    # Full playthrough of Level 3 (The Art Gallery)
    level4.spec.ts    # Full playthrough of Level 4 (The Greenhouse)
    placement.spec.ts # Rule of One blocking, wall tile blocking, clue gate
    undo.spec.ts      # Undo/redo flows
    save.spec.ts      # localStorage save/restore
    share.spec.ts     # Completion card copy
index.html
vite.config.ts
playwright.config.ts
tsconfig.json
package.json
```

---

## Game Mechanics Reference

### Grid
- 9×9 cells. Columns labeled A–I (x), rows 1–9 (y).
- Each cell is: `Floor` | `Solid` | `Seat`. Suspects can only be placed on Floor or Seat.
- Cells belong to exactly one Room Zone (e.g. "The Bar", "The Kitchen").

### Suspects
- 8 suspects: Arthur, Beatrice, Caspar, Dolores, Elias, Fiona, Gideon, Harlow.
- 1 victim: always starts with V (Vincent, Vera, Victor…).
- The killer = the suspect in the same Room Zone as the victim once the grid is solved.

### Logic Layers
- **Layer A — Rule of One**: Each row and each column may contain at most one suspect. After all 8 suspects are placed, exactly one unblocked cell remains — that is the Body's Location.
- **Layer B — Spatial Mask**: Suspects may only be placed on Floor or Seat tiles. Solid tiles are blocked.
- **Layer C — Testimony (Clues)**: Boolean expressions evaluated in real time. Types:
  - `isBeside(A, B)` — `abs(A.x-B.x) <= 1 && abs(A.y-B.y) <= 1`
  - `isInRoom(C, "Library")` — C's cell Room Zone == "Library"
  - `isInSameRow(D, "Grand Piano")` — D.y == landmark.y
  - `isFarFrom(E, F, 3)` — Chebyshev distance >= 3
  - `isNorthOf(A, B, n)` — A.y == B.y - n

### Win Condition
1. Player places all 8 suspects satisfying all clues.
2. Player clicks the single remaining valid empty cell.
3. Victim sprite appears at that cell.
4. Engine identifies the suspect sharing that Room Zone — that is the killer.
5. "GUILTY" stamp slams onto screen.
6. A shareable completion card is generated and shown: level name, time taken, and a text-art summary (copyable for social sharing, à la Wordle).

### Undo / Redo
- Every placement and clear action is recorded in an undo stack (max 50 entries).
- **Undo button** in UI (and keyboard shortcut `Ctrl+Z` / `Cmd+Z`) reverts the last placement or clear.
- **Redo** (`Ctrl+Shift+Z` / `Cmd+Shift+Z`) re-applies an undone action.
- Undo stack is reset on level start and level reset.
- There is no penalty for undoing. Players can undo freely.

### Sound Design
- All sounds are generated with the **Web Audio API** — no audio files required in the bundle (zero asset size cost).
- Sound events:
  - `place`: soft click (short sine burst, ~80ms)
  - `clear`: reversed click (same burst, time-reversed)
  - `clue-satisfied`: soft chime (two ascending tones)
  - `blocked`: low thud (short noise burst)
  - `guilty-stamp`: dramatic bass hit + reverb tail
  - `victim-reveal`: rising tension arpeggio
- Sounds are enabled by default. A mute toggle (🔇) in the top-right corner persists to `localStorage`.

### How to Play Overlay
- Shown automatically on **first visit** only (tracked via `localStorage`).
- A modal overlay with 4 slides: (1) game concept, (2) placing suspects, (3) reading clues, (4) finding the killer.
- Dismissable with Escape or a "Got it →" button.
- Always accessible via a "?" button in the UI corner.

### Level Narrative
Each level JSON includes a `narrative` object with:
- `intro`: 2–3 sentences of noir flavor text, read-aloud style. Shown before the grid appears.
- `victim_found`: 1 sentence shown when the victim cell is clicked ("The body of Vincent was found slumped behind the bar...")
- `guilty_text`: 1 sentence for the accusation screen ("Elias — you were in the Entrance when the shot rang out.")

Narrative text is authored in `docs/level-designs.md` and must be included in the level JSON. QA blocks PRs where `narrative` is missing or has placeholder text like "TODO".

### Progress Save
- Current placement state is auto-saved to `localStorage` every time a suspect is placed or cleared.
- Key: `alibi_progress_<level-id>`. Value: JSON of current placements.
- On level load: if a save exists for that level, it is restored automatically with a "Resume?" prompt.
- Completing a level clears its save. Resetting a level clears its save.

### Shareability
On completing a level, the game generates a shareable text card:
```
ALIBI — The Speakeasy 🔍
Solved in 4m 32s
🟥🟥🟥🟥🟥🟥🟥🟥
Killer: Elias
alibi.pnz1990.com
```
A "Copy result" button copies this to the clipboard. No social API required.

### Difficulty Rating
Each level JSON includes a `difficulty` field: `"easy"` | `"medium"` | `"hard"`.
The level select screen shows this as a star rating (1–3 stars). Level order within the select is always by difficulty ascending.

---

## Code Standards

- TypeScript strict mode. `"strict": true` in tsconfig.
- No `any`. No type assertions without comment.
- Pure functions for all logic (grid.ts, logic.ts, clues.ts). Side effects only in render/ and input.ts.
- No external runtime dependencies beyond Vite dev tooling. Zero npm packages in the production bundle.
- Tests: Vitest, co-located `*.test.ts` files. All logic-layer functions must have unit tests.
- Every level JSON must pass the solver (constraint solver verifies unique solution) before merge.
- Copyright header on every source file: `// Copyright 2026 The alibi Authors. Apache-2.0.`
- ESLint with `@typescript-eslint/recommended` ruleset. `npm run lint` must exit 0 before merge.

## Coordinate System (all agents must know this)

- Grid: 9×9. x = column 0–8 (A–I, left to right). y = row 0–8 (row 1–9, top to bottom).
- **North = smaller y (up on screen). South = larger y (down on screen).**
- Chebyshev distance: `max(abs(dx), abs(dy))`. Used for `isFarFrom` and `isNorthOf`/`isSouthOf`.
- `isBeside` = Moore neighbourhood (8 surrounding cells, Chebyshev distance ≤ 1).

## Rule of One Conflict Behavior (UX decision)

When a player tries to place a suspect in a row or column already occupied by another suspect:
- **The placement is BLOCKED** — the radial menu does not appear, and no placement occurs.
- The cell flashes red for 500ms to indicate why it is blocked.
- This is a hard block, not a soft warning. Players must first clear the conflicting suspect.

## Win Condition — Clue Satisfaction Gate

- The "victim cell" (the single remaining unblocked empty cell) is **always highlighted** once all 8 suspects are placed.
- **If any clue is unsatisfied when the player clicks the victim cell**: the accusation screen does NOT trigger. Instead, unsatisfied clues in the sidebar flash red and a message reads "Something doesn't add up..." The player must fix the clue violations first.
- **Only when all clues are satisfied AND the player clicks the victim cell** does the body-reveal + GUILTY sequence play.

## Pixel Art — v1.0 Scope

- v1.0 uses **placeholder sprites only**: suspects rendered as colored 16×16 rectangles with their initial letter (A–H) in a pixel font. Victim rendered as a "?" sprite.
- Theme tile graphics (floor, wall, seat) are distinct flat colors per theme — no bitmapped artwork required for v1.0.
- Real pixel-art sprites are a post-v1.0 enhancement. QA must NOT block PRs for missing artwork.
- The `assets/sprites/` directory exists but may be empty at v1.0. The renderer falls back to placeholder rendering if a sprite file is absent.

## Banned Filenames

`utils.ts`, `helpers.ts`, `common.ts`, `misc.ts`

## Label Taxonomy

All issues must have labels from each of these groups:

| Group | Labels |
|---|---|
| Kind | `kind/enhancement`, `kind/bug`, `kind/chore`, `kind/docs` |
| Area | `area/engine`, `area/render`, `area/game`, `area/levels`, `area/ui`, `area/deploy` |
| Priority | `priority/critical`, `priority/high`, `priority/medium`, `priority/low` |
| Size | `size/xs`, `size/s`, `size/m`, `size/l`, `size/xl` |
| Type | `epic` |
| Workflow | `alibi` (PR_LABEL), `needs-human`, `blocked` |

## Anti-Patterns (QA blocks PRs containing these)

| Pattern | Caught by |
|---|---|
| Game logic inside render/ or input.ts | QA |
| Any `fetch()` or network call at runtime | QA |
| `any` type without justifying comment | QA |
| Level JSON with non-unique solution (solver must verify) | QA |
| Canvas state mutation outside `canvas.ts` | QA |
| External npm runtime dependency added to bundle | QA |
| Level JSON missing `narrative` field or with placeholder text ("TODO", "...") | QA |
| Level JSON missing `difficulty` field | QA |
| Sound implemented with audio files instead of Web Audio API synthesis | QA |
| Undo stack not wired to `Ctrl/Cmd+Z` keyboard shortcut | QA |
| Interactive element missing `data-testid` attribute | QA — blocks Playwright tests |
| Playwright test using pixel-coordinate `page.click('canvas', {position:{x,y}})` | QA — brittle, banned |
| PR body missing `browser_screenshot` evidence | QA |
| PR opened without running `npm run test:e2e` locally | QA |

## Files Agents Must Not Modify

- `docs/aide/vision.md`
- `docs/aide/roadmap.md`
- `AGENTS.md`
- `.specify/memory/constitution.md`
- `.specify/memory/sdlc.md`

---

## E2E Testing — MANDATORY

This is a browser game. Unit tests alone do not prove it works. **Every feature that affects the browser must be covered by a Playwright e2e test AND verified visually using the OpenCode browser extension before a PR is opened.**

### Two-tool approach

| Tool | When to use | What it proves |
|---|---|---|
| **Playwright** (`npm run test:e2e`) | CI-automated, runs on every PR | The game logic, DOM state, and interaction flow work correctly in a headless browser |
| **OpenCode browser extension** | During development, before pushing | The game actually looks correct — visuals, animations, timing, canvas rendering |

**Neither tool alone is sufficient.** Playwright cannot see the canvas pixel output. The browser extension cannot run in CI. Use both.

### Playwright setup

Playwright is installed as a dev dependency (`@playwright/test`). Browsers are installed with `npx playwright install chromium`.

```bash
npm run dev &            # start Vite dev server (required for e2e tests)
npm run test:e2e         # run all Playwright tests against http://localhost:5173
npx playwright test --headed  # run with visible browser (useful during development)
npx playwright test tests/e2e/level1.spec.ts  # run a single spec
```

`playwright.config.ts` targets `http://localhost:5173` (Vite dev server) for local runs and `https://pnz1990.github.io/alibi/` for the `--project=production` run.

### Playwright test contracts

Every e2e test must use **data-testid attributes** on DOM elements for selectors. The canvas alone is not sufficient — wrap interactive elements and status indicators in overlay HTML elements with `data-testid`. Required `data-testid` values:

| Element | `data-testid` |
|---|---|
| Canvas element | `game-canvas` |
| Radial menu container | `radial-menu` |
| Each suspect option in radial menu | `suspect-option-[A-H]` |
| Clear option in radial menu | `suspect-option-clear` |
| Each clue row in sidebar | `clue-[id]` (e.g. `clue-c1`) |
| Satisfied clue (has strikethrough) | add class `clue-satisfied` |
| Unsatisfied clue flashing | add class `clue-error` |
| Victim cell highlight overlay | `victim-cell` |
| GUILTY stamp element | `guilty-stamp` |
| Undo button | `btn-undo` |
| Redo button | `btn-redo` |
| Mute button | `btn-mute` |
| Share/copy button | `btn-share` |
| How-to-play button | `btn-help` |
| How-to-play modal | `overlay-howtoplay` |
| Level select screen | `level-select` |
| Level card (each) | `level-card-[id]` (e.g. `level-card-001`) |
| "Something doesn't add up" message | `msg-clue-gate` |
| Narrative intro screen | `narrative-intro` |
| Resume prompt | `prompt-resume` |

**Anti-pattern**: `page.click('canvas')` with pixel coordinates. This is brittle and unmaintainable. Use `data-testid` on overlay elements for all interaction.

### Playwright test pattern for a level playthrough

Each level has a known solution (from `docs/level-designs.md`). Tests use the solution directly:

```typescript
// tests/e2e/level1.spec.ts
import { test, expect } from '@playwright/test';
import level1 from '../../src/levels/001-speakeasy.json';

test('Level 1 — full playthrough reaches GUILTY screen', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="level-card-001"]');
  await page.click('[data-testid="narrative-intro"] button'); // dismiss intro

  // Place each suspect at solution position
  for (const [suspectId, pos] of Object.entries(level1.solution)) {
    if (suspectId === 'victim') continue;
    await page.click(`[data-testid="cell-${pos.x}-${pos.y}"]`);
    await page.click(`[data-testid="suspect-option-${suspectId}"]`);
  }

  // All clues should be satisfied
  for (const clue of level1.clues) {
    await expect(page.locator(`[data-testid="clue-${clue.id}"]`))
      .toHaveClass(/clue-satisfied/);
  }

  // Click victim cell
  await page.click(`[data-testid="victim-cell"]`);

  // GUILTY stamp must appear
  await expect(page.locator('[data-testid="guilty-stamp"]')).toBeVisible();
  await expect(page.locator('[data-testid="guilty-stamp"]')).toContainText('Elias');
});
```

Each cell must also have `data-testid="cell-{x}-{y}"` on its overlay element (not the canvas).

### Using the OpenCode browser extension during development

Before opening a PR, the engineer MUST use the browser extension to verify visually:

1. Start the dev server: `npm run dev`
2. Open `http://localhost:5173` in the browser connected to OpenCode
3. Use `browser_screenshot` to capture the current state
4. Use `browser_click` on `[data-testid]` selectors to interact
5. Use `browser_query` to read DOM state (clue satisfaction, game state)
6. Use `browser_console` to check for JS errors
7. Use `browser_errors` to verify zero JS errors after each interaction

**Minimum browser extension verification checklist before every PR:**

```
[ ] browser_screenshot after page load — grid renders, no blank canvas
[ ] browser_screenshot after placing suspect A — shadow visible on row + col
[ ] browser_screenshot after placing all 8 suspects — victim cell highlighted
[ ] browser_screenshot after clicking victim cell with unsatisfied clues — error state visible
[ ] browser_screenshot after correct solution + victim click — GUILTY stamp visible
[ ] browser_errors — zero JS errors throughout
[ ] browser_console — no warnings about missing assets or unhandled promises
```

The engineer must paste at least one `browser_screenshot` into the PR body as visual evidence.

### CI integration

`npm run test:e2e` runs in GitHub Actions on every PR using:
```yaml
- run: npm run build
- run: npm run dev &
- run: npx playwright install chromium --with-deps
- run: npm run test:e2e
```

The CI does NOT use the browser extension (that requires a desktop session). CI uses headless Playwright only.

### QA checklist additions (browser-specific)

QA must verify on every PR that touches rendering, input, or game state:
- [ ] All required `data-testid` attributes are present in the DOM
- [ ] Playwright e2e tests pass in CI (`npm run test:e2e` green)
- [ ] PR body contains at least one `browser_screenshot` showing the feature working
- [ ] `browser_errors` output in PR body shows zero JS errors
