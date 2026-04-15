# Definition of Done

> The project is complete when every journey below passes end-to-end.
> Every journey requires BOTH Playwright (automated, CI) AND browser extension (visual, in PR body).

---

## Journey 1: Build, test, deploy

```bash
npm run build && npm test && npm run lint && npm run test:e2e
# All exit 0

# After CI merges to main: https://pnz1990.github.io/alibi/ loads
```

Browser extension:
```
browser_navigate("http://localhost:5173")
browser_screenshot()   → home screen with Campaign / Quick Play / Daily Case visible
browser_errors()       → zero
```

**Pass criteria:**
- [ ] All npm commands exit 0
- [ ] `[data-testid="screen-home"]` present in DOM
- [ ] Three mode buttons visible
- [ ] GitHub Pages loads after CI deploy
- [ ] Zero JS errors on load

---

## Journey 2: Generator produces valid unique-solution puzzles across all themes and difficulties

```bash
npm test
# Must see all passing:
# ✓ generator: 1000 seeds × stub theme → unique solutions
# ✓ generator: all 10 themes × 3 difficulties × 50 seeds → unique solutions
# ✓ solver: known puzzle has exactly 1 solution
# ✓ all 16 clue evaluators pass test suites
# ✓ Rule of One: occupied row/col returns blocked
# ✓ victim cell derivation correct for irregular floor plans
# ✓ generator throws PuzzleGenerationError after 20 retries on impossible floor plan
```

**Pass criteria:**
- [ ] `npm test` exits 0
- [ ] Engine coverage ≥ 90%
- [ ] 1500 puzzles (10 themes × 3 difficulties × 50 seeds) all unique solutions, no timeouts

---

## Journey 3: Player completes a Coffee Shop puzzle (Quick Play)

```bash
npx playwright test tests/e2e/gameplay.spec.ts
# ✓ narrative intro shown on puzzle load
# ✓ full playthrough reaches GUILTY screen
# ✓ GUILTY names the killer from window.__alibi_puzzle.killer
# ✓ share card appears after GUILTY
# ✓ undo reverses last placement
# ✓ clue gate blocks GUILTY when clues unsatisfied
```

Browser extension (screenshots required in PR body):
```
browser_navigate("http://localhost:5173")
browser_click('[data-testid="btn-quickplay"]')
browser_click('[data-testid="theme-card-coffee-shop"]')
browser_click('[data-testid="difficulty-easy"]')
browser_screenshot()     → game screen with Coffee Shop floor plan, suspect cards, clue cards
# [dismiss narrative intro]
# [place suspects at window.__alibi_puzzle.solution positions]
browser_screenshot()     → all suspects placed, victim cell highlighted, clues struck through
browser_click('[data-testid="victim-cell"]')
browser_screenshot()     → GUILTY stamp with killer name visible
browser_errors()         → zero
```

**Pass criteria:**
- [ ] `gameplay.spec.ts` exits 0 for Coffee Shop (Easy/Medium/Hard)
- [ ] PR body: game screen screenshot, solved screenshot, GUILTY screenshot
- [ ] Killer name on GUILTY matches `window.__alibi_puzzle.killer`
- [ ] Zero JS errors

---

## Journey 4: Campaign mode — progress, persistence, rank

```bash
npx playwright test tests/e2e/campaign.spec.ts
# ✓ New Campaign creates 12 cases with correct difficulty progression (4E/4M/4H)
# ✓ Completing Case 1 advances to Case 2, saves to localStorage
# ✓ Page reload restores campaign state, current case still accessible
# ✓ 3 save slots are independent — completing Case 1 in slot 1 does not affect slot 2
# ✓ Completing 4 cases → rank advances to Investigator
# ✓ Campaign board shows correct status per case card
```

Browser extension:
```
browser_click('[data-testid="btn-campaign"]')
browser_screenshot()     → campaign board with 12 case cards, Case 1 unlocked
browser_click('[data-testid="case-card-0"]')
# [solve puzzle]
browser_screenshot()     → after solve: Case 1 shows ✅, Case 2 unlocked
# [reload page]
browser_navigate("http://localhost:5173")
browser_click('[data-testid="btn-campaign"]')
browser_screenshot()     → campaign state persisted, Case 1 still ✅
browser_errors()         → zero
```

**Pass criteria:**
- [ ] `campaign.spec.ts` exits 0
- [ ] Case progression and persistence correct
- [ ] Rank advances correctly
- [ ] 3 save slots independent
- [ ] PR body: campaign board screenshot before + after first solve

---

## Journey 5: Daily Case + streak + all 10 themes playable

```bash
npx playwright test tests/e2e/daily.spec.ts
# ✓ Same date → same puzzle (deterministic seed)
# ✓ Streak increments on consecutive days
# ✓ Streak resets after gap day

npx playwright test tests/e2e/gameplay.spec.ts  # parameterized
# ✓ All 10 themes × Easy difficulty → unique solution, GUILTY screen reached
# ✓ All 10 themes × Medium → same
# ✓ All 10 themes × Hard → same
```

Browser extension:
```
browser_screenshot()      → home screen shows Daily Case card with today's theme + difficulty
browser_click('[data-testid="btn-daily"]')
browser_screenshot()      → daily puzzle loaded
# [solve it]
browser_screenshot()      → GUILTY + share card showing date, theme, time, streak
# Navigate to each theme in Quick Play, screenshot GUILTY stamp for all 10 themes
browser_errors()          → zero across all themes
```

**Pass criteria:**
- [ ] `daily.spec.ts` exits 0
- [ ] All 10 themes GUILTY reached in Playwright
- [ ] PR body: 10× GUILTY stamps (one per theme) + daily completion card
- [ ] Daily seed deterministic (same output across two test runs on same date)
- [ ] Zero JS errors across all themes and difficulties

---

## Journey Status

| Journey | Status | Last checked | Notes |
|---|---|---|---|
| 1: Build + deploy | ✅ Passing | 2026-04-15 | npm run build + test + lint exit 0; GitHub Pages deployed at pnz1990.github.io/alibi/ |
| 2: Generator valid across all themes | ✅ Passing | 2026-04-15 | 241 unit tests pass; 10 themes × 3 difficulties validated in generator.test.ts |
| 3: Coffee Shop playthrough | ✅ Passing | 2026-04-15 | gameplay.spec.ts passes; GUILTY screen reached; share card shown |
| 4: Campaign mode + persistence | ✅ Passing | 2026-04-15 | campaign.spec.ts 6/6; board wired to localStorage (#56 merged); slot picker works |
| 5: Daily Case + all 10 themes | ✅ Passing | 2026-04-15 | daily.spec.ts passes; all 10 themes load without errors; 47 e2e tests pass |
