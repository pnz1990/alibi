# alibi: Development Roadmap

> Based on: docs/aide/vision.md

---

## Current Gate: Stage 0 must ship before any level content

The game skeleton (canvas, grid, logic engine, CI, GitHub Pages deploy) must exist and be deployable before level content is authored. Authoring levels against a broken engine wastes effort.

---

## Stage 0: Project Skeleton & Toolchain

**Goal:** Working Vite + TypeScript project that renders an empty 9×9 grid on canvas, deployed to GitHub Pages via CI. Playwright wired and green.

### Deliverables
- `package.json` with Vite + TypeScript + Vitest + ESLint (`@typescript-eslint/recommended`) + `@playwright/test` configured
- `index.html` + `src/main.ts` entry point
- Canvas renderer draws a 9×9 grid at 2× pixel scale; `[data-testid="game-canvas"]` on the canvas element
- `npm run build`, `npm test`, `npm run lint`, `npm run test:e2e` all exit 0
- `playwright.config.ts` targeting `http://localhost:5173` (dev) and `https://pnz1990.github.io/alibi/` (production project)
- `tests/e2e/smoke.spec.ts` — Playwright smoke test: page loads, `[data-testid="game-canvas"]` visible, zero JS errors
- GitHub Actions CI: build + unit test + lint + Playwright e2e on every PR
- GitHub Pages deploy workflow (`gh-pages` branch on merge to main)
- `npx playwright install chromium --with-deps` in CI setup step

### Dependencies
None

---

## Stage 1: Core Logic Engine

**Goal:** The three-layer logic engine (Rule of One, Spatial Mask, Testimony) is fully implemented and unit-tested, independent of rendering.

### Deliverables
- `src/engine/grid.ts` — 9×9 grid model with tile types (Floor/Solid/Seat) and room zones
- `src/engine/logic.ts` — Rule of One validator, Spatial Mask filter, win condition detector (single remaining valid cell)
- `src/engine/clues.ts` — All 12 clue type evaluators: `fixedPosition`, `isBeside`, `isNotBeside`, `isInRoom`, `isNotInRoom`, `isInSameRoom`, `isInDifferentRoom`, `isInSameRow`, `isInSameCol`, `isFarFrom`, `isNorthOf`, `isSouthOf` — see `docs/level-format.md` for full definitions
- `src/engine/solver.ts` — Constraint solver that verifies a level JSON has exactly one solution
- Full Vitest coverage on all engine functions (>90% line coverage)
- Level JSON schema documented in `docs/level-format.md`

### Dependencies
Stage 0

---

## Stage 2: Rendering, Input & Core UX

**Goal:** The game is fully playable for a single level with all professional-quality UX: undo, Web Audio sounds, how-to-play, narrative, progress save, and share card.

### Deliverables
- `src/render/canvas.ts` — Tile grid renderer with Floor/Solid/Seat visual distinction; every interactive overlay element has `data-testid` per AGENTS.md §E2E Testing
- `src/render/sprites.ts` — Suspect tokens A–H and victim as placeholder 16×16 colored rectangles with initials; falls back to placeholder if sprite file absent
- `src/render/ui.ts` — Sidebar: suspect list, alibi text, strikethrough on satisfied clues
- `src/render/overlay.ts` — How-to-play modal (4 slides). Shown on first visit (localStorage flag), accessible via "?" button. Keyboard-dismissable (Escape).
- `src/game/input.ts` — Click-to-place radial menu (8 suspects + clear); keyboard navigation: arrow keys move cursor, Enter opens menu, Escape closes menu
- `src/game/undo.ts` — Undo/redo stack (max 50). `Ctrl/Cmd+Z` undo, `Ctrl/Cmd+Shift+Z` redo. Undo button in sidebar. Reset on level start.
- `src/game/sound.ts` — Web Audio API: place, clear, clue-satisfied, blocked, guilty-stamp, victim-reveal. Mute toggle (🔇) persists to localStorage. No audio files — all sounds synthesized.
- `src/game/save.ts` — Auto-save placements to localStorage (`alibi_progress_<level-id>`). Restore on level load with "Resume?" prompt. Cleared on completion or reset.
- `src/game/share.ts` — Completion card text generator (level name, time, killer, URL). "Copy result" button.
- `src/game/state.ts` — State machine: `idle → narrative → placing → solved → reveal → accusation → end`
- Shadow effect: placing a suspect draws semi-transparent overlay over entire row + column
- Win sequence: narrative victim-found text → victim-reveal sound → "GUILTY" stamp → share card shown
- `tests/e2e/placement.spec.ts` — wall blocking, Rule of One blocking, clue gate, clear action
- `tests/e2e/undo.spec.ts` — undo/redo keyboard shortcuts and button
- `tests/e2e/save.spec.ts` — localStorage auto-save and resume
- `tests/e2e/share.spec.ts` — completion card copy-to-clipboard
- All Playwright e2e tests for Stage 2 pass (`npm run test:e2e` exits 0)

### Dependencies
Stage 1

---

## Stage 3: Level 1 — The Speakeasy

**Goal:** First complete, fully playable level with real pixel-art assets and a verified unique-solution clue set.

### Deliverables
- `src/levels/001-speakeasy.json` — complete level definition including `narrative`, `difficulty: "easy"` (see `docs/level-designs.md` for the authoritative design)
- Level passes constraint solver (`npm run verify-levels`)
- Placeholder sprite rendering: 16×16 colored rectangles. Real pixel art NOT required for v1.0.
- `tests/e2e/level1.spec.ts` — full Playwright playthrough using the known solution from level JSON; GUILTY stamp must name Elias
- Journey 3 and 4 pass: `npm run test:e2e` green AND `browser_screenshot` evidence in PR body

### Dependencies
Stage 2

---

## Stage 4: Levels 2–4 (Remaining Themes)

**Goal:** Four complete levels, one per theme. Full game is playable start to finish.

### Deliverables
- `src/levels/002-luxury-liner.json` — difficulty: "medium" (see `docs/level-designs.md`)
- `src/levels/003-art-gallery.json` — difficulty: "medium" (see `docs/level-designs.md`)
- `src/levels/004-greenhouse.json` — difficulty: "hard" (see `docs/level-designs.md`)
- Each level has `narrative` (intro, victim_found, guilty_text), `difficulty` rating
- Theme flat-color palettes per level (no bitmapped artwork required)
- Each level passes constraint solver (`npm run verify-levels`)
- Level select screen showing title, theme, and difficulty stars (1–3); `[data-testid="level-card-{id}"]` on each card
- `tests/e2e/level2.spec.ts`, `level3.spec.ts`, `level4.spec.ts` — full playthroughs with correct killer names
- Journey 5 passes: `npm run test:e2e` green (all level specs) AND `browser_screenshot` evidence of all 4 GUILTY stamps in PR body

### Dependencies
Stage 3

---

## Stage 5: Polish & v1.0 Release

**Goal:** v1.0 shipped to `https://pnz1990.github.io/alibi/`. Game is self-explanatory to new players.

### Deliverables
- Pixel font for all UI text (bitmap font, bundled as data URI — no external file)
- Mobile-responsive layout (playable on phone, landscape orientation; touch-friendly radial menu)
- `<3s` load time (Lighthouse performance ≥ 80)
- GitHub release `v1.0.0` with changelog
- `README.md` with screenshot and play link
- All 5 definition-of-done journeys ✅ verified: `npm run test:e2e` green against production URL (`https://pnz1990.github.io/alibi/`)

### Dependencies
Stage 4
