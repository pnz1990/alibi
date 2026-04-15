/**
 * Campaign mode logic.
 *
 * Seed derivation, 12-case generation, rank calculation, and save slot management.
 * All campaign seed derivation and case generation lives here exclusively (Constitution §VIII).
 *
 * No DOM, no localStorage (writes go through src/storage/progress.ts).
 */

import type { CampaignSave, CaseRecord, DetectiveRank, Difficulty } from '../storage/schema';

/** Themes in the pool for campaign case generation. All 10 themes available. */
const CAMPAIGN_THEME_POOL = [
  'coffee-shop',
  'bookstore',
  'backyard',
  'holiday-mall',
  'restaurant',
  'gym',
  'office',
  'garden-party',
  'hospital',
  'carnival',
] as const;

/** Campaign case template: difficulty progression per case index (0-11). */
const CASE_DIFFICULTIES: Difficulty[] = [
  'easy', 'easy', 'easy', 'easy',       // cases 0-3
  'medium', 'medium', 'medium', 'medium', // cases 4-7
  'hard', 'hard', 'hard', 'hard',         // cases 8-11
];

/**
 * Derives a case seed from the campaign seed and case index.
 * Deterministic: same (campaignSeed, caseIndex) always produces same seed.
 */
export function deriveCaseSeed(campaignSeed: number, caseIndex: number): number {
  // Simple mixing function: scramble with case index
  let h = campaignSeed ^ (caseIndex * 0x9e3779b9);
  h = ((h >>> 16) ^ h) * 0x45d9f3b | 0;
  h = ((h >>> 16) ^ h) * 0x45d9f3b | 0;
  h = (h >>> 16) ^ h;
  return Math.abs(h);
}

/**
 * Minimal seeded PRNG for theme shuffling — mulberry32 variant.
 * Returns a function that yields floats in [0, 1).
 */
function makeShufflePRNG(seed: number): () => number {
  let s = seed;
  return function (): number {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/**
 * Derives the theme IDs for all 12 cases from the campaign seed.
 * Guarantees 4 distinct themes per difficulty tier (Easy/Medium/Hard)
 * by using a seeded Fisher-Yates shuffle of the theme pool per tier.
 *
 * Returns an array of 12 theme IDs (indices 0-11).
 * Deterministic: same campaignSeed → same 12 themes always.
 */
export function deriveCaseThemes(campaignSeed: number): string[] {
  const themes: string[] = [];

  for (let tier = 0; tier < 3; tier++) {
    // Seed the shuffle for this tier with campaignSeed mixed with tier index
    const tierSeed = (campaignSeed ^ (tier * 0xdeadbeef)) >>> 0;
    const rng = makeShufflePRNG(tierSeed);

    // Fisher-Yates shuffle of the full pool
    const pool = [...CAMPAIGN_THEME_POOL];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Take the first 4 from the shuffled pool (guaranteed distinct)
    themes.push(...pool.slice(0, 4));
  }

  return themes;
}

/**
 * @deprecated Use deriveCaseThemes(campaignSeed)[caseIndex] instead.
 * Kept for backward compatibility — reads from the new implementation.
 */
export function deriveCaseTheme(campaignSeed: number, caseIndex: number): string {
  return deriveCaseThemes(campaignSeed)[caseIndex];
}

/**
 * Creates a new CampaignSave for the given slot.
 * All 12 cases are pre-generated from the campaign seed.
 */
export function createNewCampaign(slot: 1 | 2 | 3): CampaignSave {
  const campaignSeed = generateCampaignSeed();
  const caseThemes = deriveCaseThemes(campaignSeed);
  const cases: CaseRecord[] = Array.from({ length: 12 }, (_, i) => ({
    seed:       deriveCaseSeed(campaignSeed, i),
    themeId:    caseThemes[i],
    difficulty: CASE_DIFFICULTIES[i],
    status:     i === 0 ? 'in_progress' : 'locked',
  }));

  return {
    campaignSeed,
    slot,
    currentCase: 0,
    startedAt: new Date().toISOString(),
    cases,
    rank: 'rookie',
  };
}

/**
 * Generates a random 32-bit campaign seed.
 */
export function generateCampaignSeed(): number {
  return Math.floor(Math.random() * 0xffffffff);
}

/**
 * Calculates the detective rank based on campaign progress.
 */
export function calculateRank(campaign: CampaignSave): DetectiveRank {
  const solved = campaign.cases.filter(c => c.status === 'solved').length;
  // Completed full campaigns (all 12 solved) tracked separately via PlayerStats
  if (solved >= 12) return 'senior';
  if (solved >= 8)  return 'detective';
  if (solved >= 4)  return 'investigator';
  return 'rookie';
}

/**
 * Returns updated campaign after a case is solved.
 * Advances to next case, recalculates rank.
 */
export function completeCampaignCase(
  campaign: CampaignSave,
  caseIndex: number,
  solveTimeMs: number,
  killerName: string,
): CampaignSave {
  const cases = campaign.cases.map((c, i) => {
    if (i === caseIndex) return { ...c, status: 'solved' as const, solveTimeMs, killerName };
    if (i === caseIndex + 1 && c.status === 'locked') return { ...c, status: 'in_progress' as const };
    return c;
  });

  const nextCase = caseIndex < 11 ? caseIndex + 1 : caseIndex;
  const updated: CampaignSave = { ...campaign, cases, currentCase: nextCase };
  return { ...updated, rank: calculateRank(updated) };
}
