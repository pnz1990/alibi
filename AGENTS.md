# alibi — Project Agent Context

## What This Is

ALIBI is a browser murder mystery logic-deduction game with three play modes: Campaign (12 escalating cases per run), Quick Play (pick theme + difficulty), and Daily Case (same puzzle worldwide each day). Procedurally generated from seeds. 10 themes. 3 difficulty variants per theme. Progress stored in localStorage. Statically hosted on GitHub Pages.

Inspired by the book Murdoku by Manuel Garand. Read `docs/aide/vision.md` before starting any implementation work.

**Status**: Pre-release. Architecture and product design complete. Implementation not started.

---

## SDLC Process

The team process lives in `.specify/memory/sdlc.md` — read it.

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
export AGENT_ID="COORDINATOR"
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

**Frontend-only SPA.** No server, no database, no runtime API calls. Everything runs in the browser. localStorage is the only persistence layer.

**Stack**: TypeScript + Vite. HTML5 Canvas 2D for the game grid and sprites. DOM + CSS for UI chrome (sidebar, modals, home screen). Seed in URL hash.

**Core pipeline:**
```
Seed + Theme + Difficulty
  → FloorPlan (static per theme+difficulty variant)
    → Generator (place suspects, generate clues, verify uniqueness)
      → Puzzle (grid, suspects, clues, solution, killer)
        → Renderer (canvas grid + DOM overlays)
          → Input (click → placement)
            → Logic validation
              → Win sequence
```

**Grid**: Variable W×H per theme+difficulty variant. North = smaller y. South = larger y. Rule of One spans the entire bounding rectangle.

---

## Package Layout

```
src/
  engine/
    grid.ts           # Grid model: tile types, zones, placement validation
    logic.ts          # Rule of One, spatial mask, win condition
    clues.ts          # All 14 clue type evaluators — pure functions
    generator.ts      # Seeded PRNG procedural generator
    solver.ts         # Constraint solver — verifies unique solution count
  render/
    canvas.ts         # Canvas renderer: tiles, sprites, shadows
    sprites.ts        # SVG sprite loader (Vite ?raw bundling)
    portraits.ts      # Portrait card renderer
    ui.ts             # Sidebar: clue cards with live strikethrough
    overlay.ts        # Modals: how-to-play, narrative, share card, GUILTY
  game/
    state.ts          # State machine: home → mode-select → playing → guilty → end
    input.ts          # Click → radial menu → placement; keyboard nav
    undo.ts           # Undo/redo stack (max 50)
    sound.ts          # Web Audio API synthesis — no audio files
    share.ts          # Completion card generator + clipboard copy
  modes/
    campaign.ts       # Campaign mode: 12-case sequence, seed generation, rank
    quickplay.ts      # Quick Play mode: random seed per play
    daily.ts          # Daily Case: seed = date string hash
  storage/
    progress.ts       # localStorage read/write for all persistence
    schema.ts         # TypeScript types for all stored data
  screens/
    home.ts           # Home screen: Campaign / Quick Play / Daily Case
    campaign-board.ts # Campaign case file board (12 case cards)
    theme-select.ts   # Theme + difficulty picker for Quick Play
    game.ts           # The actual puzzle screen
  themes/
    coffee-shop.ts
    bookstore.ts
    backyard.ts
    holiday-mall.ts
    restaurant.ts
    gym.ts
    office.ts
    garden-party.ts
    hospital.ts
    carnival.ts
    index.ts          # Theme registry
  assets/
    sprites/          # SVG furniture icons (bundled)
    portraits/        # SVG suspect portraits (bundled)
  main.ts
tests/
  unit/               # Vitest unit tests (co-located *.test.ts or here)
  e2e/
    smoke.spec.ts
    gameplay.spec.ts
    campaign.spec.ts
    daily.spec.ts
    undo.spec.ts
    save.spec.ts
    share.spec.ts
    generator.spec.ts
index.html
vite.config.ts
playwright.config.ts
tsconfig.json
package.json
```

---

## Game Mechanics Reference

### Grid

The grid is **variable W×H per theme+difficulty variant**. Each theme has 3 floor plan variants (Easy/Medium/Hard). A variant defines:

- `width` W (4–10), `height` H (4–10). Not necessarily square or equal.
- `tiles[y][x]` — 2D array of tile types covering the full bounding rectangle.
- `rooms` — array of `RoomDefinition`, each a **named list of cells**. Rooms can be any shape: L, corridor, irregular polygon, single cell. No rectangle constraint.
- `landmarks` — named furniture objects at fixed positions, used as clue targets.

