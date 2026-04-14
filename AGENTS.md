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

---

## Code Standards

- TypeScript strict mode. `"strict": true` in tsconfig.
- No `any`. No type assertions without comment.
- Pure functions for all logic (grid.ts, logic.ts, clues.ts). Side effects only in render/ and input.ts.
- No external runtime dependencies beyond Vite dev tooling. Zero npm packages in the production bundle.
- Tests: Vitest, co-located `*.test.ts` files. All logic-layer functions must have unit tests.
- Every level JSON must pass the solver (constraint solver verifies unique solution) before merge.

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

## Files Agents Must Not Modify

- `docs/aide/vision.md`
- `docs/aide/roadmap.md`
- `AGENTS.md`
- `.specify/memory/constitution.md`
- `.specify/memory/sdlc.md`
