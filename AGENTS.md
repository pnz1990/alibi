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
LINT_COMMAND:   npm run lint
VULN_COMMAND:   ""
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
    solver.ts         # Optional: constraint solver to verify level solvability
  render/
    canvas.ts         # Canvas renderer: grid, sprites, shadows, UI overlays
    sprites.ts        # Sprite sheet loader and tile blit
    ui.ts             # Sidebar case file, clue strikethrough, radial menus
  game/
    state.ts          # Game state machine: idle → placing → solved → reveal → accusation
    input.ts          # Click/tap event handling → radial menu → placement
    levels.ts         # Level loader from JSON
  levels/             # Level JSON files (one per theme)
    001-speakeasy.json
    002-luxury-liner.json
    003-art-gallery.json
    004-greenhouse.json
  assets/
    sprites/          # Pixel-art sprite sheets (PNG)
    fonts/            # Pixel font (bitmap)
  main.ts             # Entry point
index.html
vite.config.ts
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

## Files Agents Must Not Modify

- `docs/aide/vision.md`
- `docs/aide/roadmap.md`
- `AGENTS.md`
- `.specify/memory/constitution.md`
- `.specify/memory/sdlc.md`
