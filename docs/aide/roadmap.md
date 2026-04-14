# alibi: Development Roadmap

> Based on: docs/aide/vision.md

---

## Current Gate: Engine + Generator must exist before any theme or rendering work

The generator must be able to produce valid, unique-solution puzzles in isolation (no browser, no sprites) before any rendering or theme work begins.

---

## Stage 0: Project Skeleton & Toolchain

**Goal:** Working Vite + TypeScript project, CI green, Playwright wired, GitHub Pages deploy.

### Deliverables
- `package.json`: Vite + TypeScript + Vitest + ESLint + `@playwright/test`
- `index.html` + `src/main.ts` entry point
- Canvas element renders with `data-testid="game-canvas"`
- `npm run build`, `npm test`, `npm run lint`, `npm run test:e2e` all exit 0
- `playwright.config.ts` targeting `http://localhost:5173`
- `tests/e2e/smoke.spec.ts`: page loads, canvas visible, zero JS errors
- GitHub Actions CI: build + unit test + lint + Playwright e2e on every PR
- GitHub Pages deploy workflow on merge to main
- `npx playwright install chromium --with-deps` in CI

### Dependencies
None

---

## Stage 1: Core Engine (pure functions, no DOM)

**Goal:** All game logic implemented and unit-tested. The generator produces valid unique-solution puzzles for a stubbed theme.

### Deliverables
- `src/engine/grid.ts` — 6×6 grid model: tile types, zones, object placement
- `src/engine/logic.ts` — Rule of One, spatial mask, win condition, victim cell derivation
- `src/engine/clues.ts` — All 14 clue type evaluators (pure functions; see AGENTS.md)
- `src/engine/solver.ts` — Constraint solver: counts valid solutions for a given puzzle + clue set. Must return exactly 1 for a valid puzzle.
- `src/engine/generator.ts` — seeded PRNG generator: derives validCols/validRows from floor plan, places suspects (Latin square backtracking), derives victim cell, generates varied clue set, calls solver, retries on failure
- `src/themes/index.ts` — Theme registry interface + stub theme for testing (minimal 4×4 grid, 2 rooms)
- `window.__alibi_puzzle` exposed in DEV/TEST builds
- Vitest: >90% line coverage on all `src/engine/` files
- Generator test: 1000 different seeds on stub theme → all produce unique-solution puzzles, no timeout in CI
- Generator test: irregular floor plan (L-shaped rooms, wall columns, object rows) → still produces valid puzzles

### Dependencies
Stage 0

---

## Stage 2: Coffee Shop Theme + Rendering

**Goal:** One complete playable theme rendered in the browser. Full UX: placement, shadows, clue satisfaction, undo, sound, narrative, save, share, how-to-play.

### Deliverables
- `src/themes/coffee-shop.ts` — complete theme module: floor plan, zones (Bar, Main Area, Restroom), object catalog, suspect name set (12 names), victim names, narrative templates, color palette, sprite map
- `src/render/canvas.ts` — tile renderer: floor/wall/zone colors from theme palette; furniture objects rendered as SVG sprites (fallback to labeled rectangle if SVG missing)
- `src/render/sprites.ts` — SVG bundled sprite loader (Vite `?raw` import)
- `src/render/portraits.ts` — suspect portrait card SVGs (fallback to colored initial rectangle)
- `src/render/ui.ts` — sidebar: suspect list, 6–8 clue cards, strikethrough on `clue-satisfied`, flash on `clue-error`
- `src/render/overlay.ts` — narrative intro, how-to-play modal (4 slides), share card, resume prompt
- `src/game/state.ts` — state machine: `idle → narrative → placing → solved → reveal → guilty → end`
- `src/game/input.ts` — click → radial menu → placement; keyboard arrow/Enter/Escape nav; blocked row/col flash
- `src/game/undo.ts` — undo/redo stack; `Ctrl/Cmd+Z`; undo button (`btn-undo`)
- `src/game/sound.ts` — Web Audio API synthesis: 6 events. Mute toggle (`btn-mute`).
- `src/game/save.ts` — auto-save by seed+theme to localStorage; resume prompt on reload
- `src/game/share.ts` — completion card; `btn-share` copies to clipboard
- Theme selector (`theme-select`) and "New Puzzle" button (`btn-new-puzzle`)
- URL hash: `#theme=coffee-shop&seed=<N>`
- All `data-testid` attributes per AGENTS.md present
- `tests/e2e/gameplay.spec.ts` — full playthrough using `window.__alibi_puzzle`
- `tests/e2e/undo.spec.ts`, `save.spec.ts`, `share.spec.ts`
- `npm run test:e2e` exits 0; PR body contains browser_screenshot evidence

### Dependencies
Stage 1

---

## Stage 3: Remaining 3 Themes

**Goal:** All 4 themes playable. Theme selector works. Each theme has its own floor plan, sprites, name set, and narrative templates.

### Deliverables
- `src/themes/bookstore.ts` — **5×5 irregular** — rooms: Crime Novels (top-left L-shape), Non-Fiction (center), Romance Novels (right strip), Best Sellers (bottom-left), Checkout (bottom-right narrow)
- `src/themes/backyard.ts` — **6×6 asymmetric** — rooms: Backyard (large open 3×3), Jacuzzi (2×2 corner), Deck (1×2 strip), Bedroom (2×3 bottom-left), Living Room (3×3 bottom-center), Kitchen (2×2 bottom-right)
- `src/themes/holiday-shopping.ts` — **8×7 large mall** — rooms: Electronics (left mid), Santa's Village (center large), Santa's Lodge (top-right small), Bookstore (right strip), Toy Store (bottom-left large), Walkway (wide horizontal corridor), Coffee Shop (bottom-right)
- Each theme has genuinely different W×H dimensions and irregular room shapes
- SVG sprites for all new furniture types (or confirmed fallback to placeholder)
- Portrait SVGs for all new name sets (or confirmed fallback)
- Theme selector shows all 4 themes with names and preview colors
- Generator tests: 250 seeds × 4 themes — all unique-solution puzzles; tests pass despite different grid sizes
- `tests/e2e/gameplay.spec.ts` parameterized across all 4 themes

### Dependencies
Stage 2

---

## Stage 4: Polish & v1.0 Release

**Goal:** v1.0 shipped to `https://pnz1990.github.io/alibi/`. Fully self-explanatory.

### Deliverables
- Pixel/bitmap font for all UI text (bundled as data URI)
- Mobile-responsive layout (landscape phone, touch-friendly radial menu)
- Lighthouse performance ≥ 80, load < 3s
- All 5 definition-of-done journeys ✅ in CI against production URL
- GitHub release `v1.0.0` with changelog
- `README.md` with live screenshot and play link

### Dependencies
Stage 3
