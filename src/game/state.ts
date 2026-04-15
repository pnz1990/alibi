/**
 * Game state — tracks placements, clue satisfaction, and game phase.
 *
 * Pure data + pure functions. No DOM, no canvas, no localStorage.
 * Delegates all clue evaluation to src/engine/clues.ts.
 */

import type { Puzzle } from '../engine/generator';
import type { SuspectPlacement } from '../engine/logic';
import { evaluateClue } from '../engine/clues';
import { getVictimCell } from '../engine/logic';

export type GamePhase = 'playing' | 'guilty' | 'ended';

export interface GameState {
  placements:     Map<string, SuspectPlacement>;
  satisfiedClues: Set<number>;
  errorClues:     Set<number>;
  victimVisible:  boolean;
  victimCell:     { x: number; y: number } | null;
  phase:          GamePhase;
  elapsedMs:      number;
}

/**
 * Creates a fresh game state for the given puzzle.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createGameState(_puzzle: Puzzle): GameState {
  return {
    placements:     new Map(),
    satisfiedClues: new Set(),
    errorClues:     new Set(),
    victimVisible:  false,
    victimCell:     null,
    phase:          'playing',
    elapsedMs:      0,
  };
}

/**
 * Returns a new GameState with the given suspect placed at (x, y).
 * Does not mutate the input state.
 */
export function placeSuspect(
  state: GameState,
  puzzle: Puzzle,
  suspectId: string,
  x: number,
  y: number,
): GameState {
  const placements = new Map(state.placements);
  placements.set(suspectId, { suspectId, x, y });
  return recompute({ ...state, placements }, puzzle);
}

/**
 * Returns a new GameState with the given suspect removed.
 */
export function removeSuspect(state: GameState, puzzle: Puzzle, suspectId: string): GameState {
  const placements = new Map(state.placements);
  placements.delete(suspectId);
  return recompute({ ...state, placements }, puzzle);
}

/**
 * Returns a new GameState from a placements snapshot (used by undo/redo).
 */
export function restoreSnapshot(
  state: GameState,
  puzzle: Puzzle,
  snapshot: Map<string, SuspectPlacement>,
): GameState {
  return recompute({ ...state, placements: new Map(snapshot) }, puzzle);
}

/**
 * Triggers the win-check sequence.
 * Returns a new state with phase='guilty' if all clues are satisfied,
 * or with errorClues populated if any clue fails.
 */
export function checkWin(state: GameState): GameState {
  if (state.satisfiedClues.size === 0 && state.placements.size > 0) {
    // All clues unmet — this shouldn't happen with a valid puzzle
    return state;
  }
  const totalClues = state.satisfiedClues.size + state.errorClues.size;
  const allSatisfied = state.errorClues.size === 0 && totalClues > 0;

  if (allSatisfied && state.victimVisible) {
    return { ...state, phase: 'guilty' };
  }
  return state; // errorClues already set by recompute
}

/**
 * Recomputes satisfied/error clues and victim cell after a placement change.
 */
function recompute(state: GameState, puzzle: Puzzle): GameState {
  const satisfied = new Set<number>();
  const errors = new Set<number>();

  puzzle.clues.forEach((clue, i) => {
    const result = evaluateClue(puzzle.floorPlan, clue, state.placements);
    if (result === true) satisfied.add(i);
    else if (result === false) errors.add(i);
    // null = suspect not placed yet — neither satisfied nor error
  });

  const victimCell = getVictimCell(puzzle.floorPlan, Array.from(state.placements.values()));
  const victimVisible = victimCell !== null;

  return {
    ...state,
    satisfiedClues: satisfied,
    errorClues:     errors,
    victimVisible,
    victimCell,
  };
}
