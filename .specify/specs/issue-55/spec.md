# Spec: Campaign Board Wired to CampaignSave localStorage (#55)

## Zone 1 — Obligations (every item is falsifiable)

1. `mountCampaignBoard()` MUST call `loadCampaign(1)`, `loadCampaign(2)`, `loadCampaign(3)` on mount.

2. If no slots have saves: auto-create a new campaign in slot 1 via `createNewCampaign(1)` → `saveCampaign()` → show the 12-case board for that slot immediately.
   - This maintains e2e test compatibility (tests start with empty localStorage → get a fresh board with 12 cards).

3. If 1+ slots have saves: show a slot picker with one card per occupied slot (plus "New Campaign" for empty slots, up to 3 total). Each card shows: slot number, started date, current case number, detective rank.
   - Clicking a slot → show that slot's 12-case board.
   - Clicking "New Campaign" on an empty slot → `createNewCampaign(slot)` → `saveCampaign()` → show board.

4. The 12-case board shows each case from `CampaignSave.cases[i]`:
   - Case number (1-based label)
   - Theme name from `themeId` (human-readable, from theme registry)
   - Difficulty badge (easy/medium/hard CSS class)
   - Status: unlocked/locked/solved per `CaseRecord.status`
   - Solve time if `status === 'solved'`
   - `data-testid="case-card-{i}"`, `data-testid="case-status-{i}"`

5. Clicking an unlocked/in-progress case navigates to:
   `?theme={themeId}&difficulty={difficulty}&seed={seed}&campaignSlot={slot}&campaignCase={i}`

6. `src/screens/game.ts` MUST read `campaignSlot` and `campaignCase` URL params.
   - On `onVictimClick` (GUILTY): if campaign params present, call `completeCampaignCase(save, caseIndex, elapsedMs, killerName)` then `saveCampaign(updated)`.
   - After save: navigate to `?mode=campaign` (back to campaign board).

7. Detective rank shown in the slot picker card and optionally at the top of the case board.

8. All existing `data-testid` attributes preserved. Existing e2e tests pass unchanged.

## Zone 2 — Implementer's judgment

- How to handle "back to slot picker vs board" navigation: URL param `?mode=campaign` returns to board; `?mode=campaign&slot=N` goes directly to board for slot N.
- Whether to show "New Campaign" button on the case board for starting fresh.
- Visual styling of slot picker (can reuse existing `.alibi-case-card` styles).

## Zone 3 — Scoped out

- Deleting/overwriting a save slot (requires `[NEEDS HUMAN]` design decision).
- Replaying completed cases (out of scope for this issue).
- Chief Inspector rank (requires 3 full campaigns — `calculateRank` in campaign.ts already handles senior, which is 12 solved; chief requires cross-campaign tracking, out of scope).
