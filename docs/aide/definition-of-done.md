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
npm run lint            # must exit 0, zero findings
# CI deploys to gh-pages branch on merge to main
# https://pnz1990.github.io/alibi/ loads a 9x9 grid
```

### Pass criteria

- [ ] `npm run build` exits 0 with no errors
- [ ] `npm test` exits 0 with all tests passing
- [ ] `npm run lint` exits 0 with zero findings
- [ ] GitHub Pages URL renders an HTML page with a canvas element
- [ ] No JS errors in the browser console on load

---

## Journey 2: Logic engine correctly validates placements

**The user story**: A developer runs the unit tests and all clue evaluators and win-condition logic pass with verified edge cases.

### Exact steps that must work

```bash
npm test
# All tests in src/engine/*.test.ts must pass:
# - grid: placement allowed only on Floor/Seat, not Solid/Wall
# - grid: placement BLOCKED (radial menu suppressed) when row or column already occupied
# - logic: Rule of One — placing suspect in occupied row/col returns blocked=true
# - logic: win condition fires only when all 8 placed AND all clues satisfied
# - logic: victim cell highlighted only after all 8 suspects placed
# - clues: all 12 clue type evaluators pass test suites (fixedPosition, isBeside,
#          isNotBeside, isInRoom, isNotInRoom, isInSameRoom, isInDifferentRoom,
#          isInSameRow, isInSameCol, isFarFrom, isNorthOf, isSouthOf)
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
3. Read the 9 clues in the sidebar (see docs/level-designs.md for the exact clue set)
4. Click a Floor/Seat cell → radial menu appears with suspects A–H
5. Select a suspect → token placed, row+column shadow drawn
6. Repeat until all 8 suspects placed satisfying all clues
7. All clues show strikethrough in sidebar
8. One empty valid cell remains highlighted (E-9 in Level 1)
9. Click it → victim sprite (placeholder "?") appears
10. "GUILTY" stamp animation plays, killer identified as Elias
```

### Pass criteria

- [ ] Radial menu opens on valid cell click
- [ ] Shadow overlay covers the correct row and column after each placement
- [ ] Clue text strikes through when satisfied
- [ ] Exactly one valid empty cell remains after all 8 suspects placed
- [ ] Victim sprite appears on that cell on click
- [ ] "GUILTY" stamp appears with the correct killer name

---

## Journey 4: Invalid placement blocked + clue gate enforced

**The user story**: A player places all 8 suspects, but some clues are still unsatisfied. The game should not trigger the win sequence; it should signal which clues are wrong. Then the player fixes them, and the game correctly proceeds to the GUILTY screen.

### Exact steps that must work

```
1. Place all 8 suspects in positions that satisfy most but not all clues
2. The victim cell is highlighted (all rows/cols blocked)
3. Click the victim cell
4. Expected: unsatisfied clues flash red in sidebar; message "Something doesn't add up..."
5. Expected: NO body reveal, NO GUILTY stamp
6. Player moves a suspect to satisfy all clues
7. All clue texts show strikethrough
8. Click victim cell again
9. Expected: body reveal + GUILTY stamp for Elias (Level 1)
```

### Exact steps that must work

```
1. Click a Wall tile → nothing happens (no radial menu, no flash)
2. Place suspect A in row 1 (y=0) at a valid cell
3. Click any other cell in row 1 (y=0) → cell flashes red, no radial menu opens
4. Click any other cell in the same column as A → cell flashes red, no radial menu opens
5. Click the cell occupied by A → radial menu opens with "Clear" option
6. Clear A → row and column shadows removed, that row/col become available again
```

### Pass criteria

- [ ] Wall tiles are unclickable (no radial menu, no flash)
- [ ] Clicking a cell in an occupied row or column flashes the cell red and does NOT open the radial menu
- [ ] Clicking a placed suspect opens the radial menu with a "Clear" option
- [ ] Clearing a suspect removes the row/column shadow and makes those positions available again
- [ ] Clicking the victim cell while any clue is unsatisfied: unsatisfied clues flash red, no GUILTY screen
- [ ] After all clues satisfied: clicking victim cell triggers body reveal + GUILTY stamp
- [ ] No JS errors thrown on any invalid placement attempt

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
| 4: Invalid placement + clue gate | ❌ Not started | — | Requires Stage 2 |
| 5: All 4 levels playable | ❌ Not started | — | Requires Stage 4 |
