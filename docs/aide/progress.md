# alibi: Current Progress

> Updated by standalone agent — 2026-04-15 (Batch 5)

## Current State

- **Active queue**: Stage 6 (polish + v1.0 release)
- **Last completed**: All 10 themes — Stage 5 complete (PR #38)

## Stage Completion

| Stage | Name | Status | Notes |
|---|---|---|---|
| 0 | Skeleton + Toolchain | ✅ Done | PR #23 |
| 1 | Core Engine | ✅ Done | PR #25 |
| 2 | Coffee Shop Theme + Game Screen | ✅ Done | PRs #26, #28, #29 |
| 3 | Home Screen + All Three Play Modes | ✅ Done | PRs #30, #32 |
| 4 | Themes 2–4 (Bookstore, Backyard, Mall) | ✅ Done | PRs #34, #35, #36 |
| 5 | Themes 5–10 (Restaurant → Carnival) | ✅ Done | PRs #37, #38 |
| 6 | Polish + v1.0 Release | 🔄 Next | Lighthouse ≥80, mobile layout, bitmap font, GitHub release |

## Journey Status

| Journey | Status | Notes |
|---|---|---|
| 1: Build + deploy | 🟡 Partial | Build ✅, unit+e2e ✅; home screen visible at root ✅; GitHub Pages deployed |
| 2: Generator valid across all themes | 🟡 Partial | All 10 themes pass × 3 difficulties on seed=42; some constrained floor plans (issue #24) |
| 3: Coffee Shop playthrough | ✅ PASS | Full end-to-end: placement → GUILTY → share. Playwright + browser extension validated |
| 4: Campaign mode + persistence | 🟡 Partial | Logic + storage done; board UI stub (full campaign wiring deferred to Stage 6) |
| 5: Daily Case + all 10 themes | 🟡 Partial | Daily loads; all 10 themes available in Quick Play; daily rotation covers all themes |

## Test Summary
- Unit tests: 230 (13 files)
- E2E tests: 40 (Playwright, chromium)
- Bundle: 98.13 kB (gzip: 22.59 kB)
- Lint: clean
