# alibi: Development Roadmap

> Based on: docs/aide/vision.md

The build order is strict: engine before renderer, renderer before modes, modes before campaign, all of the above before themes 5–10.

---

## Stage 0: Skeleton + Toolchain

**Goal:** Build green, Playwright wired, GitHub Pages deploy working.

### Deliverables
- `package.json`: Vite + TypeScript + Vitest + ESLint + `@playwright/test`
- `index.html` + `src/main.ts` (blank canvas)
- `data-testid="game-canvas"` on canvas element
- `npm run build`, `npm test`, `npm run lint`, `npm run test:e2e` all exit 0
- `playwright.config.ts` targeting localhost:5173
- `tests/e2e/smoke.spec.ts`: page loads, canvas visible, zero errors
- GitHub Actions CI: build + test + lint + e2e on every PR
- GitHub Pages deploy on merge to main

---

## Stage 1: Core Engine (pure, no DOM)

**Goal:** Generator produces valid unique-solution puzzles. Solver verifies them. All 16 clue evaluators tested.

### Deliverables
- `src/engine/grid.ts` — W×H grid model, tile types, room cell-list zones
- `src/engine/logic.ts` — Rule of One, spatial mask, win condition, victim cell derivation
- `src/engine/clues.ts` — All 16 clue evaluators (pure functions; see AGENTS.md)
- `src/engine/solver.ts` — Constraint solver: returns solution count, exits early at 2
- `src/engine/generator.ts` — Seeded PRNG (mulberry32), Latin square backtracking, clue generation, uniqueness loop, 20-retry limit
- `src/storage/schema.ts` — TypeScript types for all localStorage structures
- `src/themes/index.ts` + stub theme: 4×5 floor plan, 2 rooms, Easy/Medium/Hard variants (same layout), minimal name set
- `window.__alibi_puzzle` exposed in DEV/TEST builds
- Vitest: >90% coverage on all `src/engine/`
- Generator test: 1000 seeds on stub theme → all unique solutions, <5s total
- Generator test: irregular floor plan (L-rooms, wall columns) → valid puzzles

---

## Stage 2: Coffee Shop Theme + Full Game Screen

**Goal:** One complete playable game. All UX mechanics working: placement, shadows, undo, sound, clue satisfaction, win sequence, save/resume.

### Coffee Shop floor plan variants
- Easy: 4×5. Rooms: Bar (top 2 rows, left 3 cols), Main Area (bottom 3 rows, all cols), Restroom (top 2 rows, right 2 cols). ~5 objects (chairs, plant, cash register).
- Medium: 5×6. Add counter object row, more seat tiles.
- Hard: 6×7. L-shaped main area, narrow restroom corridor, back storage room added.

### Deliverables
- `src/themes/coffee-shop.ts` — full Theme module with all 3 floor plan variants, 12 suspect names, 6 victim names, clue templates, color palette, sprite map
- `src/render/canvas.ts` — tile renderer (zone colors, wall rendering, object sprites)
- `src/render/sprites.ts` — SVG bundled loader (Vite `?raw`)
- `src/render/portraits.ts` — portrait card renderer (SVG or initial-letter fallback)
- `src/render/ui.ts` — sidebar: suspect cards, clue cards, live satisfaction state
- `src/render/overlay.ts` — narrative intro, GUILTY stamp, share card
- `src/game/state.ts` — full state machine
- `src/game/input.ts` — click, radial menu, keyboard nav, blocked row/col flash
- `src/game/undo.ts` — undo/redo, `Ctrl/Cmd+Z`, btn-undo
- `src/game/sound.ts` — Web Audio synthesis: 6 events, mute toggle
- `src/game/share.ts` — completion card + clipboard
- `src/screens/game.ts` — game screen wiring
- `src/storage/progress.ts` — localStorage read/write (PuzzleState save/resume only for now)
- How-to-play overlay (4 slides, localStorage first-visit flag)
- `tests/e2e/gameplay.spec.ts` — full playthrough using window.__alibi_puzzle
- `tests/e2e/undo.spec.ts`, `save.spec.ts`, `share.spec.ts`

---

## Stage 3: Home Screen + All Three Play Modes

**Goal:** All three modes playable. Home screen. Campaign with 3 save slots. Daily Case with streak. Quick Play with theme+difficulty selector.

