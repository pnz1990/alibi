# Definition of Done

> The project is complete when every journey below passes end-to-end.
> **Journeys 1–2 are verified by automated tests. Journeys 3–5 are verified by BOTH Playwright AND the OpenCode browser extension. No journey is marked ✅ without browser evidence.**

---

## How to verify journeys

Every engineer and QA agent uses two tools:

1. **Playwright** (`npm run test:e2e`) — headless automated browser tests. Must pass in CI.
2. **OpenCode browser extension** — visual verification during development. Screenshots go in the PR body.

```bash
# Start dev server (required for e2e tests)
npm run dev &

# Run all Playwright tests
npm run test:e2e

# Run a specific spec
npx playwright test tests/e2e/level1.spec.ts --headed

# Visual verification with browser extension (run from OpenCode session):
# → browser_navigate to http://localhost:5173
# → browser_screenshot, browser_click, browser_query, browser_errors
```

---

## Journey 1: Skeleton loads and deploys

**The user story**: The project builds, tests pass, and the game loads on GitHub Pages with no errors.

### Automated verification

```bash
npm install
npm run build           # must exit 0
npm test                # Vitest unit tests, must exit 0
npm run lint            # must exit 0, zero findings
npm run verify-levels   # solver check, must exit 0
npm run test:e2e        # Playwright, must exit 0
```

### Browser extension verification

```
browser_navigate("http://localhost:5173")
browser_screenshot()           → grid must be visible, no blank canvas
browser_errors()               → must return zero JS errors
browser_console(filter="error") → must return empty
```

### Pass criteria

- [ ] All four npm commands exit 0
- [ ] `browser_screenshot` shows a rendered 9×9 grid
- [ ] `browser_errors` returns zero errors
- [ ] GitHub Pages URL (`https://pnz1990.github.io/alibi/`) loads after CI deploy
- [ ] `[data-testid="game-canvas"]` element is present in the DOM

---

## Journey 2: Logic engine correctly validates placements

**The user story**: All 12 clue evaluators, Rule of One, spatial mask, and win condition logic are unit-tested and pass.

### Automated verification

```bash
npm test
# Must see in output:
# ✓ src/engine/grid.test.ts — placement on Floor/Seat allowed
# ✓ src/engine/grid.test.ts — placement on Wall blocked
# ✓ src/engine/logic.test.ts — Rule of One: occupied row returns blocked=true
# ✓ src/engine/logic.test.ts — Rule of One: occupied col returns blocked=true
# ✓ src/engine/logic.test.ts — win condition requires all 8 placed + all clues satisfied
# ✓ src/engine/clues.test.ts — all 12 clue types pass
# ✓ src/engine/solver.test.ts — Level 1 has exactly one solution

npm run verify-levels
# Level 001: UNIQUE SOLUTION ✓
# Level 002: UNIQUE SOLUTION ✓
# Level 003: UNIQUE SOLUTION ✓
# Level 004: UNIQUE SOLUTION ✓
```

### Pass criteria

- [ ] `npm test` exits 0, all engine tests green
- [ ] Coverage on `src/engine/` ≥ 90% line coverage
- [ ] `npm run verify-levels` exits 0, all 4 levels confirmed unique solution

---

## Journey 3: Player completes Level 1 (The Speakeasy)

**The user story**: A player opens the game, reads the intro narrative, places all 8 suspects correctly, clicks the victim cell, and sees the GUILTY stamp naming Elias.

### Playwright verification

```bash
npx playwright test tests/e2e/level1.spec.ts
# Must pass:
# ✓ Level 1 — narrative intro shown on load
# ✓ Level 1 — full playthrough reaches GUILTY screen
# ✓ Level 1 — GUILTY stamp names Elias
# ✓ Level 1 — share card appears after GUILTY
# ✓ Level 1 — clues all strikethrough before victim click
# ✓ Level 1 — undo reverses last placement
```

### Browser extension verification (required in PR body)

```
browser_navigate("http://localhost:5173")
browser_screenshot()
# → capture: narrative intro text visible

browser_click('[data-testid="narrative-intro"] button')
browser_screenshot()
# → capture: 9×9 grid loaded, sidebar showing 9 clues

# Place Arthur (A) at solution position B-1 (x=1, y=0)
browser_click('[data-testid="cell-1-0"]')
browser_screenshot()
# → capture: radial menu visible with suspects A–H

browser_click('[data-testid="suspect-option-A"]')
browser_screenshot()
# → capture: Arthur token on B-1, shadow covers row 1 and col B

# [continue placing B through H at solution positions]

browser_screenshot()
# → capture: all 8 suspects placed, victim cell E-9 highlighted, all clues struck through

browser_click('[data-testid="victim-cell"]')
browser_screenshot()
# → capture: GUILTY stamp visible, "Elias" text present

browser_errors()
# → must return zero errors
```

### Pass criteria

- [ ] `npx playwright test tests/e2e/level1.spec.ts` exits 0, all tests green
- [ ] PR body contains `browser_screenshot` showing: intro screen, grid with first placement, all suspects placed, GUILTY stamp
- [ ] `browser_errors` output in PR body shows zero JS errors
- [ ] GUILTY stamp names Elias
- [ ] Share card appears after GUILTY stamp

---

## Journey 4: Invalid placement blocked + clue gate enforced

