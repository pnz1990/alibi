# alibi: Vision

> Created: 2026-04-14
> Status: Active

## Immediate Goal

Build and deploy a fully playable, infinitely replayable ALIBI on GitHub Pages. The game procedurally generates a unique puzzle on every play — no two games are the same. Static hosting, no backend, no accounts.

## Project Overview

ALIBI is a browser-based murder mystery logic-deduction game, directly inspired by the book **Murdoku** by Manuel Garand. The player places suspects on a top-down illustrated floor plan by satisfying witness "alibis." When all suspects are correctly placed, one empty cell remains — the victim's location — and the killer is identified.

The core mechanic: **Sudoku row/column exclusion + spatial room constraints + natural-language clues that triangulate exact positions.**

Every game is procedurally generated from a **theme template** — a named setting (Coffee Shop, Bookstore, Backyard, etc.) with a fixed floor plan, furniture sprites, and narrative flavor. The generator places suspects, assigns clues that uniquely identify the solution, and produces a playable puzzle. Players get a fresh solvable mystery every time. The same seed always reproduces the same puzzle (shareable).

### Why this project exists

Murdoku has no digital version. Its book format limits it to 80 static puzzles. Procedural generation gives it infinite replayability. The everyday-setting aesthetic — Coffee Shop, Backyard, Mall — is more approachable than noir, appealing to NYT Games fans and puzzle fans broadly.

### Key design decisions

1. **6×6 grid.** The Murdoku book uses 6×6 with 6–10 suspects. This is the correct scale — tractable for generation, solvable in 5–15 minutes.

2. **Procedural generation, seeded.** A seeded PRNG generates suspect placement, object placement, and clue set. Seed in URL hash enables sharing. "New Puzzle" gives infinite content.

3. **Theme templates provide setting; generator fills puzzle.** A theme defines: floor plan shape, room names, furniture sprite catalog, tile occupancy rules, narrative templates, suspect name set. The generator works within a theme's constraints.

4. **Real illustrated furniture sprites.** Plants, chairs, shelves, cash registers, beds — recognizable SVG icons bundled with the app. No runtime fetch. These are a necessary bundled asset dependency — the zero-deps rule applies to npm runtime packages, not to bundled SVG assets.

5. **Natural-language clues.** "He was beside a table." "She was in the fifth column." "He was not beside a plant." The generator produces these from templates after computing the solution.

6. **Static GitHub Pages.** No server, no API. Seed in URL hash. Everything in the browser.

## Themes (v1.0 — 4 themes)

Each theme is a TypeScript module: floor plan config + SVG sprite catalog + narrative templates + suspect name set.

| Theme | Setting | Key rooms | Key furniture |
|---|---|---|---|
| **Coffee Shop** | Urban café | Bar, Main Area, Restroom | Chair, plant, cash register, table |
| **The Bookstore** | Local bookshop | Crime Novels, Non-Fiction, Romance Novels, Best Sellers, Checkout | Shelf, table, cash register |
| **Backyard** | Suburban home | Backyard, Jacuzzi, Deck, Bedroom, Living Room, Kitchen | Plant, chair, bed, sofa |
| **Holiday Shopping** | Christmas mall | Electronics, Santa's Village, Toy Store, Walkway, Coffee Shop | Shelf, register, tree, chair |

## Release Philosophy

- `v1.0` — 4 themes, infinite procedural generation, shareable seeds, desktop.
- `v1.1` — additional themes, mobile polish, daily challenge (fixed daily seed).

## Demo Benchmark

A new player opens the URL. They see an illustrated floor plan, portrait suspect cards, natural-language clue cards. They place suspects, check off clues, click the last cell, see "GUILTY." They click "New Puzzle" and get a different puzzle. No instructions needed.