### Deliverables
- `src/screens/home.ts` — home screen with Campaign, Quick Play, Daily Case buttons + daily preview card
- `src/screens/campaign-board.ts` — 12-case timeline, case cards with status/lock/time
- `src/screens/theme-select.ts` — theme + difficulty picker for Quick Play
- `src/modes/campaign.ts` — campaign seed derivation, 12-case generation, rank calculation, slot management (3 slots)
- `src/modes/quickplay.ts` — random seed generation, theme/difficulty selection
- `src/modes/daily.ts` — date-based seed, 30-day rotation schedule, streak logic
- `src/storage/progress.ts` — extended with CampaignSave, DailySave, PlayerStats, PlayerPrefs
- Detective rank calculation and display
- `tests/e2e/campaign.spec.ts`:
  - New campaign creates 12 cases with correct difficulty progression
  - Completing a case advances to the next and saves progress
  - Reloading resumes correct state from localStorage
  - 3 save slots are independent
- `tests/e2e/daily.spec.ts`:
  - Same date always produces same puzzle
  - Streak increments on consecutive daily solves
  - Streak resets after missed day

---

## Stage 4: Themes 2–4 (Bookstore, Backyard, Holiday Mall)

**Goal:** Four themes available across all modes. Generator tests across all 4 themes.

### Bookstore floor plan (all 3 variants)
- Easy 5×5: 4 rooms — Crime Novels (top-left 2×3), Romance Novels (right strip 2×5), Non-Fiction (mid-left 3×2), Best Sellers (bottom-left 3×3), Checkout (bottom-right 2×2, cash register object, impassable register tile)
- Medium 6×6: add Rare Books alcove (1×2)
- Hard 7×7: extended Crime Novels with bookshelves blocking multiple cells

### Backyard floor plan (all 3 variants)
- Easy 5×5: Backyard (large open), Jacuzzi (2×2 top-right), Deck (1×2 strip)
- Medium 6×6: add Bedroom, Living Room
- Hard 7×7: add Kitchen, irregular L-shaped Backyard, fenced Jacuzzi area

### Holiday Mall floor plan (all 3 variants)
- Easy 5×6: Walkway (horizontal corridor), Electronics (left), Toy Store (right)
- Medium 7×7: add Santa's Village, Food Court
- Hard 8×8: full mall — all 7 rooms, irregular shapes, narrow corridor zones

### Deliverables
- All 3 theme modules with 3 floor plan variants each
- SVG sprites for all new furniture types (or confirmed placeholder fallback)
- `gameplay.spec.ts` parameterized across all 4 themes × 3 difficulties
- Generator test: 100 seeds × 4 themes × 3 difficulties = 1200 puzzles → all unique solutions

---

## Stage 5: Themes 5–10 (Restaurant, Gym, Office, Garden Party, Hospital, Carnival)

**Goal:** All 10 themes complete. Campaign uses all 10.

### Floor plan guidance for each

**Restaurant**: Easy 5×5 (Kitchen, Dining Room, Bar). Medium 6×6 (+ Private Room). Hard 7×8 (+ Restroom, irregular kitchen corridor with stove/counter objects blocking cells).

**Gym**: Easy 4×5 (Weights area, Cardio). Medium 6×6 (+ Locker Room, Pool). Hard 7×8 (+ Sauna, irregular pool shape, equipment objects).

**Office**: Easy 5×5 (Open Plan, Meeting Room). Medium 6×6 (+ Kitchen, Reception). Hard 7×7 (+ Server Room narrow corridor, glass partition walls creating irregular shapes).

**Garden Party**: Easy 5×5 (Lawn, Gazebo). Medium 6×6 (+ Pool Area). Hard 7×8 (+ Greenhouse irregular shape, Garage, garden path corridor separating areas).

**Hospital**: Easy 5×5 (Ward, Waiting Room). Medium 6×6 (+ Pharmacy, Cafeteria). Hard 8×7 (+ Operating Theatre with sterile zone, narrow corridor, supply room).

**Carnival**: Easy 5×5 (Carousel, Ticket Booth). Medium 6×7 (+ Funhouse, Food Stands). Hard 8×8 (+ Backstage, irregular Funhouse shape, tent structures creating non-rectangular rooms).

### Deliverables
- All 6 theme modules with 3 floor plan variants each
- Campaign mode updated to draw from all 10 themes
- Generator tests: 50 seeds × 10 themes × 3 difficulties = 1500 puzzles → all unique

---

## Stage 6: Polish + v1.0 Release

**Goal:** Shipped to `https://pnz1990.github.io/alibi/`. Self-explanatory, mobile-ready, performant.

