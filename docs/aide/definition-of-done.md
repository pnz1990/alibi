# Definition of Done

> The project is complete when every journey below passes end-to-end on the live GitHub Pages deployment.

---

## Journey 1: Skeleton loads and deploys

**The user story**: A developer clones the repo, runs `npm run build`, and the project builds and deploys to GitHub Pages without errors.

### Exact steps that must work

```bash
git clone https://github.com/pnz1990/alibi
cd alibi
npm install
npm run build           # must exit 0
npm test                # must exit 0, all tests green
# CI deploys to gh-pages branch on merge to main
# https://pnz1990.github.io/alibi/ loads a 9x9 grid
```

### Pass criteria

- [ ] `npm run build` exits 0 with no errors
- [ ] `npm test` exits 0 with all tests passing
- [ ] GitHub Pages URL renders an HTML page with a canvas element
- [ ] No JS errors in the browser console on load

---

## Journey 2: Logic engine correctly validates placements

**The user story**: A developer runs the unit tests and all clue evaluators and win-condition logic pass with verified edge cases.

### Exact steps that must work

```bash
npm test
# All tests in src/engine/*.test.ts must pass:
# - grid: placement allowed only on Floor/Seat, not Solid
# - logic: Rule of One blocks row+column after placement
# - logic: win condition fires when exactly 1 valid cell remains after 8 placements
# - clues: isBeside, isInRoom, isInSameRow, isFarFrom, isNorthOf all pass their test suites
# - solver: Level 1 JSON has exactly one solution
```

### Pass criteria

- [ ] All engine unit tests pass
- [ ] Solver confirms Level 1 has exactly one solution
- [ ] Coverage report shows >90% line coverage on `src/engine/`

---

## Journey 3: Player completes Level 1 (The Speakeasy)

**The user story**: A new player opens the game, reads the alibis, places all 8 suspects correctly, clicks the victim cell, and sees the "GUILTY" stamp.

### Exact steps that must work

```
1. Open https://pnz1990.github.io/alibi/ in Chrome/Firefox/Safari
2. Level 1 (The Speakeasy) is shown
3. Read the 6 clues in the sidebar
4. Click a Floor cell → radial menu appears with suspects A–H
5. Select a suspect → token placed, row+column shadow drawn
6. Repeat until all 8 suspects placed satisfying all clues
7. All clues show strikethrough in sidebar
8. One empty valid cell remains highlighted
9. Click it → victim sprite appears
10. "GUILTY" stamp animation plays, killer identified
```

### Pass criteria

- [ ] Radial menu opens on valid cell click
- [ ] Shadow overlay covers the correct row and column after each placement
- [ ] Clue text strikes through when satisfied
- [ ] Exactly one valid empty cell remains after all 8 suspects placed
- [ ] Victim sprite appears on that cell on click
- [ ] "GUILTY" stamp appears with the correct killer name

---

## Journey 4: Incorrect placement is blocked

**The user story**: A player tries to place a suspect on a wall tile or in a cell that violates the Rule of One; the game prevents or signals the invalid move.

### Exact steps that must work

```
1. Click a Solid tile → nothing happens (no radial menu)
2. Place suspect A in row 3 → column shadow drawn
3. Try to place suspect B in the same row 3 → either blocked or flagged as conflict
4. Try to place suspect C in the same column as A → either blocked or flagged
```

### Pass criteria

- [ ] Solid tiles are unclickable
- [ ] Duplicate row/column placement is either prevented or visually flagged as a conflict
- [ ] No JS errors thrown on invalid placement attempt

---

## Journey 5: All 4 levels are playable and uniquely solvable

**The user story**: A player completes all 4 levels, each with its own theme and pixel-art assets.

### Exact steps that must work

```bash
# Solver verification (automated, part of CI)
npm run verify-levels
# Expected: "Level 001: UNIQUE SOLUTION ✓"
# Expected: "Level 002: UNIQUE SOLUTION ✓"
# Expected: "Level 003: UNIQUE SOLUTION ✓"
# Expected: "Level 004: UNIQUE SOLUTION ✓"

# Manual: level select screen shows 4 levels
# Manual: each level loads with correct theme tileset
# Manual: each level is completable following its clues
```

### Pass criteria

- [ ] `npm run verify-levels` exits 0, all 4 levels report unique solution
- [ ] Level select screen shows 4 entries with theme names
- [ ] Each level renders the correct theme sprite sheet
- [ ] Each level is completable end-to-end manually

---

## Journey Status

| Journey | Status | Last checked | Notes |
|---|---|---|---|
| 1: Skeleton loads and deploys | ❌ Not started | — | Requires Stage 0 |
| 2: Logic engine validates | ❌ Not started | — | Requires Stage 1 |
| 3: Player completes Level 1 | ❌ Not started | — | Requires Stages 2–3 |
| 4: Invalid placement blocked | ❌ Not started | — | Requires Stage 2 |
| 5: All 4 levels playable | ❌ Not started | — | Requires Stage 4 |
