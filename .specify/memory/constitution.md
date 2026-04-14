# ALIBI Constitution

**Version**: 3.0.0 | **Ratified**: 2026-04-14 | **Last Amended**: 2026-04-14

This document governs all agent behavior. It supersedes all other guidance when there is a conflict.

---

## I. The Game Is The Product

ALIBI is a browser game. The measure of every item is: does the game play correctly and enjoyably in a real browser across all modes?

Unit tests are necessary but not sufficient. Every PR touching render/game/modes/storage must be verified with Playwright (`npm run test:e2e`) AND the OpenCode browser extension (`browser_screenshot`, `browser_errors`). A PR that passes unit tests but has never run in a browser is not done.

---

## II. Pure Engine, Side-Effectful Shell

`src/engine/` contains only pure functions. No DOM, no canvas, no localStorage, no audio, no side effects whatsoever. Input data → output data.

`src/render/`, `src/game/`, `src/modes/`, `src/storage/`, `src/screens/` contain all side effects. They call the engine. The engine never calls them.

Violating this boundary is the single most common failure mode. Re-read AGENTS.md §Anti-Patterns before every PR.

---

## III. TDD — Tests First

Failing test → passing code → refactor. Always.

Engine code: Vitest unit test first.
Render/game/modes/storage code: Playwright e2e test first (or assertions added to existing spec).

---

## IV. localStorage Is The Only Persistence Layer

There is no server, no database, no sync. All persistence goes through `src/storage/progress.ts`. No other file may read from or write to localStorage directly — this is enforced by QA.

The localStorage schema is defined in `src/storage/schema.ts`. All writes must conform to it. Adding a new key requires updating schema.ts first.

---

## V. Zero Runtime NPM Dependencies

The production bundle imports no npm packages not authored for this project. SVG assets are bundled via Vite `?raw` import — this is a static asset bundling pattern, not an npm runtime dependency.

Adding any runtime npm package requires `[NEEDS HUMAN]` escalation.

---

## VI. data-testid Is An API Contract

Every interactive and observable DOM element has a `data-testid` per AGENTS.md §E2E Testing. Removing or renaming one without updating the corresponding Playwright spec is a breaking change.

---

## VII. The Generator Is The Source of Truth

There are no static levels or hand-authored puzzle solutions. All puzzle content comes from `src/engine/generator.ts`. The solver must confirm exactly 1 solution before any puzzle reaches the player. `window.__alibi_puzzle` must be set in DEV/TEST builds.

---

## VIII. Campaign Logic Is Isolated

Campaign seed derivation, case generation, rank calculation, and save slot management live exclusively in `src/modes/campaign.ts`. Daily Case logic lives exclusively in `src/modes/daily.ts`. No other module implements these rules.

---

## IX. Escalate, Never Workaround

If a requirement cannot be implemented as specified: post `[NEEDS HUMAN]` with the exact question and file:line. Never simplify a requirement unilaterally, defer it silently, or implement a workaround that violates this constitution.
