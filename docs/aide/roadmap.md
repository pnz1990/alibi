# alibi: Development Roadmap

> Based on: docs/aide/vision.md

---

## Current Gate: Stage 0 must ship before any level content

The game skeleton (canvas, grid, logic engine, CI, GitHub Pages deploy) must exist and be deployable before level content is authored. Authoring levels against a broken engine wastes effort.

---

## Stage 0: Project Skeleton & Toolchain

**Goal:** Working Vite + TypeScript project that renders an empty 9×9 grid on canvas, deployed to GitHub Pages via CI.

### Deliverables
- `package.json` with Vite + TypeScript + Vitest configured
- `index.html` + `src/main.ts` entry point
- Canvas renderer draws a 9×9 grid at 2× pixel scale
- GitHub Actions CI: `npm run build` + `npm test` on every PR
- GitHub Pages deploy workflow (`gh-pages` branch on merge to main)
- Vitest configured, at least one passing smoke test

### Dependencies
None

---

## Stage 1: Core Logic Engine

**Goal:** The three-layer logic engine (Rule of One, Spatial Mask, Testimony) is fully implemented and unit-tested, independent of rendering.

### Deliverables
- `src/engine/grid.ts` — 9×9 grid model with tile types (Floor/Solid/Seat) and room zones
- `src/engine/logic.ts` — Rule of One validator, Spatial Mask filter, win condition detector (single remaining valid cell)
- `src/engine/clues.ts` — All 5 clue type evaluators: `isBeside`, `isInRoom`, `isInSameRow`, `isFarFrom`, `isNorthOf`
- `src/engine/solver.ts` — Constraint solver that verifies a level JSON has exactly one solution
- Full Vitest coverage on all engine functions (>90% line coverage)
- Level JSON schema documented in `docs/level-format.md`

### Dependencies
Stage 0

---

## Stage 2: Rendering & Input

**Goal:** The game is visually complete for a single level. Player can place suspects, see shadows, see clue strikethroughs, and trigger the win sequence.

### Deliverables
- `src/render/canvas.ts` — Tile grid renderer with Floor/Solid/Seat visual distinction
- `src/render/sprites.ts` — Sprite sheet loader; suspect tokens A–H and victim sprite rendered as pixel art placeholders (colored squares with initials acceptable at this stage)
- `src/render/ui.ts` — Sidebar case file: suspect list, alibi text, strikethrough on satisfied clues
- `src/game/input.ts` — Click-to-place radial menu (8 suspects + clear option)
- Shadow effect: placing a suspect draws semi-transparent overlay over entire row + column
- Win sequence: body reveal → accusation → "GUILTY" stamp animation
- `src/game/state.ts` — State machine: `idle → placing → solved → reveal → accusation → end`

### Dependencies
Stage 1

---

## Stage 3: Level 1 — The Speakeasy

**Goal:** First complete, fully playable level with real pixel-art assets and a verified unique-solution clue set.

### Deliverables
- `src/levels/001-speakeasy.json` — complete level definition: 9×9 tile map, 6 room zones, 8 suspects, victim, 6 clues
- Level passes constraint solver (unique solution verified)
- Pixel-art sprite sheet for Speakeasy theme (dark wood, brass, velvet booths)
- Suspect token sprites (A–H pixel portraits, 8×8 or 16×16)
- Victim sprite (V)
- Level passes all 5 definition-of-done journeys manually

### Dependencies
Stage 2

---

## Stage 4: Levels 2–4 (Remaining Themes)

**Goal:** Four complete levels, one per theme. Full game is playable start to finish.

### Deliverables
- `src/levels/002-luxury-liner.json` — Teak decking, lifeboats, porthole views
- `src/levels/003-art-gallery.json` — White tiles, marble pedestals, velvet ropes
- `src/levels/004-greenhouse.json` — Cobblestone paths, ferns, glass partitions
- Sprite sheets for each theme
- Each level passes constraint solver
- Level select screen

### Dependencies
Stage 3

---

## Stage 5: Polish & v1.0 Release

**Goal:** v1.0 shipped to `https://pnz1990.github.io/alibi/`. Game is self-explanatory to new players.

### Deliverables
- Pixel font for all UI text
- "How to play" overlay (first launch only)
- Mobile-responsive layout (playable on phone, landscape orientation)
- `<3s` load time (Lighthouse performance ≥ 80)
- GitHub release `v1.0.0` with changelog
- `README.md` with screenshot and play link

### Dependencies
Stage 4
