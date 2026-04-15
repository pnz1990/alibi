# Full Game State Machine

## What this does

Wires the game into a fully playable puzzle experience. The player can click cells
to place and remove suspects via a radial menu, undo/redo placements, hear audio
feedback, save/resume in-progress state across page loads, and trigger the win
sequence. This is the top-level game loop that coordinates engine, renderer,
storage, and audio.

## Obligations (Zone 1)

### state.ts — game state machine
- Exports `GameState` interface and `createGameState(puzzle, theme)` factory.
- Tracks: `placements` (Map<suspectId, {x,y}>), `satisfiedClues` (Set<number>),
  `errorClues` (Set<number>), `victimVisible` (boolean), `phase` enum
  (`'playing'|'guilty'|'ended'`).
- `updateClueState(state, puzzle)` recomputes `satisfiedClues` and `errorClues`
  from current placements using engine clue evaluators. No clue evaluation logic
  implemented here — it delegates to `src/engine/clues.ts`.
- `checkVictimReady(state, puzzle)` returns true when all N suspects are placed
  and exactly 1 victim cell remains (as returned by `getVictimCell`).

### input.ts — click handler + radial menu
- `attachInputHandlers(canvas, state, puzzle, theme, onStateChange)` wires click
  events on the canvas.
- Clicking a placeable cell with no suspect triggers `showRadialMenu` — a DOM
  overlay listing suspect names; clicking one places the suspect there.
- Clicking a cell that already has a suspect triggers `showRadialMenu` with a
  "Clear" option.
- The radial menu has `data-testid="radial-menu"`. Each suspect option has
  `data-testid="suspect-option-{id}"`. Clear has `data-testid="suspect-option-clear"`.
- After any placement change, `onStateChange` is called → re-renders canvas + sidebar.
- Clicking the victim cell (when highlighted) triggers the win-check sequence:
  if all clues satisfied → GUILTY screen; else → clue-gate message, `errorClues` flashes.
- Clicking the victim cell has `data-testid="victim-cell"` assigned to the DOM
  element overlaid on the victim cell position.
- Grid cells have `data-testid="cell-{x}-{y}"` divs overlaid on each canvas cell.

### undo.ts — undo/redo stack
- `UndoStack` class with max 50 entries.
- `push(snapshot)`, `undo()`, `redo()` — returns placement snapshots.
- `Ctrl/Cmd+Z` triggers undo; `Ctrl/Cmd+Shift+Z` triggers redo.
- Undo/redo buttons: `data-testid="btn-undo"`, `data-testid="btn-redo"`.

### sound.ts — Web Audio synthesis
- `playSound(type)` where type is one of: `'place'|'remove'|'clue-satisfied'|'solve'|'error'|'navigate'`.
- Uses Web Audio API oscillator synthesis — no audio files, no fetch.
- `toggleMute()` — mutes all sounds. `data-testid="btn-mute"` button.
- Gracefully does nothing if Web Audio is unavailable.

### share.ts — completion card
- `generateShareText(puzzle, solveTimeMs)` returns a plain-text string: theme name,
  difficulty, time, clue count.
- `copyToClipboard(text)` — uses navigator.clipboard. Falls back to textarea hack.
- Share button: `data-testid="btn-share"`. Visible after GUILTY screen.

### storage/progress.ts — PuzzleState persistence
- `savePuzzleState(key, state)` writes to localStorage key `alibi_puzzle_state`.
  Key = `${seed}-${themeId}-${difficulty}`.
- `loadPuzzleState(key)` reads from localStorage, returns `PuzzleState | null`.
- `clearPuzzleState(key)` removes the entry after puzzle completion.
- All localStorage reads/writes for puzzle state go through this module exclusively.

### screens/game.ts — updated wiring
- Replaces the stub wiring from item #14 with full game state machine.
- Shows `data-testid="prompt-resume"` if a saved state exists for this puzzle key.
- Provides a resume prompt with "Resume" and "Start Fresh" options.
- Wires undo/redo buttons, mute button, share button into the sidebar.

### Anti-patterns
- No engine logic (clue evaluation, solution derivation) in game/ or storage/.
- No localStorage access outside `src/storage/progress.ts`.
- All clue evaluation delegates to `src/engine/clues.ts` evaluators.

## Implementer's judgment (Zone 2)

- Exact radial menu DOM layout and animation.
- Audio synthesis waveform parameters (frequency, duration, envelope) per event.
- Canvas overlay div positioning strategy (absolute positioned divs over canvas).
- Share text format (within constraint: theme, difficulty, time, clue count present).
- Whether to debounce re-renders after state changes.

## Scoped out (Zone 3)

- Campaign progress updates — item #17.
- Home screen navigation — item #16.
- Daily streak updates — item #17.
- How-to-play overlay — present in overlay.ts from item #14, wired here but full
  slide content is Stage 6.

## Interfaces / Schema / Examples

### GameState
```typescript
interface GameState {
  placements:     Map<string, SuspectPlacement>;
  satisfiedClues: Set<number>;
  errorClues:     Set<number>;
  victimVisible:  boolean;
  phase:          'playing' | 'guilty' | 'ended';
  elapsedMs:      number;
}
```

### PuzzleState (localStorage)
```typescript
interface PuzzleState {
  placements: Record<string, {x: number; y: number}>;
  elapsedMs:  number;
  savedAt:    string; // ISO
}
```

### UndoStack
```typescript
class UndoStack {
  push(snapshot: Map<string, SuspectPlacement>): void;
  undo(): Map<string, SuspectPlacement> | null;
  redo(): Map<string, SuspectPlacement> | null;
  canUndo(): boolean;
  canRedo(): boolean;
}
```

### Test success criteria (Playwright)
1. `gameplay.spec.ts`: after placing all suspects at solution positions + clicking victim → `[data-testid="guilty-stamp"]` visible.
2. `gameplay.spec.ts`: clicking victim with incorrect solution → `[data-testid="msg-clue-gate"]` visible.
3. `undo.spec.ts`: place suspect, undo → suspect removed from canvas.
4. `save.spec.ts`: place suspects, reload page → resume prompt shown, placements restored.
5. `share.spec.ts`: after GUILTY → `[data-testid="btn-share"]` visible and clipboard copy works.
