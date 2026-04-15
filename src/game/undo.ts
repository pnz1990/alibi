/**
 * Undo/redo stack for suspect placements.
 * Max 50 entries. Immutable snapshots of the placements Map.
 */

import type { SuspectPlacement } from '../engine/logic';

const MAX_STACK = 50;

export class UndoStack {
  private past:   Map<string, SuspectPlacement>[] = [];
  private future: Map<string, SuspectPlacement>[] = [];

  /** Push a snapshot of current placements. Clears the redo stack. */
  push(snapshot: Map<string, SuspectPlacement>): void {
    this.past.push(new Map(snapshot));
    if (this.past.length > MAX_STACK) this.past.shift();
    this.future = [];
  }

  /** Undo: returns the previous snapshot, or null if nothing to undo. */
  undo(current: Map<string, SuspectPlacement>): Map<string, SuspectPlacement> | null {
    if (this.past.length === 0) return null;
    this.future.push(new Map(current));
    return new Map(this.past.pop()!);
  }

  /** Redo: returns the next snapshot, or null if nothing to redo. */
  redo(current: Map<string, SuspectPlacement>): Map<string, SuspectPlacement> | null {
    if (this.future.length === 0) return null;
    this.past.push(new Map(current));
    return new Map(this.future.pop()!);
  }

  canUndo(): boolean { return this.past.length > 0; }
  canRedo(): boolean { return this.future.length > 0; }

  /** Clears both stacks (used when puzzle resets). */
  clear(): void {
    this.past = [];
    this.future = [];
  }
}
