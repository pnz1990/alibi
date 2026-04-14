# ALIBI Constitution

**Version**: 1.0.0 | **Ratified**: 2026-04-14 | **Last Amended**: 2026-04-14

This document governs agent behavior on the ALIBI project. It supersedes all other guidance when there is a conflict.

---

## I. The Game Is The Product (NON-NEGOTIABLE)

ALIBI is a browser game. The measure of every item is: does the game play correctly in a real browser?

Unit tests are necessary but not sufficient. Every feature that affects the player experience MUST be verified end-to-end using Playwright (npm run test:e2e) AND the OpenCode browser extension (browser_screenshot, browser_click, browser_errors). See AGENTS.md §E2E Testing for the full protocol.

A PR that passes unit tests but has never been run in a browser is not done.

---

## II. Pure Engine, Side-Effectful Shell

All game logic (grid model, Rule of One, spatial mask, clue evaluation, win condition, solver) lives in src/engine/ as pure functions with zero side effects. These functions take data, return data. They have no knowledge of the DOM, canvas, localStorage, or audio.

All side effects (rendering, input, sound, save, share) live in src/render/ and src/game/. They call the engine; the engine never calls them back.

Violating this boundary is the single most common failure mode in game code. Re-read AGENTS.md §Anti-Patterns before every PR.

---

## III. TDD — Tests First (NON-NEGOTIABLE)

Implementation order: failing test → passing code → refactor. Always.

For engine code: write a Vitest unit test first.
For render/game code: write a Playwright e2e test first (or add assertions to an existing spec).
No code is merged without a test that would catch a regression in that exact behavior.

---

## IV. Zero Runtime Dependencies

The production bundle contains zero npm packages not authored for this project. Vite, Vitest, Playwright, ESLint, TypeScript are build/dev tools — they do not appear in the bundle. Adding a runtime dependency requires a [NEEDS HUMAN] escalation. It will not be approved for v1.0.

---

## V. data-testid Is An API Contract

Every interactive and observable DOM element must have a data-testid attribute matching the table in AGENTS.md §E2E Testing. These are part of the public contract between the render layer and the test layer. Removing or renaming a data-testid without updating the Playwright spec is a breaking change and will fail CI.

---

## VI. Level JSON Is Ground Truth

The solution, clues, zones, and narrative in each level JSON file are the authoritative source of truth. The engine validates against the JSON; it never hard-codes level knowledge. The solver (npm run verify-levels) must confirm a unique solution before any level JSON is merged.

---

## VII. Escalate, Never Workaround

If a requirement cannot be implemented as specified: post [NEEDS HUMAN] with the exact question. Do not simplify the requirement, defer it, or implement a workaround that violates the constitution.