### Deliverables
- Pixel/bitmap font bundled as data URI for all game text
- Mobile-responsive layout: landscape phone playable, touch-friendly radial menu (larger tap targets)
- Lighthouse performance ≥ 80, first paint < 3s
- Accessibility: all interactive elements keyboard-navigable
- All 5 definition-of-done journeys ✅ in CI against production URL
- GitHub release `v1.0.0` with changelog
- `README.md` with live screenshot, play link, and brief rules explanation

---

## Stage 7: Gameplay Polish (post-v1.0)

**Goal:** Address player-reported usability gaps. All items tracked as GitHub issues.

### Deliverables (issues #41, #42, #43)

#### #41 — Visual overhaul (pixel art aesthetic)
- Pixel/bitmap font for **all** game text. External npm libraries permitted for this feature.
- Crisp pixel grid borders; theme-specific palettes actually applied (currently hardcoded).
- Suspect tokens look like retro character sprites.
- GUILTY stamp has pixel-art animation (drop + shake).
- Home screen: detective noir title feel, not a settings page.
- Sidebar: physical case file / notepad look.
- `image-rendering: pixelated` on `<canvas>` for sharpness.
- All existing Playwright e2e tests must still pass.

#### #42 — Alphabetical suspect names
- `suspectNames[i]` must start with letter `i` (A=0, B=1, …, L=11).
- Generator assigns name by position, not by PRNG — suspect 0 is always the A-name.
- All 10 theme modules must be audited and fixed.
- Add Vitest assertion for every registered theme.

#### #43 — Cell annotation system
- **X mark**: player can mark a cell as "nobody here" — shown as a red X.
- **? candidates**: player can tag a cell with multiple "maybe" suspects (e.g. "A? B?").
  - Multiple ? marks per cell allowed simultaneously.
  - Placing a suspect confirmed elsewhere auto-clears their ? from all cells.
- Undo/redo must include annotation changes.
- Saved in `PuzzleState.annotations` (schema update required in `src/storage/schema.ts`).
- New data-testids: `cell-annotation-x-{x}-{y}`, `cell-annotation-candidates-{x}-{y}`.

---

## Stage 7b: Visual Game Quality (post-v1.0, second wave)

**Goal:** Make the game look and feel like a professional released title. All items tracked as GitHub issues. This stage was triggered by direct player feedback on the deployed game.

### Deliverables (issues #47–#52)

#### #47 — Room zones: tinted backgrounds + boundary borders
- `renderGrid()` must consult `puzzle.floorPlan.rooms` to render room tints.
- Each room gets a distinct semi-transparent color tint (applied BEFORE tile drawing).
- Room boundaries rendered as thick borders on edges between adjacent rooms.
- Room name label centered within each room on the grid.
- Sidebar shows a room legend with color swatches.

#### #48 — Furniture sprites: inline SVGs for all 23 object types
- Create `src/assets/sprites/index.ts` exporting `SPRITE_SVGS: Record<string, string>`.
- One SVG per object type; pixel-art style, `viewBox="0 0 32 32"`.
- Renderer uses `SPRITE_SVGS` as fallback when `theme.spriteMap[type]` is empty.
- No plain beige labeled rectangles for any object type.

#### #49 — Victim placeholder always visible
- Before all suspects placed: show a ghost '?' marker in the sidebar and on each candidate cell area.
- After all placed: animate reveal, show victim name in sidebar 'VICTIM' section.
- `data-testid="victim-token"` on the sidebar victim element.

#### #50 — Circular wheel radial menu (replaces flat dropdown)
- Circular pie-menu centered on clicked cell; items arranged in arcs.
- CSS scale animation on open (150ms).
- Touch drag-to-select: touchmove → angle → highlight arc → touchend → select.
- All existing `data-testid` attributes preserved.

#### #51 — Layout polish: responsive cell size, panel frames, readable clue text
- `CELL_SIZE` calculated responsively from viewport (min 56, max 96).
- Grid wrapped in a framed panel with border + box-shadow.
- Sidebar has visual separator from grid panel.
- **Clue body text: switch from pixel font to readable system font at 12–13px.** Pixel font for headings only.
- Subtle diagonal-hatch background texture on game screen.

#### #52 — Suspect portrait cards in sidebar + upgraded canvas tokens
- Sidebar cards: 80px wide with 48px portrait area (programmatic geometric face/silhouette).
- Canvas token: includes mini portrait + name plate below.
- `data-testid="suspect-card-{id}"` on each sidebar card.
