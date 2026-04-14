# Definition of Done

> The project is complete when every journey below passes end-to-end.
> Journeys are verified with Playwright AND the OpenCode browser extension. No journey is ✅ without both.

---

## How to verify

```bash
npm run dev &              # Vite dev server on http://localhost:5173
npm run test:e2e           # all Playwright tests
npx playwright test tests/e2e/gameplay.spec.ts --headed  # visual
```

Browser extension verification runs during development before each PR. Screenshots go in the PR body.

---

## Journey 1: Project builds, tests pass, deploys

```bash
npm run build && npm test && npm run lint && npm run test:e2e
# All must exit 0

# After CI merges to main:
# https://pnz1990.github.io/alibi/ must load
```

Browser extension:
```
browser_navigate("http://localhost:5173")
browser_screenshot()          → canvas visible, no blank screen
browser_errors()               → zero JS errors
```

**Pass criteria:**
- [ ] All 4 npm commands exit 0
- [ ] `[data-testid="game-canvas"]` present in DOM
- [ ] GitHub Pages URL loads after CI deploy
- [ ] Zero JS errors on load

---

## Journey 2: Generator produces valid unique-solution puzzles

```bash
npm test
# Must see:
# ✓ generator: 1000 seeds produce unique-solution puzzles
# ✓ solver: known puzzle has exactly 1 solution
# ✓ all 14 clue evaluators pass
# ✓ Rule of One enforced correctly
# ✓ victim cell derivation correct
```

**Pass criteria:**
- [ ] `npm test` exits 0, all engine tests green
- [ ] Generator: 1000 seeds × Coffee Shop theme → all unique solutions
- [ ] Engine coverage ≥ 90%

---

## Journey 3: Player completes a generated Coffee Shop puzzle end-to-end

```bash
npx playwright test tests/e2e/gameplay.spec.ts
# ✓ narrative intro shown
# ✓ full playthrough reaches GUILTY screen
# ✓ GUILTY names the correct killer
# ✓ share card appears
# ✓ undo reverses last placement
```

Browser extension (required in PR body):
```
browser_navigate("http://localhost:5173/?theme=coffee-shop&seed=12345")
browser_screenshot()   → narrative intro visible
browser_click('[data-testid="narrative-intro"] button')
browser_screenshot()   → 6×6 grid with Coffee Shop floor plan, suspect cards, clue cards
# [place suspects at solution positions from window.__alibi_puzzle.solution]
browser_screenshot()   → all suspects placed, victim cell highlighted, all clues struck through
browser_click('[data-testid="victim-cell"]')
browser_screenshot()   → GUILTY stamp visible with killer name
browser_errors()       → zero
```

**Pass criteria:**
- [ ] `gameplay.spec.ts` exits 0
- [ ] PR body has: narrative screenshot, grid screenshot, GUILTY screenshot
- [ ] GUILTY stamp shows correct killer name (matches `window.__alibi_puzzle.killer`)
- [ ] Share card appears after GUILTY
- [ ] `browser_errors` zero throughout

---

## Journey 4: Invalid placements blocked; clue gate enforced; undo works

```bash
npx playwright test tests/e2e/undo.spec.ts
# ✓ Ctrl+Z undoes last placement
# ✓ undo button click works
# ✓ blocked row/col → cell-blocked class, no menu
# ✓ wall click → no reaction
# ✓ victim click with unsatisfied clues → msg-clue-gate visible, no GUILTY
```

Browser extension:
```
# Test clue gate: place all suspects in wrong positions → click victim cell
browser_screenshot()   → msg-clue-gate visible, unsatisfied clues highlighted red

# Test undo
browser_click('[data-testid="btn-undo"]')
browser_screenshot()   → last placement removed, shadow gone

browser_errors()       → zero
```

**Pass criteria:**
- [ ] `undo.spec.ts` exits 0
- [ ] Wall cells produce no reaction on click
- [ ] Blocked row/col produces red flash, no radial menu
- [ ] Clue gate blocks GUILTY when clues unsatisfied
- [ ] Undo removes last placement and its shadow
- [ ] Zero JS errors

---

## Journey 5: All 4 themes playable; infinite generation works; seed sharing works

```bash
npx playwright test tests/e2e/gameplay.spec.ts  # parameterized across all 4 themes
# ✓ Coffee Shop full playthrough → GUILTY
# ✓ Bookstore full playthrough → GUILTY
# ✓ Backyard full playthrough → GUILTY
# ✓ Holiday Shopping full playthrough → GUILTY

npx playwright test tests/e2e/save.spec.ts
# ✓ placement auto-saved to localStorage
# ✓ reload shows Resume? prompt
# ✓ same seed+theme URL reproduces identical puzzle

npx playwright test tests/e2e/share.spec.ts
# ✓ copy result button copies text card with killer name
```

Browser extension:
```
browser_click('[data-testid="theme-select"]')
browser_screenshot()       → all 4 themes listed

# For each theme: generate puzzle, complete it, screenshot GUILTY stamp
browser_navigate("/?theme=bookstore&seed=99999")
# [solve] → browser_screenshot() of GUILTY

browser_click('[data-testid="btn-new-puzzle"]')
browser_screenshot()       → new puzzle loaded (different from previous)

# Test seed sharing
# Copy URL hash → open in new page → same puzzle
browser_errors()           → zero across all themes
```

**Pass criteria:**
- [ ] All 4 theme playthroughs pass Playwright
- [ ] `save.spec.ts` and `share.spec.ts` exit 0
- [ ] Same seed+theme always reproduces identical puzzle (deterministic)
- [ ] "New Puzzle" produces a different puzzle
- [ ] Theme selector shows all 4 themes
- [ ] PR body: 4× GUILTY stamp screenshots (one per theme)
- [ ] Zero JS errors across all themes

---

## Journey Status

| Journey | Status | Last checked | Notes |
|---|---|---|---|
| 1: Build + deploy | ❌ Not started | — | Requires Stage 0 |
| 2: Generator valid | ❌ Not started | — | Requires Stage 1 |
| 3: Coffee Shop playthrough | ❌ Not started | — | Requires Stage 2 |
| 4: Invalid placement + clue gate + undo | ❌ Not started | — | Requires Stage 2 |
| 5: All 4 themes + infinite gen | ❌ Not started | — | Requires Stage 3 |
