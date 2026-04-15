/**
 * Undo/redo stack for suspect placements + cell annotations.
 * Max 50 entries. Immutable GameSnapshot objects.
 */

import type { GameSnapshot } from './state';

const MAX_STACK = 50;

export class UndoStack {
  private past:   GameSnapshot[] = [];
  private future: GameSnapshot[] = [];

  /** Push a snapshot of current placements + annotations. Clears the redo stack. */
  push(snapshot: GameSnapshot): void {
    // Deep copy is done by takeSnapshot() in the caller — just store the reference here
    this.past.push(snapshot);
    if (this.past.length > MAX_STACK) this.past.shift();
    this.future = [];
  }

  /** Undo: pushes current snapshot to future, returns previous snapshot. */
  undo(current: GameSnapshot): GameSnapshot | null {
    if (this.past.length === 0) return null;
    this.future.push(current);
    return this.past.pop()!;
  }

  /** Redo: pushes current snapshot to past, returns next snapshot. */
  redo(current: GameSnapshot): GameSnapshot | null {
    if (this.future.length === 0) return null;
    this.past.push(current);
    return this.future.pop()!;
  }

  canUndo(): boolean { return this.past.length > 0; }
  canRedo(): boolean { return this.future.length > 0; }

  /** Clears both stacks (used when puzzle resets). */
  clear(): void {
    this.past = [];
    this.future = [];
  }
}