**The user story**: Wall clicks do nothing. Occupied row/col clicks flash red. Clicking the victim cell with unsatisfied clues shows the error state instead of GUILTY.

### Playwright verification

```bash
npx playwright test tests/e2e/placement.spec.ts
# Must pass:
# ✓ Wall tile click — no radial menu opens
# ✓ Occupied row click — cell gets class 'cell-blocked', no radial menu
# ✓ Occupied col click — cell gets class 'cell-blocked', no radial menu
# ✓ Placed suspect click — radial menu opens with 'Clear' option
# ✓ Clear removes shadow from row and col
# ✓ Victim click with unsatisfied clues — [data-testid="msg-clue-gate"] visible
# ✓ Victim click with unsatisfied clues — [data-testid="guilty-stamp"] NOT visible
# ✓ After satisfying all clues — victim click shows GUILTY stamp
```

```bash
npx playwright test tests/e2e/undo.spec.ts
# Must pass:
# ✓ Ctrl+Z undoes last placement
# ✓ Ctrl+Shift+Z redoes undone placement
# ✓ Undo button click undoes last placement
# ✓ Undo stack empty — undo button disabled
```

### Browser extension verification (required in PR body)

```
# Test wall blocking
browser_click('[data-testid="cell-2-0"]')   # a Wall tile
browser_screenshot()
# → capture: no radial menu (radial-menu element absent or hidden)

# Test row blocking
browser_click('[data-testid="cell-1-0"]')
browser_click('[data-testid="suspect-option-A"]')
browser_click('[data-testid="cell-3-0"]')   # same row as A (y=0)
browser_screenshot()
# → capture: cell flashes red, no radial menu

# Test clue gate
# [place all 8 suspects in deliberately wrong positions]
browser_click('[data-testid="victim-cell"]')
browser_screenshot()
# → capture: msg-clue-gate visible, guilty-stamp NOT visible, unsatisfied clues highlighted red

browser_errors()
# → must return zero errors
```

### Pass criteria

- [ ] `npx playwright test tests/e2e/placement.spec.ts` exits 0
- [ ] `npx playwright test tests/e2e/undo.spec.ts` exits 0
- [ ] PR body contains `browser_screenshot` showing: wall click (no menu), blocked row (red flash), clue gate (error state)
- [ ] `browser_errors` shows zero JS errors

---

## Journey 5: All 4 levels are playable and uniquely solvable

**The user story**: A player completes all 4 levels. Each has its own narrative, difficulty rating, and theme palette. The level select screen shows all 4 with correct metadata.

### Playwright verification

```bash
npm run verify-levels
# Level 001: UNIQUE SOLUTION ✓
# Level 002: UNIQUE SOLUTION ✓
# Level 003: UNIQUE SOLUTION ✓
# Level 004: UNIQUE SOLUTION ✓

npx playwright test tests/e2e/level2.spec.ts
npx playwright test tests/e2e/level3.spec.ts
npx playwright test tests/e2e/level4.spec.ts
# Each must pass:
# ✓ Full playthrough reaches GUILTY screen
# ✓ GUILTY stamp names the correct killer
# ✓ Narrative intro shown

npx playwright test tests/e2e/save.spec.ts
# ✓ Placing suspects auto-saves to localStorage
# ✓ Refreshing page shows Resume? prompt
# ✓ Accepting resume restores placements

npx playwright test tests/e2e/share.spec.ts
# ✓ Copy result button present after completion
# ✓ Clipboard contains level name + killer name
```

### Browser extension verification (required in PR body)

```
# Level select screen
browser_navigate("http://localhost:5173")
browser_query('[data-testid="level-select"]', mode="text")
# → must list all 4 levels with names and difficulty stars

browser_screenshot()
# → capture: level select showing 4 cards

# Verify each level has distinct theme color
browser_click('[data-testid="level-card-001"]')
browser_screenshot()  # → Speakeasy dark palette
browser_navigate("http://localhost:5173")
browser_click('[data-testid="level-card-002"]')
browser_screenshot()  # → Luxury Liner light palette
# repeat for 003, 004

# Verify killer identities
# L1: Elias, L2: Gideon, L3: Harlow, L4: Fiona
# [complete each level, screenshot GUILTY stamp]

browser_errors()
# → must return zero errors across all 4 levels
```

### Pass criteria

- [ ] `npm run verify-levels` exits 0, all 4 unique solutions confirmed
- [ ] All 4 `level*.spec.ts` Playwright tests exit 0
- [ ] `tests/e2e/save.spec.ts` and `tests/e2e/share.spec.ts` exit 0
- [ ] PR body contains `browser_screenshot` of: level select screen, all 4 GUILTY stamps (one per level with correct killer name)
- [ ] `browser_errors` shows zero JS errors across all levels
- [ ] Level 2 killer: Gideon, Level 3 killer: Harlow, Level 4 killer: Fiona

---

## Journey Status

| Journey | Status | Last checked | Notes |
|---|---|---|---|
| 1: Skeleton loads and deploys | ❌ Not started | — | Requires Stage 0 |
| 2: Logic engine validates | ❌ Not started | — | Requires Stage 1 |
| 3: Player completes Level 1 | ❌ Not started | — | Requires Stages 2–3 |
| 4: Invalid placement + clue gate | ❌ Not started | — | Requires Stage 2 |
| 5: All 4 levels playable | ❌ Not started | — | Requires Stage 4 |