**Tile types:**
- `floor` — walkable, placeable by suspects
- `wall` — impassable, unplaceable (cell outside any room, or interior wall)
- `chair` / `sofa` / `bed` — seat tile, placeable
- `object:<type>` — furniture object (e.g. `"object:plant"`, `"object:shelf"`) — NOT placeable, usable as clue landmark

**Coordinate system:**
- x = column index 0..W-1 (column 1..W in clue text)
- y = row index 0..H-1 (row 1..H in clue text)
- North = smaller y (up). South = larger y (down).

**Rule of One**: one suspect per row, one per column across the **entire W×H bounding rectangle** regardless of room boundaries. Placing a suspect blocks that full row and full column.

**Suspect count N** = number of valid columns (columns with ≥1 placeable cell). Typically: Easy N=5, Medium N=6, Hard N=7–8.

**Victim cell**: the single remaining placeable (floor/seat) cell not in any suspect's row or column after all N suspects are placed.

**Killer**: the suspect whose placed cell shares a Room Zone with the victim cell.

### The 14 Clue Types

All evaluators are pure functions in `src/engine/clues.ts`. Natural-language templates live in each theme module.

| ID | Example text | Condition |
|----|---|---|
| `inRoom` | "She was in the Bar." | suspect.room == roomId |
| `notInRoom` | "He was not in the Kitchen." | suspect.room != roomId |
| `inSameRoom` | "She was with Alan." | A.room == B.room |
| `inDifferentRoom` | "They were in different rooms." | A.room != B.room |
| `inColumn` | "He was in the third column." | suspect.x == col-1 |
| `inRow` | "She was in the second row." | suspect.y == row-1 |
| `besideSuspect` | "She was beside Finlay." | chebyshev(A,B) <= 1 |
| `notBesideSuspect` | "He was not beside Ellie." | chebyshev(A,B) > 1 |
| `besideObject` | "He was beside a table." | any object:table cell within chebyshev 1 |
| `notBesideObject` | "She was not beside a plant." | no object:plant cell within chebyshev 1 |
| `onSeatTile` | "She was sitting in a chair." | suspect.tile in [chair, sofa, bed] |
| `notOnSeatTile` | "He was not sitting down." | suspect.tile == floor |
| `northOf` | "He was north of Chloe." | A.y < B.y (any row above, not exact) |
| `southOf` | "He was south of Aria." | A.y > B.y (any row below, not exact) |
| `exactlyNRowsNorth` | "He was exactly one row north of Gemma." | B.y - A.y == n |
| `exactlyNRowsSouth` | "She was exactly two rows south of Alan." | A.y - B.y == n |

