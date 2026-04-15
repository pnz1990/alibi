# Visual Overhaul — Pixel Art Aesthetic

## What this does

Replaces the plain monospace UI with a pixel-art detective game aesthetic:
pixel/bitmap font everywhere, crisp canvas tile rendering using theme palettes,
noir home screen, notepad-style sidebar, animated GUILTY stamp.

## Obligations (Zone 1)

### Font
- Import `@fontsource/press-start-2p` in `src/main.ts`.
- All inline CSS strings that set `font-family` must use `'Press Start 2P', monospace`.
- The canvas renderer uses the same font string for text drawn via `ctx.font`.
- No runtime font fetches. The fontsource package bundles the font as static assets.

### Canvas renderer (src/render/canvas.ts)
- `renderGrid` uses `theme.colorPalette.floor`, `.wall`, `.seat`, `.accent` — zero hardcoded hex colors for tile fills.
- Canvas element has `image-rendering: pixelated` applied via `canvas.style`.
- Wall tiles: filled with `palette.wall`. Optionally draw a subtle brick/hatch pattern in a darker tone.
- Floor tiles: filled with `palette.floor`. 1px inner border in a slightly darker shade to create cell grid.
- Seat tiles: filled with `palette.seat`. Draw a small centered seat icon (simple rect/oval in darker tone).
- Object fallback tiles: background `#c8a96e`, 2px dark border, label in `'Press Start 2P'` at 6px.
- Suspect tokens: colored square (not circle) with 2px dark border and initial letter centered. Square = more pixel-art than circle.
- Blocked row/col shadow: darker semi-transparent overlay (unchanged, but applied after tiles).
- Victim cell: accent color pulsing border (unchanged logic, but use `palette.accent`).

### Home screen (src/screens/home.ts)
- Background: deep dark (`#0a0a12`) with a subtle scanline overlay (repeating CSS gradient).
- Title "ALIBI": pixel font, large, red, with a 4px offset hard shadow (no blur).
- Subtitle: pixel font at small size, muted color.
- Buttons: flat pixel-art style — no border-radius, solid border, no CSS transitions other than color swap on hover.
- Overall feel: like a DOS-era game title screen or a noir detective game menu.

### Sidebar (src/render/ui.ts)
- Background: off-white cream (`#f5f0e8`) — paper/notepad look.
- Font: `'Press Start 2P'` for labels, small size (8-9px).
- Suspect cards: manila folder tab style — colored left-border accent, cream background.
- Clue cards: lined notepad style — subtle horizontal rules between lines.
- Clue text font-size: 7–8px with `'Press Start 2P'` — smaller is acceptable given the retro style.
- Satisfied clues: ~~strikethrough~~ + faded color.
- Error clues: red border + background flash animation.

### GUILTY overlay (src/render/overlay.ts)
- Stamp effect: `@keyframes alibi-stamp` — element starts at scale(2) opacity 0, ends at scale(1) opacity 1 with a brief bounce (scale(0.95) at 80%).
- After stamp animates in: a brief red screen-flash (body background flash).
- Font: `'Press Start 2P'` for all text in the overlay.

### index.html
- `<canvas>` element must have `style="image-rendering: pixelated; image-rendering: crisp-edges;"`.

## Implementer's judgment (Zone 2)
- Exact pixel pattern for wall tiles (brick, hatch, solid, cross — any works).
- Exact colors for the scanline overlay (CSS gradient opacity 0.03–0.06).
- Button hover state color choice (darker shade vs accent color).
- Font sizes on clue cards (7px, 8px — whatever fits readably).
- Whether to draw a suspect initial or a small stick figure (initial is fine).

## Scoped out (Zone 3)
- SVG sprite assets — still stubs, renderer fallback still used.
- Portrait SVG assets.
- Mobile-specific layout changes.
- Campaign board visual treatment.

## Success criteria
1. `npm run build` passes — TypeScript clean.
2. `npm test` passes — 230 unit tests still green.
3. `npm run test:e2e` passes — all 40 Playwright tests green (no testid regressions).
4. `npm run lint` passes.
5. Browser screenshots show visually distinct pixel-art game aesthetic.
6. Zero JS errors in browser.
