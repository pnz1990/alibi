# alibi: Vision

> Created: 2026-04-14
> Status: Active

## Immediate Goal

Build and deploy a playable v1.0 of ALIBI on GitHub Pages. The game must support at least 4 complete levels across 4 themes, be fully playable on desktop browsers, and load in under 3 seconds on a standard connection. No backend. No accounts. No install.

## Project Overview

ALIBI is a browser-based logic-deduction puzzle game set in a noir pixel-art world. Players act as detectives who must place 8 suspects on a 9×9 grid by satisfying a set of textual "alibis" (clues) while obeying Sudoku-like row/column exclusion rules. When all suspects are placed correctly, a single cell remains — the victim's location — and the suspect sharing that room is the killer.

It is an online replica of the board game Murdoku, reimagined as a zero-dependency static web game hosted on GitHub Pages.

### Why this project exists

Murdoku is a physical board game with compelling logic mechanics but no digital version. Browser puzzle games like Sudoku, Nonogram, and Wordle prove that constraint-satisfaction puzzles with clean UIs achieve massive reach with zero infrastructure cost. ALIBI fills this gap with a noir aesthetic that sets it apart from clean/minimal puzzle game aesthetics.

### Key design decisions

1. **Static only** — no server, no API, no accounts. Deployable to GitHub Pages from a single `npm run build`. This is a hard constraint.
2. **Canvas rendering** — pixel art requires integer-scale blitting. HTML5 Canvas 2D, not DOM or CSS. No WebGL.
3. **Logic is pure TypeScript** — the engine (grid, clue evaluation, win detection) has no side effects and is fully unit-testable without a browser.
4. **Levels are JSON** — each level is a self-contained JSON file. Adding a new level requires no code change. A constraint solver verifies each level has exactly one solution before merge.
5. **Zero runtime npm dependencies** — the production bundle contains only code written for this project. Vite is a dev/build tool, not a runtime dependency.

## Release and Versioning Philosophy

- `v0.x` — pre-release iterations. Breaking changes allowed. Game may be incomplete.
- `v1.0` — first public release. Must pass all 5 definition-of-done journeys. Deployed to `https://pnz1990.github.io/alibi/`.
- Patch releases (`v1.0.x`) for bug fixes. Minor releases (`v1.x`) for new level packs or themes.

## Workshop / Demo Benchmarks

The game is considered "working" when a non-technical person can:
1. Open `https://pnz1990.github.io/alibi/` on a desktop browser with no instructions.
2. Select Level 1 (The Speakeasy).
3. Read the alibis, place all 8 suspects, click the victim cell, and see the "GUILTY" stamp — without reading documentation.

This is the acceptance target. Any friction in that path is a defect.
