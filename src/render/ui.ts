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
  padding: 12px 10px;
  /* Notepad / case file look: cream paper with subtle lines */
  background: #f0ead8;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 23px,
    rgba(100,80,60,0.08) 23px,
    rgba(100,80,60,0.08) 24px
  );
  color: #1a0e08;
  font-family: 'Press Start 2P', monospace;
  min-width: 240px;
  max-width: 300px;
  overflow-y: auto;
  border-left: 3px solid #c0392b;
}
.alibi-sidebar-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 6px;
  color: #c0392b;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(192,57,43,0.3);
  padding-bottom: 4px;
}
.alibi-suspect-section {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}
.alibi-suspect-card {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 6px;
  background: #e8e0c8;
  border: 2px solid #8a7040;
  border-radius: 0;
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  cursor: default;
  /* Manila folder tab feel */
  box-shadow: 2px 2px 0 rgba(0,0,0,0.15);
}
.alibi-suspect-card.placed {
  border-color: #c0392b;
  background: #ffe8e0;
  box-shadow: 2px 2px 0 rgba(192,57,43,0.3);
}
.alibi-suspect-initial {
  width: 18px;
  height: 18px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
  font-weight: bold;
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.3);
}
.alibi-clue-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.alibi-clue-card {
  padding: 6px 8px;
  background: transparent;
  border: 0;
  border-left: 3px solid #8a7040;
  font-family: 'Press Start 2P', monospace;
  font-size: 6px;
  line-height: 1.8;
  color: #2a1a08;
}
.alibi-clue-card.clue-satisfied {
  text-decoration: line-through;
  color: #a09070;
  border-left-color: #6a9040;
  opacity: 0.7;
}
.alibi-clue-card.clue-error {
  border-left-color: #c0392b;
  background: rgba(192,57,43,0.07);
  color: #c0392b;
  animation: alibi-flash 0.5s ease-in-out 3;
}
@keyframes alibi-flash {
  0%, 100% { background: transparent; }
  50%       { background: rgba(192,57,43,0.2); }
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

  // "SUSPECTS" label
  const suspectLabel = document.createElement('div');
  suspectLabel.className = 'alibi-sidebar-label';
  suspectLabel.textContent = 'Suspects';
  container.appendChild(suspectLabel);

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

  // "CLUES" label
  const clueLabel = document.createElement('div');
  clueLabel.className = 'alibi-sidebar-label';
  clueLabel.textContent = 'Evidence';
  container.appendChild(clueLabel);

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
