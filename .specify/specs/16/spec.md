# Home Screen + Campaign Board + Theme Selector

## What this does

Provides the three navigation screens that gate the game modes:
1. **Home screen** (`screen-home`) — three buttons: Campaign, Quick Play, Daily Case
2. **Campaign board** (`screen-campaign-board`) — 12 case cards, only first unlocked
3. **Theme selector** (`screen-theme-select`) — 10 theme cards + Easy/Medium/Hard

Navigation is URL-hash based. No routing library.

## Obligations (Zone 1)

### Home screen
- Renders when URL has no `theme`/`difficulty`/`seed` params.
- Has `data-testid="screen-home"`.
- Three buttons: `btn-campaign`, `btn-quickplay`, `btn-daily`.
- Clicking `btn-quickplay` navigates to theme selector.
- Clicking `btn-campaign` navigates to campaign board.
- Clicking `btn-daily` navigates directly to today's daily puzzle URL.

### Campaign board
- Has `data-testid="screen-campaign-board"`.
- Shows 12 case cards: `data-testid="case-card-{0..11}"`.
- Each card has a status element: `data-testid="case-status-{0..11}"`.
- Case 0 is unlocked (no `locked` class). Cases 1–11 have `locked` CSS class.
- "New Campaign" button starts a fresh campaign and routes to Case 0 puzzle.
- Uses a stub campaign (no actual CampaignSave localStorage) — full campaign logic is item #17.

### Theme selector
- Has `data-testid="screen-theme-select"`.
- Shows one card per registered theme with `data-testid="theme-card-{themeId}"`.
- Three difficulty buttons: `data-testid="difficulty-easy"`, `"difficulty-medium"`, `"difficulty-hard"`.
- Selecting a theme + difficulty + clicking "Play" navigates to the puzzle URL with a random seed.

### Navigation (main.ts update)
- `main.ts` checks URL params:
  - No params → home screen
  - `?mode=campaign` → campaign board
  - `?mode=quickplay` → theme selector
  - `?theme=X&difficulty=Y&seed=Z` → game screen (existing)

## Implementer's judgment (Zone 2)

- Visual design of home screen (beyond buttons and testids).
- How navigation between screens is handled (can replace body content or use URL params).
- Campaign board stub layout (12 cards, theme/difficulty placeholder data acceptable).
- Theme selector card content (just themeId + name from registered themes).

## Scoped out (Zone 3)

- Actual campaign logic (seed derivation, save slots) — item #17.
- Daily Case logic (date-based seed, streak) — item #17.
- How-to-play overlay — Stage 6.
- Mobile-responsive design — Stage 6.

## Interfaces / Schema / Examples

### URL routing
```
/alibi/                     → home screen
/alibi/?mode=campaign       → campaign board
/alibi/?mode=quickplay      → theme selector
/alibi/?theme=X&difficulty=Y&seed=Z  → game screen
```

### Test success criteria
1. `data-testid="screen-home"` visible at root URL.
2. `btn-campaign`, `btn-quickplay`, `btn-daily` present.
3. Clicking `btn-quickplay` → `screen-theme-select` visible.
4. Clicking `btn-campaign` → `screen-campaign-board` with 12 case cards visible.
5. `case-status-0` does NOT have `locked` class.
6. `case-status-1` has `locked` class.
7. Each `theme-card-{id}` present for all registered themes.
8. Zero JS errors on all screens.