Note: `northOf`/`southOf` without "exactly" = any row above/below (matching the Murdoku book's definition). With "exactly" = precise offset.

### Difficulty and Clue Complexity

| Difficulty | Grid approx | Suspects | Clues | Allowed clue types |
|---|---|---|---|---|
| Easy | 4×5 to 5×5 | 4–5 | 5–6 | inRoom, notInRoom, inColumn, inRow, inSameRoom, inDifferentRoom |
| Medium | 6×6 to 6×7 | 6 | 6–8 | + besideSuspect, notBesideSuspect, besideObject, notBesideObject, onSeatTile |
| Hard | 7×7 to 8×8 | 7–8 | 8–10 | All 16 clue types including northOf/southOf and exactlyN variants |

### Win Sequence

1. All N suspects placed satisfying all clues → all clues show strikethrough.
2. Victim cell highlighted (the single remaining valid cell).
3. Player clicks victim cell.
4. If any clue unsatisfied: unsatisfied clues flash red, message "Something doesn't add up…" — no GUILTY.
5. If all clues satisfied: victim narrative text shown → victim sprite appears → GUILTY stamp slams in with killer name.
6. Share card generated. Campaign progress updated (if in campaign).

---

## The Three Play Modes

### Campaign Mode

A campaign = 12 sequentially generated cases across all 10 themes, escalating in difficulty.

**Campaign structure:**
- Cases 1–4: Easy difficulty, 4 different themes (PRNG-selected from pool)
- Cases 5–8: Medium difficulty, 4 different themes
- Cases 9–12: Hard difficulty, 4 different themes
- Each campaign has a `campaignSeed` (random 32-bit int). All 12 case seeds are derived deterministically from `campaignSeed + caseIndex`. Same campaign seed = same 12 cases forever.
- Up to 3 campaign save slots. Each stores: campaignSeed, current case index, completed case array (time, killer, seed), detective rank.

**Campaign board screen:**
- 12 case cards arranged as a timeline/case file. Each card shows: case number, theme name, difficulty badge, status (locked 🔒 / current 📁 / solved ✅), solve time if completed.
- Current case is always unlocked. Solved cases are viewable (replay). Future cases locked.

**Detective Ranks:**
| Rank | Condition |
|---|---|
| 🔍 Rookie | Start |
| 🔎 Investigator | Cases 1–4 complete |
| 🕵 Detective | Cases 1–8 complete |
| 🕵️ Senior Detective | Full campaign (1–12) complete |
| ⭐ Chief Inspector | 3 full campaigns complete |

### Quick Play Mode

Pick theme + difficulty → generate puzzle from random seed → play. Seed in URL hash for sharing. Completion updates stats (total solved, best time per theme+difficulty) but not campaign rank.

### Daily Case

Seed = `djb2hash(YYYY-MM-DD)`. Theme and difficulty rotate on a fixed 30-day schedule (covers all 10 themes at each difficulty level). Same puzzle for every player on a given day.

- Streak counter: consecutive days solved (localStorage).
- "Daily Case" card always on home screen, shows today's theme and difficulty.
- After solving: shareable text card with date, theme, difficulty, time, streak.

---

## localStorage Schema

All keys are prefixed `alibi_`. See `src/storage/schema.ts` for TypeScript types.

```
alibi_campaign_1        CampaignSave  (slot 1 of 3)
alibi_campaign_2        CampaignSave
alibi_campaign_3        CampaignSave
alibi_daily_<YYYY-MM-DD>  DailySave  (solved status, time)
alibi_streak            number       (consecutive daily streak)
alibi_stats             PlayerStats  (total solved, best times)
alibi_prefs             PlayerPrefs  (mute, howtoplay_seen)
alibi_puzzle_state      PuzzleState  (in-progress placement, keyed by seed+theme+difficulty)
```

`CampaignSave`:
```typescript
{
  campaignSeed: number;
  slot: 1 | 2 | 3;
  currentCase: number;          // 0-11
  startedAt: string;            // ISO date
  cases: Array<{
    seed: number;
    themeId: string;
    difficulty: 'easy'|'medium'|'hard';
    status: 'locked'|'in_progress'|'solved';
    solveTimeMs?: number;
    killerName?: string;
  }>;
  rank: 'rookie'|'investigator'|'detective'|'senior'|'chief';
}
```

`PuzzleState` (in-progress save, keyed by `seed-themeId-difficulty`):
```typescript
{
  placements: Record<string, {x: number, y: number}>;  // suspectId → cell
  elapsedMs: number;
  savedAt: string;
}
```

---

## Theme Module Interface

```typescript
interface Theme {
  id: string;
  name: string;
  floorPlans: {
    easy: FloorPlan;
    medium: FloorPlan;
    hard: FloorPlan;
  };
  suspectNames: SuspectName[];    // ≥ 12 names
  victimNames: string[];          // start with V, ≥ 6 names
  clueTemplates: ClueTemplates;   // natural-language string templates per clue type
  narrativeTemplates: {
    intro: string[];              // 3+ variants (PRNG-chosen)
    victimFound: string[];
    guiltyText: string[];         // "{{killerName}} — {{evidenceText}}"
  };
  colorPalette: ThemePalette;     // floor, wall, zone colors, accent
  spriteMap: Record<string, string>; // objectType → SVG path
  portraitSet: string;            // portrait SVG folder name
}

interface FloorPlan {
  width: number;          // W: columns (4–10)
  height: number;         // H: rows (4–10)
  tiles: (string|null)[][];  // [y][x]: "floor"|"wall"|"chair"|"sofa"|"bed"|"object:<type>"|null(=wall)
  rooms: RoomDefinition[];
  landmarks: LandmarkDefinition[];  // named objects for clue text
}

interface RoomDefinition {
  id: string;
  name: string;           // used verbatim in clue text and GUILTY screen
  cells: {x: number, y: number}[];  // ALL cells in this room — any shape
}
```

---

## Generator Algorithm

`src/engine/generator.ts` takes `(seed, theme, difficulty)` → `Puzzle`.

```
1. Initialize seeded PRNG (mulberry32).
2. Load floorPlan = theme.floorPlans[difficulty].
3. Derive validCols: columns 0..W-1 with ≥1 placeable cell (floor/chair/sofa/bed).
4. Derive validRows: rows 0..H-1 with ≥1 placeable cell.
5. N = min(validCols.length, validRows.length).
6. PRNG-select N suspect names from theme.suspectNames.
7. PRNG-select 1 victim name from theme.victimNames.
8. Place suspects: assign each of N suspects to a unique validRow AND unique validCol
   at a placeable cell within that (row,col) intersection.
   Use PRNG ordering + backtracking. Max 1000 backtracks before retry.
9. Derive victim cell: single placeable cell with no suspect in its row or column.
10. Derive killer: suspect whose placed cell shares a room with victim cell.
11. PRNG-select narrative variants (intro, victimFound, guiltyText).
12. Generate clues:
    a. For each suspect, generate 1 primary clue using a difficulty-appropriate type.
    b. Maximize variety: avoid repeating same clue type for consecutive suspects.
    c. Prefer clues that reference the floor plan's specific objects and rooms.
13. Run solver. If solution count != 1: add extra clue, re-run solver. Repeat up to 5×.
14. If still not unique after 5 extra clues: full retry with seed+attempt offset.
    Max 20 full retries. Throw PuzzleGenerationError on total failure.
15. Return Puzzle object.
```

### Solver

`src/engine/solver.ts` takes `(floorPlan, suspects, clues)` → `number` (solution count).

Uses constraint propagation + backtracking. Returns early at count=2 (only needs to know if unique). Must solve any valid puzzle in <100ms.

### window.__alibi_puzzle

In DEV and TEST builds, set `window.__alibi_puzzle = puzzle` after generation. Playwright tests read `solution`, `killer`, `clues` from this. Never set in production builds.

---

## E2E Testing — MANDATORY

Every PR touching render/game/modes/storage must be verified with BOTH:
1. **Playwright** (`npm run test:e2e`) — headless, runs in CI
2. **OpenCode browser extension** — visual screenshots required in PR body

### Required data-testid attributes

| Element | data-testid |
|---|---|
| Canvas | `game-canvas` |
| Home screen | `screen-home` |
| Campaign button | `btn-campaign` |
| Quick Play button | `btn-quickplay` |
| Daily Case button | `btn-daily` |
| Campaign board | `screen-campaign-board` |
| Case card (each) | `case-card-{0..11}` |
| Case card status | `case-status-{0..11}` |
| Theme selector | `screen-theme-select` |
| Each theme card | `theme-card-{themeId}` |
| Difficulty Easy | `difficulty-easy` |
| Difficulty Medium | `difficulty-medium` |
| Difficulty Hard | `difficulty-hard` |
| Game screen | `screen-game` |
| Grid cell | `cell-{x}-{y}` |
| Radial menu | `radial-menu` |
| Suspect option | `suspect-option-{id}` |
| Clear option | `suspect-option-clear` |
| Clue card | `clue-{i}` |
| Satisfied clue | class `clue-satisfied` |
| Error clue | class `clue-error` |
| Victim cell highlight | `victim-cell` |
| GUILTY stamp | `guilty-stamp` |
| Killer name on GUILTY | `guilty-killer-name` |
| Clue gate message | `msg-clue-gate` |
| Narrative intro | `narrative-intro` |
| Undo button | `btn-undo` |
| Redo button | `btn-redo` |
| Mute button | `btn-mute` |
| Share button | `btn-share` |
| Help button | `btn-help` |
| How-to-play modal | `overlay-howtoplay` |
| Resume prompt | `prompt-resume` |
| Daily streak display | `daily-streak` |

### Browser extension checklist (before every PR on render/game/modes/storage)

```
[ ] browser_navigate("http://localhost:5173")
[ ] browser_screenshot() → home screen with 3 mode buttons visible
[ ] navigate to a puzzle → browser_screenshot() → grid renders correctly
[ ] place first suspect → browser_screenshot() → row/col shadow visible
[ ] all suspects placed → browser_screenshot() → victim cell highlighted, clues struck through
[ ] click victim with wrong solution → browser_screenshot() → clue-gate error state
[ ] correct solution + victim click → browser_screenshot() → GUILTY stamp visible
[ ] browser_errors() → zero JS errors
```

### Anti-patterns (QA blocks PRs containing these)

| Pattern | Caught by |
|---|---|
| Engine logic in render/ game/ modes/ storage/ | QA |
| Any runtime fetch() | QA |
| `any` type without comment | QA |
| Puzzle with != 1 solution reaching player | QA |
| data-testid missing on interactive/observable element | QA |
| page.click('canvas', {position:…}) in Playwright | QA — banned |
| PR body missing browser_screenshot (render/game PRs) | QA |
| window.__alibi_puzzle missing in DEV/TEST build | QA |
| Runtime npm package in src/ | QA |
| Hardcoded solution, seed, or theme in engine code | QA |
| localStorage write outside src/storage/progress.ts | QA |
| Campaign seed derivation logic outside src/modes/campaign.ts | QA |

---

## Banned Filenames

`utils.ts`, `helpers.ts`, `common.ts`, `misc.ts`

---

## Label Taxonomy

| Group | Labels |
|---|---|
| Kind | `kind/enhancement`, `kind/bug`, `kind/chore`, `kind/docs`, `kind/security` |
| Area | `area/engine`, `area/generator`, `area/render`, `area/game`, `area/themes`, `area/ui`, `area/campaign`, `area/storage`, `area/deploy` |
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
