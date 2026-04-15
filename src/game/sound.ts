/**
 * Web Audio API sound synthesis for ALIBI.
 * No audio files. No network fetches. All sounds generated algorithmically.
 * Gracefully does nothing if Web Audio is unavailable.
 */

export type SoundType = 'place' | 'remove' | 'clue-satisfied' | 'solve' | 'error' | 'navigate';

let audioCtx: AudioContext | null = null;
let muted = false;

function getContext(): AudioContext | null {
  if (muted) return null;
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => undefined);
    }
    return audioCtx;
  } catch {
    return null;
  }
}

function beep(freq: number, duration: number, type: OscillatorType = 'sine', gain = 0.15): void {
  const ctx = getContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const vol = ctx.createGain();
    osc.connect(vol);
    vol.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    vol.gain.setValueAtTime(gain, ctx.currentTime);
    vol.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio context error — ignore
  }
}

/**
 * Plays a synthesized sound for the given game event.
 */
export function playSound(type: SoundType): void {
  switch (type) {
    case 'place':           beep(440, 0.08, 'sine', 0.12); break;
    case 'remove':          beep(330, 0.06, 'sine', 0.08); break;
    case 'clue-satisfied':  beep(660, 0.12, 'sine', 0.15); break;
    case 'solve':           {
      // Victory arpeggio
      beep(523, 0.15, 'sine', 0.2);
      setTimeout(() => beep(659, 0.15, 'sine', 0.2), 150);
      setTimeout(() => beep(784, 0.3,  'sine', 0.25), 300);
      break;
    }
    case 'error':           beep(220, 0.2, 'square', 0.1); break;
    case 'navigate':        beep(880, 0.05, 'sine', 0.08); break;
  }
}

/**
 * Toggles mute state. Returns the new muted value.
 */
export function toggleMute(): boolean {
  muted = !muted;
  return muted;
}

/** Returns current mute state. */
export function isMuted(): boolean {
  return muted;
}
