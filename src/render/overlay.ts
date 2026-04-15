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
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  font-family: 'Press Start 2P', monospace;
}
.alibi-modal {
  background: #0a0a12;
  /* Pixel border — no radius */
  border: 3px solid #c0392b;
  border-radius: 0;
  box-shadow: 4px 4px 0 #6b0000, 8px 8px 0 rgba(0,0,0,0.5);
  padding: 28px 32px;
  max-width: 440px;
  width: 90%;
  color: #ffffff;
  text-align: center;
}
.alibi-modal h2 {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.85em;
  margin-bottom: 20px;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  line-height: 1.6;
}
.alibi-modal p {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5em;
  line-height: 2;
  margin-bottom: 24px;
  color: #cccccc;
}
.alibi-modal button {
  background: #c0392b;
  color: #ffffff;
  border: 2px solid #ff5a47;
  border-radius: 0;
  padding: 10px 24px;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6em;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 3px 3px 0 #6b0000;
}
.alibi-modal button:hover { background: #e74c3c; }
.alibi-modal button:active { transform: translate(2px,2px); box-shadow: 1px 1px 0 #6b0000; }
/* GUILTY stamp — pixel-art slam animation */
.alibi-guilty-stamp {
  font-family: 'Press Start 2P', monospace;
  font-size: 1.8em;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 20px 0 12px;
  display: inline-block;
  transform: rotate(-6deg);
  /* Hard pixel shadow */
  text-shadow:
    3px 0 0 #6b0000,
    0 3px 0 #6b0000,
    3px 3px 0 #6b0000,
    -1px -1px 0 #ff7060;
  border: 4px solid #c0392b;
  padding: 6px 16px;
  animation: alibi-stamp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes alibi-stamp {
  0%   { transform: rotate(-6deg) scale(2.5); opacity: 0; }
  70%  { transform: rotate(-6deg) scale(0.92); opacity: 1; }
  85%  { transform: rotate(-6deg) scale(1.06); }
  100% { transform: rotate(-6deg) scale(1); opacity: 1; }
}
.alibi-guilty-killer {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.75em;
  font-weight: bold;
  color: #ffffff;
  margin: 12px 0 6px;
  letter-spacing: 0.05em;
  line-height: 1.6;
}
@media (max-width: 699px) {
  .alibi-modal {
    padding: 20px 16px;
  }
  .alibi-modal h2 {
    font-size: 0.7em;
    margin-bottom: 14px;
  }
  .alibi-modal p {
    font-size: 0.45em;
  }
  .alibi-modal button {
    padding: 10px 18px;
    font-size: 0.55em;
    min-height: 44px;
  }
  .alibi-guilty-stamp {
    font-size: 1.2em;
    padding: 4px 10px;
  }
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
