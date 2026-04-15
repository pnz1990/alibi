# alibi — Project Agent Context

## What This Is

ALIBI is a browser murder mystery logic-deduction game with three play modes: Campaign (12 escalating cases per run), Quick Play (pick theme + difficulty), and Daily Case (same puzzle worldwide each day). Procedurally generated from seeds. 10 themes. 3 difficulty variants per theme. Progress stored in localStorage. Statically hosted on GitHub Pages.

Inspired by the book Murdoku by Manuel Garand. Read `docs/aide/vision.md` before starting any implementation work.

**Status**: v1.0.0 shipped. Active post-v1.0 work: visual overhaul (#41), alphabetical names (#42), cell annotations (#43).

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
TEST_COMMAND:   npm test && npm run test:e2e
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
  suspectNames: SuspectName[];    // ≥ 12 names, MUST be ordered A→B→C…: index 0 starts with A, index 1 with B, etc.
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

## Clue Template Format

Every theme module exports a `ClueTemplates` object with natural-language string templates for each clue type. Templates use `{{mustache}}` variables. The generator fills these in after computing the solution.

```typescript
interface ClueTemplates {
  inRoom:              (suspectName: string, roomName: string) => string;
  notInRoom:           (suspectName: string, roomName: string) => string;
  inSameRoom:          (suspectName: string, otherName: string) => string;
  inDifferentRoom:     (suspectName: string, otherName: string) => string;
  inColumn:            (suspectName: string, colNumber: number) => string;  // colNumber is 1-indexed
  inRow:               (suspectName: string, rowNumber: number) => string;  // rowNumber is 1-indexed
  besideSuspect:       (suspectName: string, otherName: string) => string;
  notBesideSuspect:    (suspectName: string, otherName: string) => string;
  besideObject:        (suspectName: string, objectName: string) => string;  // objectName = landmark.name
  notBesideObject:     (suspectName: string, objectName: string) => string;
  onSeatTile:          (suspectName: string, tileName: string) => string;   // tileName: "chair"|"sofa"|"bed"
  notOnSeatTile:       (suspectName: string) => string;
  northOf:             (suspectName: string, otherName: string) => string;
  southOf:             (suspectName: string, otherName: string) => string;
  exactlyNRowsNorth:   (suspectName: string, otherName: string, n: number) => string;
  exactlyNRowsSouth:   (suspectName: string, otherName: string, n: number) => string;
}
```

### Example templates (Coffee Shop flavor)

```typescript
export const coffeeShopClueTemplates: ClueTemplates = {
  inRoom:           (s, r) => `${s} was in the ${r}.`,
  notInRoom:        (s, r) => `${s} was not in the ${r}.`,
  inSameRoom:       (s, o) => `${s} was in the same area as ${o}.`,
  inDifferentRoom:  (s, o) => `${s} and ${o} were in different parts of the café.`,
  inColumn:         (s, c) => `${s} was in the ${ordinal(c)} column.`,
  inRow:            (s, r) => `${s} was in the ${ordinal(r)} row.`,
  besideSuspect:    (s, o) => `${s} was standing next to ${o}.`,
  notBesideSuspect: (s, o) => `${s} was not beside ${o}.`,
  besideObject:     (s, obj) => `${s} was beside ${obj}.`,
  notBesideObject:  (s, obj) => `${s} was not beside ${obj}.`,
  onSeatTile:       (s, t) => t === "chair" ? `${s} was sitting in a chair.`
                             : t === "sofa"  ? `${s} was on the sofa.`
                             :                `${s} was on the ${t}.`,
  notOnSeatTile:    (s) => `${s} was not sitting down.`,
  northOf:          (s, o) => `${s} was north of ${o}.`,
  southOf:          (s, o) => `${s} was south of ${o}.`,
  exactlyNRowsNorth:(s, o, n) => `${s} was exactly ${n} row${n>1?"s":""} north of ${o}.`,
  exactlyNRowsSouth:(s, o, n) => `${s} was exactly ${n} row${n>1?"s":""} south of ${o}.`,
};
```

Each theme provides its own flavor-appropriate templates. The Gym uses athletic language. The Hospital uses clinical language. The Carnival uses theatrical language. This is how the game feels different in each setting even though the mechanic is the same.

---

## Clue Variety Constraint Algorithm

The generator MUST follow this algorithm for clue selection (step 12 in the Generator Algorithm):

```typescript
function selectClueTypes(
  N: number,
  difficulty: Difficulty,
  floorPlan: FloorPlan,
): ClueType[] {
  const allowed = ALLOWED_CLUE_TYPES[difficulty]; // per AGENTS.md §Difficulty table
  const hasObjects = floorPlan.landmarks.length >= 2;
  const hasSeatTiles = floorPlan tiles contain any "chair"|"sofa"|"bed";

  // Filter allowed types by what the floor plan supports
  const available = allowed.filter(type => {
    if (type.includes("Object") && !hasObjects) return false;
    if (type.includes("SeatTile") && !hasSeatTiles) return false;
    return true;
  });

  // Select one type per suspect, enforcing variety:
  const selected: ClueType[] = [];
  for (let i = 0; i < N; i++) {
    // Never use the same type more than Math.ceil(N * 0.4) times total
    // Never use the same type for two consecutive suspects
    const forbidden = new Set<ClueType>();
    if (selected.length > 0) forbidden.add(selected[selected.length - 1]);
    for (const type of available) {
      const usageCount = selected.filter(t => t === type).length;
      if (usageCount >= Math.ceil(N * 0.4)) forbidden.add(type);
    }
    const candidates = available.filter(t => !forbidden.has(t));
    // PRNG-pick from candidates; prefer types not yet used
    const unused = candidates.filter(t => !selected.includes(t));
    const pool = unused.length > 0 ? unused : candidates;
    selected.push(prngPick(pool));
  }
  return selected;
}
```

This guarantees: no clue type dominates (≤40% of clues), no two consecutive clues of the same type, and at least one adjacency/position clue per puzzle on Medium+.

---

## Sprite Catalog

All SVG sprites are bundled via Vite `?raw` imports from `src/assets/sprites/`.
Each file is a clean flat-vector SVG with `viewBox="0 0 32 32"`.

### Required sprites (global, used across themes)

| File | Object type | Used in themes |
|---|---|---|
| `chair.svg` | chair (seat tile) | All |
| `sofa.svg` | sofa (seat tile) | Backyard, Restaurant, Hospital |
| `bed.svg` | bed (seat tile) | Backyard, Hospital |
| `plant.svg` | object:plant | Coffee Shop, Backyard, Restaurant, Office, Garden Party |
| `table.svg` | object:table | Bookstore, Restaurant, Gym, Office |
| `shelf.svg` | object:shelf | Bookstore, Holiday Mall |
| `cash-register.svg` | object:cash-register | Coffee Shop, Bookstore, Restaurant, Holiday Mall |
| `bar-counter.svg` | object:bar-counter | Coffee Shop, Restaurant |
| `counter.svg` | object:counter | Restaurant, Gym |
| `desk.svg` | object:desk | Office |
| `photocopier.svg` | object:photocopier | Office |
| `tv.svg` | object:tv | Backyard, Office |
| `flower-bed.svg` | object:flower-bed | Garden Party |
| `jacuzzi-tile.svg` | object:jacuzzi-tile | Backyard, Gym |
| `hospital-bed.svg` | object:hospital-bed | Hospital |
| `medicine-cabinet.svg` | object:medicine-cabinet | Hospital |
| `weight-rack.svg` | object:weight-rack | Gym |
| `treadmill.svg` | object:treadmill | Gym |
| `shelf-books.svg` | object:shelf (bookstore variant) | Bookstore |
| `stall.svg` | object:stall | Holiday Mall, Carnival |
| `teddy-bear.svg` | object:teddy-bear | Holiday Mall |
| `tree.svg` | object:tree | Holiday Mall |
| `carousel-horse.svg` | object:carousel-horse | Carnival |

### Fallback rendering

If a sprite SVG file is absent or fails to load, the renderer draws a labeled colored rectangle:
- Width/height: one grid cell
- Background: `#c8a96e` (warm beige)
- Text: the object type name, truncated to 4 chars, in 8px pixel font, white

**QA does NOT block PRs for missing sprite files.** Placeholder fallback is acceptable for v1.0. Real sprites are a quality enhancement.

---

## Product Validation Scenarios (PM Phase — every 3 cycles)

The PM agent opens the live game at `https://pnz1990.github.io/alibi/` using the browser extension and validates all three modes. This is mandatory, not optional. If the game is not yet deployed, use `http://localhost:5173`.

```bash
# Build and serve locally if not deployed
npm run build && npx serve dist -p 5173 &
```

### Scenario 1: Quick Play works

```
browser_navigate("https://pnz1990.github.io/alibi/")
browser_screenshot()                           → home screen visible, 3 mode buttons
browser_click('[data-testid="btn-quickplay"]')
browser_click('[data-testid="theme-card-coffee-shop"]')
browser_click('[data-testid="difficulty-easy"]')
browser_screenshot()                           → Coffee Shop puzzle loaded
browser_errors()                               → zero errors
```

Pass: home screen loads, Quick Play navigates to puzzle without errors.

### Scenario 2: Full playthrough — Coffee Shop Easy

```
# Using seed=42 for determinism in PM validation
browser_navigate("https://pnz1990.github.io/alibi/?theme=coffee-shop&difficulty=easy&seed=42")
# Dismiss narrative intro
browser_click('[data-testid="narrative-intro"] button')
# Read window.__alibi_puzzle.solution (only available in dev builds — skip in prod)
# Place suspects manually using clue cards as guidance
# [place all suspects]
browser_click('[data-testid="victim-cell"]')
browser_screenshot()                           → GUILTY stamp visible
browser_errors()                               → zero
```

Pass: GUILTY screen reached, correct killer named, zero errors.

### Scenario 3: Campaign creates 12 cases

```
browser_click('[data-testid="btn-campaign"]')
browser_screenshot()                           → campaign screen or slot picker
# Start new campaign
browser_query('[data-testid^="case-card-"]', mode="count")  → should equal 12
browser_query('[data-testid="case-status-0"]', property="className") → should NOT contain "locked"
browser_query('[data-testid="case-status-1"]', property="className") → should contain "locked"
browser_screenshot()                           → 12 case cards, case 1 unlocked
```

Pass: 12 case cards visible, only first unlocked.

### Scenario 4: Daily Case loads

```
browser_click('[data-testid="btn-daily"]')
browser_screenshot()                           → daily puzzle loaded with date in title
browser_errors()                               → zero
```

Pass: daily puzzle loads, no errors.

### Scenario 5: All 10 themes load without errors

```
for each theme in [coffee-shop, bookstore, backyard, holiday-mall, restaurant,
                   gym, office, garden-party, hospital, carnival]:
  browser_navigate(f"https://pnz1990.github.io/alibi/?theme={theme}&difficulty=easy&seed=1")
  browser_screenshot()   → puzzle grid renders
  browser_errors()       → zero
```

Pass: all 10 themes load without JS errors. Report any that fail with screenshot and error log.

### PM must open GitHub issue for any scenario failure

- Label: `kind/bug`, `priority/critical`, `area/game`
- Title: "PM validation failure: [scenario name] — [brief symptom]"
- Body: screenshot + browser_errors output

---

`src/engine/generator.ts` takes `(seed, theme, difficulty)` → `Puzzle`.

```
1. Initialize seeded PRNG (mulberry32).
2. Load floorPlan = theme.floorPlans[difficulty].
3. Derive validCols: columns 0..W-1 with ≥1 placeable cell (floor/chair/sofa/bed).
4. Derive validRows: rows 0..H-1 with ≥1 placeable cell.
5. N = min(validCols.length, validRows.length).
6. Select N suspect names from theme.suspectNames by **index** (not random): suspect 0 = suspectNames[0] (A-name), suspect 1 = suspectNames[1] (B-name), … This guarantees alphabetical initials on the grid.
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
| Cell X annotation | `cell-annotation-x-{x}-{y}` |
| Cell ? candidates container | `cell-annotation-candidates-{x}-{y}` |
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
| suspectNames array not alphabetically ordered (index 0 ≠ A-name) | QA |
| Suspect name selected by PRNG instead of by index | QA |
| Cell annotation state stored outside PuzzleState.annotations | QA |

---

## Banned Filenames

`utils.ts`, `helpers.ts`, `common.ts`, `misc.ts`

---

## Label Taxonomy

| Group | Labels |
|---|---|
| Kind | `kind/enhancement`, `kind/bug`, `kind/chore`, `kind/docs`, `kind/accessibility` |
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
- `src/themes/floor-plans.ts` — all 30 hand-authored floor plan definitions. These are fixed product assets. Any change requires `[NEEDS HUMAN]` escalation.
