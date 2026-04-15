/**
 * DOM sidebar renderer for ALIBI.
 *
 * Renders suspect cards and clue cards as DOM elements inside a container.
 * Applies CSS classes for satisfied/error clue states.
 * No engine logic. No localStorage.
 */

import type { Puzzle } from '../engine/generator';
import type { SuspectPlacement } from '../engine/logic';

const SIDEBAR_STYLES = `
.alibi-sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: #0d0d1a;
  color: #ffffff;
  font-family: monospace;
  min-width: 220px;
  max-width: 280px;
  overflow-y: auto;
}
.alibi-suspect-section {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}
.alibi-suspect-card {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #1e1e35;
  border-radius: 4px;
  border: 1px solid #333;
  font-size: 12px;
  cursor: default;
}
.alibi-suspect-card.placed {
  border-color: #c0392b;
  background: #2a0d0d;
}
.alibi-suspect-initial {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 11px;
  flex-shrink: 0;
}
.alibi-clue-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.alibi-clue-card {
  padding: 6px 8px;
  background: #1e1e35;
  border-radius: 4px;
  border: 1px solid #333;
  font-size: 11px;
  line-height: 1.4;
}
.alibi-clue-card.clue-satisfied {
  text-decoration: line-through;
  color: #666;
  border-color: #2d5a2d;
  background: #0d1a0d;
}
.alibi-clue-card.clue-error {
  border-color: #c0392b;
  background: #2a0d0d;
  animation: alibi-flash 0.5s ease-in-out 3;
}
@keyframes alibi-flash {
  0%, 100% { background: #2a0d0d; }
  50%       { background: #5a1a1a; }
}
`;

let stylesInjected = false;

function injectStyles(): void {
  if (stylesInjected) return;
  const style = document.createElement('style');
  style.textContent = SIDEBAR_STYLES;
  document.head.appendChild(style);
  stylesInjected = true;
}

/** Returns a deterministic HSL color for a suspect ID. */
function suspectColor(suspectId: string): string {
  let hash = 0;
  for (let i = 0; i < suspectId.length; i++) {
    hash = (hash * 31 + suspectId.charCodeAt(i)) & 0xffff;
  }
  return `hsl(${hash % 360}, 65%, 55%)`;
}

/**
 * Populates the container with suspect cards and clue cards.
 * Clears and re-renders on each call.
 *
 * @param container      DOM element to render into
 * @param puzzle         Active puzzle
 * @param placements     Current suspect placements
 * @param satisfiedClues Set of 0-indexed clue indices that are satisfied
 * @param errorClues     Set of 0-indexed clue indices in error state
 */
export function renderSidebar(
  container: HTMLElement,
  puzzle: Puzzle,
  placements: ReadonlyMap<string, SuspectPlacement>,
  satisfiedClues: ReadonlySet<number>,
  errorClues: ReadonlySet<number>,
): void {
  injectStyles();
  container.innerHTML = '';
  container.className = 'alibi-sidebar';

  // Suspect cards
  const suspectSection = document.createElement('div');
  suspectSection.className = 'alibi-suspect-section';
  for (const suspect of puzzle.suspects) {
    const card = document.createElement('div');
    card.className = 'alibi-suspect-card' + (placements.has(suspect.id) ? ' placed' : '');

    const initial = document.createElement('div');
    initial.className = 'alibi-suspect-initial';
    initial.style.background = suspectColor(suspect.id);
    initial.textContent = suspect.name.charAt(0).toUpperCase();

    const name = document.createElement('span');
    name.textContent = suspect.name;

    card.appendChild(initial);
    card.appendChild(name);
    suspectSection.appendChild(card);
  }
  container.appendChild(suspectSection);

  // Clue cards
  const clueSection = document.createElement('div');
  clueSection.className = 'alibi-clue-section';
  puzzle.clues.forEach((clue, i) => {
    const card = document.createElement('div');
    card.className = 'alibi-clue-card';
    card.setAttribute('data-testid', `clue-${i}`);
    if (satisfiedClues.has(i)) card.classList.add('clue-satisfied');
    if (errorClues.has(i)) card.classList.add('clue-error');
    card.textContent = clue.text;
    clueSection.appendChild(card);
  });
  container.appendChild(clueSection);
}
