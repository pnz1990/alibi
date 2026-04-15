/**
 * Game state — tracks placements, annotations, clue satisfaction, and game phase.
 *
 * Pure data + pure functions. No DOM, no canvas, no localStorage.
 * Delegates all clue evaluation to src/engine/clues.ts.
 */

import type { Puzzle } from '../engine/generator';
import type { SuspectPlacement } from '../engine/logic';
import type { CellAnnotations } from '../storage/schema';
import { evaluateClue } from '../engine/clues';
import { getVictimCell } from '../engine/logic';

export type GamePhase = 'playing' | 'guilty' | 'ended';

export interface GameState {
  placements:     Map<string, SuspectPlacement>;
  annotations:    CellAnnotations;
  satisfiedClues: Set<number>;
  errorClues:     Set<number>;
  victimVisible:  boolean;
  victimCell:     { x: number; y: number } | null;
  phase:          GamePhase;
  elapsedMs:      number;
}

export function emptyAnnotations(): CellAnnotations {
  return { x: [], candidates: {} };
}

/**
 * Creates a fresh game state for the given puzzle.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createGameState(_puzzle: Puzzle): GameState {
  return {
    placements:     new Map(),
    annotations:    emptyAnnotations(),
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

// ─────────────────────────────────────────────
// Annotation mutations (pure functions)
// ─────────────────────────────────────────────

/** Clones a CellAnnotations object deeply. */
function cloneAnnotations(a: CellAnnotations): CellAnnotations {
  return {
    x: [...a.x.map(([cx, cy]) => [cx, cy] as [number, number])],
    candidates: Object.fromEntries(
      Object.entries(a.candidates).map(([k, v]) => [k, [...v]])
    ),
  };
}

/**
 * Toggles the X mark on a cell. If X is present, removes it. If absent, adds it.
 * Returns a new GameState.
 */
export function toggleXAnnotation(state: GameState, x: number, y: number): GameState {
  const ann = cloneAnnotations(state.annotations);
  const idx = ann.x.findIndex(([cx, cy]) => cx === x && cy === y);
  if (idx >= 0) {
    ann.x.splice(idx, 1);
  } else {
    ann.x.push([x, y]);
  }
  return { ...state, annotations: ann };
}

/**
 * Adds a candidate suspect ? to a cell. No-op if already present.
 */
export function addCandidateAnnotation(
  state: GameState,
  x: number,
  y: number,
  suspectId: string,
): GameState {
  const ann = cloneAnnotations(state.annotations);
  const key = `${x},${y}`;
  if (!ann.candidates[key]) ann.candidates[key] = [];
  if (!ann.candidates[key].includes(suspectId)) {
    ann.candidates[key] = [...ann.candidates[key], suspectId];
  }
  return { ...state, annotations: ann };
}

/**
 * Removes a candidate suspect ? from a cell.
 */
export function removeCandidateAnnotation(
  state: GameState,
  x: number,
  y: number,
  suspectId: string,
): GameState {
  const ann = cloneAnnotations(state.annotations);
  const key = `${x},${y}`;
  if (ann.candidates[key]) {
    ann.candidates[key] = ann.candidates[key].filter(id => id !== suspectId);
    if (ann.candidates[key].length === 0) delete ann.candidates[key];
  }
  return { ...state, annotations: ann };
}

/**
 * Clears all annotation for a cell (X and all candidates).
 */
export function clearCellAnnotations(state: GameState, x: number, y: number): GameState {
  const ann = cloneAnnotations(state.annotations);
  const idx = ann.x.findIndex(([cx, cy]) => cx === x && cy === y);
  if (idx >= 0) ann.x.splice(idx, 1);
  const key = `${x},${y}`;
  delete ann.candidates[key];
  return { ...state, annotations: ann };
}

/**
 * When a suspect is placed at a cell, clears ? candidates for that suspect in all other cells,
 * and clears the candidate list for the target cell.
 */
export function clearCandidatesForPlacement(
  state: GameState,
  suspectId: string,
  x: number,
  y: number,
): GameState {
  const ann = cloneAnnotations(state.annotations);
  // Clear ? for this suspect in all cells
  for (const key of Object.keys(ann.candidates)) {
    ann.candidates[key] = ann.candidates[key].filter(id => id !== suspectId);
    if (ann.candidates[key].length === 0) delete ann.candidates[key];
  }
  // Also clear X on the target cell (if present — can't mark X where you place)
  const idx = ann.x.findIndex(([cx, cy]) => cx === x && cy === y);
  if (idx >= 0) ann.x.splice(idx, 1);
  return { ...state, annotations: ann };
}

/**
 * Returns a snapshot of (placements + annotations) for undo/redo.
 */
export interface GameSnapshot {
  placements:  Map<string, SuspectPlacement>;
  annotations: CellAnnotations;
}

export function takeSnapshot(state: GameState): GameSnapshot {
  return {
    placements:  new Map(state.placements),
    annotations: cloneAnnotations(state.annotations),
  };
}

export function restoreFromSnapshot(state: GameState, puzzle: Puzzle, snap: GameSnapshot): GameState {
  return recompute({ ...state, placements: new Map(snap.placements), annotations: cloneAnnotations(snap.annotations) }, puzzle);
}
