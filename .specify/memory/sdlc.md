# ALIBI SDLC Process

> This document is referenced in AGENTS.md. It defines the team process.

## Overview

ALIBI uses an autonomous multi-agent SDLC implemented via the `otherness` framework.
All development follows the standalone agent loop defined in `~/.otherness/agents/standalone.md`.

## Phases Per Item

```
1. [🎯 COORD] Claim item via branch push (atomic lock)
2. [🔨 ENG]   Spec-first → TDD → implement → self-validate
3. [🔍 QA]    Adversarial review → approve → merge
4. [🔄 SM]    Batch review (every N items): flow, code health, process improvement
5. [📋 PM]    Product review (every 3 batches): vision alignment, validation scenarios
   → LOOP
```

## Item Lifecycle

| State | Meaning |
|---|---|
| `todo` | In queue, unclaimed |
| `assigned` | Branch created on remote, work starting |
| `in_progress` | Implementation underway |
| `in_review` | PR open, awaiting CI + QA |
| `done` | PR merged |

## Branch Protocol

- Every item gets a branch `feat/<item-id>` pushed to remote before work begins
- The remote push is the atomic lock — first push wins
- Work happens in a git worktree `../<repo>.<item-id>`
- Code PRs target `main`; state changes target `_state` branch

## TDD Requirements

- Engine code: Vitest unit test **first**
- Render/game/modes/storage: Playwright e2e test **first**
- No PR without failing tests → passing tests cycle

## QA Requirements (per AGENTS.md §Anti-Patterns)

Every PR must pass:
- `npm run build` — zero TypeScript errors
- `npm test` — all unit tests pass
- `npm run lint` — zero ESLint errors
- `npm run test:e2e` — all Playwright tests pass
- browser_screenshot and browser_errors (zero) for render/game PRs

## Stop Condition

The agent does not stop on empty backlog. Exit only when:
1. All journeys in `docs/aide/definition-of-done.md` are ✅ with live evidence
2. Human confirms project complete

## State Storage

All state lives on the `_state` branch in `.otherness/state.json`.
Code lives on `main`. Never mix them.
