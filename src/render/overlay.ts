/**
 * Overlay modal renderer for ALIBI.
 *
 * Provides: narrative intro modal, GUILTY stamp overlay, and overlay teardown.
 * All rendered as DOM elements overlaid on the game container.
 * No engine logic. No localStorage.
 */

import type { Puzzle } from '../engine/generator';

const OVERLAY_STYLES = `
.alibi-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  font-family: monospace;
}
.alibi-modal {
  background: #1a1a2e;
  border: 2px solid #c0392b;
  border-radius: 8px;
  padding: 32px;
  max-width: 480px;
  width: 90%;
  color: #ffffff;
  text-align: center;
}
.alibi-modal h2 {
  font-size: 1.4em;
  margin-bottom: 16px;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.alibi-modal p {
  font-size: 0.95em;
  line-height: 1.6;
  margin-bottom: 24px;
  color: #cccccc;
}
.alibi-modal button {
  background: #c0392b;
  color: #ffffff;
  border: none;
  padding: 10px 28px;
  font-family: monospace;
  font-size: 1em;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.alibi-modal button:hover {
  background: #e74c3c;
}
.alibi-guilty-stamp {
  font-size: 3em;
  font-weight: bold;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 16px 0;
  transform: rotate(-5deg) skewX(-5deg);
  display: inline-block;
  text-shadow: 2px 2px 0 #8a0000;
}
.alibi-guilty-killer {
  font-size: 1.6em;
  font-weight: bold;
  color: #ffffff;
  margin: 8px 0;
}
`;

let overlayStylesInjected = false;

function injectOverlayStyles(): void {
  if (overlayStylesInjected) return;
  const style = document.createElement('style');
  style.textContent = OVERLAY_STYLES;
  document.head.appendChild(style);
  overlayStylesInjected = true;
}

/**
 * Shows the narrative intro modal overlay.
 * Dismisses via the button; calls onDismiss callback.
 *
 * @param container  Parent DOM element to append overlay to
 * @param puzzle     Active puzzle (provides intro text)
 * @param onDismiss  Called when the player dismisses the intro
 */
export function showNarrativeIntro(
  container: HTMLElement,
  puzzle: Puzzle,
  onDismiss: () => void,
): void {
  injectOverlayStyles();
  hideOverlay(container);

  const overlay = document.createElement('div');
  overlay.className = 'alibi-overlay';
  overlay.setAttribute('data-testid', 'narrative-intro');

  const modal = document.createElement('div');
  modal.className = 'alibi-modal';

  const title = document.createElement('h2');
  title.textContent = 'A New Case';

  const text = document.createElement('p');
  text.textContent = puzzle.narrativeIntro;

  const btn = document.createElement('button');
  btn.textContent = 'Begin Investigation';
  btn.addEventListener('click', () => {
    overlay.remove();
    onDismiss();
  });

  modal.appendChild(title);
  modal.appendChild(text);
  modal.appendChild(btn);
  overlay.appendChild(modal);
  container.appendChild(overlay);
}

/**
 * Shows the GUILTY overlay with the killer's name and stamped verdict.
 *
 * @param container  Parent DOM element to append overlay to
 * @param puzzle     Active puzzle (provides killer name, guilty text)
 */
export function showGuiltyScreen(
  container: HTMLElement,
  puzzle: Puzzle,
): void {
  injectOverlayStyles();
  hideOverlay(container);

  const guiltyText = puzzle.narrativeGuilty.replace('{{killerName}}', puzzle.killer.name);

  const overlay = document.createElement('div');
  overlay.className = 'alibi-overlay';

  const modal = document.createElement('div');
  modal.className = 'alibi-modal';

  const stamp = document.createElement('div');
  stamp.className = 'alibi-guilty-stamp';
  stamp.setAttribute('data-testid', 'guilty-stamp');
  stamp.textContent = 'GUILTY';

  const killerName = document.createElement('div');
  killerName.className = 'alibi-guilty-killer';
  killerName.setAttribute('data-testid', 'guilty-killer-name');
  killerName.textContent = puzzle.killer.name;

  const text = document.createElement('p');
  text.textContent = guiltyText;

  const victimFoundText = document.createElement('p');
  victimFoundText.textContent = puzzle.narrativeVictimFound;

  modal.appendChild(stamp);
  modal.appendChild(killerName);
  modal.appendChild(victimFoundText);
  modal.appendChild(text);
  overlay.appendChild(modal);
  container.appendChild(overlay);
}

/**
 * Removes the active overlay from the container, if any.
 */
export function hideOverlay(container: HTMLElement): void {
  const existing = container.querySelector('.alibi-overlay');
  if (existing) existing.remove();
}

/**
 * Shows the "clue gate" error message — clues are unsatisfied when victim was clicked.
 */
export function showClueGateMessage(container: HTMLElement): void {
  injectOverlayStyles();
  hideOverlay(container);

  const overlay = document.createElement('div');
  overlay.className = 'alibi-overlay';
  overlay.setAttribute('data-testid', 'msg-clue-gate');

  const modal = document.createElement('div');
  modal.className = 'alibi-modal';

  const title = document.createElement('h2');
  title.textContent = "Something Doesn't Add Up…";

  const text = document.createElement('p');
  text.textContent = 'Check the clue cards. Not all witnesses are satisfied.';

  const btn = document.createElement('button');
  btn.textContent = 'Keep Investigating';
  btn.addEventListener('click', () => overlay.remove());

  modal.appendChild(title);
  modal.appendChild(text);
  modal.appendChild(btn);
  overlay.appendChild(modal);
  container.appendChild(overlay);

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    if (overlay.isConnected) overlay.remove();
  }, 3000);
}
