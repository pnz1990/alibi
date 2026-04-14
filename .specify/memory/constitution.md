# ALIBI Constitution

**Version**: 2.0.0 | **Ratified**: 2026-04-14 | **Last Amended**: 2026-04-14

This document governs all agent behavior. It supersedes all other guidance.

---

## I. The Game Is The Product (NON-NEGOTIABLE)

ALIBI is a browser game. The measure of every item is: does the game play correctly and enjoyably in a real browser?

Unit tests are necessary but not sufficient. Every feature affecting the player experience MUST be verified with Playwright (`npm run test:e2e`) AND the OpenCode browser extension (`browser_screenshot`, `browser_errors`). A PR that passes unit tests but has never run in a browser is not done.

---

## II. Pure Engine, Side-Effectful Shell

`src/engine/` contains only pure functions. No DOM, no canvas, no localStorage, no audio. These functions take data and return data.

`src/render/` and `src/game/` contain all side effects. They call the engine. The engine never calls them back.

This boundary is the most important architectural rule. Violating it makes the engine untestable, the renderer fragile, and the generator unpredictable. Re-read AGENTS.md §Anti-Patterns before every PR.

---

## III. TDD — Tests First (NON-NEGOTIABLE)

Implementation order: failing test → passing code → refactor. Always.

Engine code: Vitest unit test first.
Render/game code: Playwright e2e test first (or assertions added to existing spec).
No code is merged without a test that would catch a regression.

---

## IV. Zero Runtime NPM Dependencies

The production bundle imports no npm packages not authored for this project. Vite, Vitest, Playwright, ESLint, TypeScript are build/dev tools only.

**Exception**: SVG sprite assets are bundled via Vite's `?raw` import mechanism. This is not an npm runtime dependency — it is a static asset bundling pattern. It is explicitly permitted.

Adding any npm package to the runtime bundle requires `[NEEDS HUMAN]` escalation. It will not be approved for v1.0.

---

## V. data-testid Is An API Contract

Every interactive and observable DOM element has a `data-testid` per AGENTS.md §E2E Testing. Removing or renaming one without updating the Playwright spec is a breaking change.

---

## VI. The Generator Is The Source of Truth

There are no static levels. All puzzle content comes from `src/engine/generator.ts` given a seed and a theme. The solver must confirm exactly 1 solution before any puzzle reaches the player. A puzzle with 0 or 2+ solutions is a critical bug — the generator must retry or throw, never silently deliver a broken puzzle.

`window.__alibi_puzzle` is exposed in DEV/TEST builds so Playwright tests can read solutions dynamically. This must never be removed or conditionally disabled during testing.

---

## VII. Escalate, Never Workaround

If a requirement cannot be implemented as specified: post `[NEEDS HUMAN]` with the exact question and file:line reference. Never simplify a requirement unilaterally, defer it silently, or implement a workaround that violates this constitution.
