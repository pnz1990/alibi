/**
 * Unit tests for campaign mode logic.
 */

import { describe, it, expect } from 'vitest';
import {
  deriveCaseSeed,
  deriveCaseTheme,
  deriveCaseThemes,
  createNewCampaign,
  calculateRank,
  completeCampaignCase,
  generateCampaignSeed,
} from '../../src/modes/campaign';

describe('deriveCaseSeed', () => {
  it('is deterministic for same inputs', () => {
    expect(deriveCaseSeed(12345, 0)).toBe(deriveCaseSeed(12345, 0));
    expect(deriveCaseSeed(12345, 5)).toBe(deriveCaseSeed(12345, 5));
  });

  it('differs for different case indices', () => {
    const s0 = deriveCaseSeed(42, 0);
    const s1 = deriveCaseSeed(42, 1);
    expect(s0).not.toBe(s1);
  });

  it('differs for different campaign seeds', () => {
    expect(deriveCaseSeed(1, 0)).not.toBe(deriveCaseSeed(2, 0));
  });

  it('returns non-negative integer', () => {
    for (let i = 0; i < 12; i++) {
      const s = deriveCaseSeed(99999, i);
      expect(s).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(s)).toBe(true);
    }
  });
});

describe('createNewCampaign', () => {
  it('creates 12 cases', () => {
    const campaign = createNewCampaign(1);
    expect(campaign.cases).toHaveLength(12);
  });

  it('case 0 is in_progress, cases 1-11 are locked', () => {
    const campaign = createNewCampaign(1);
    expect(campaign.cases[0].status).toBe('in_progress');
    for (let i = 1; i < 12; i++) {
      expect(campaign.cases[i].status).toBe('locked');
    }
  });

  it('cases 0-3 are easy', () => {
    const campaign = createNewCampaign(1);
    for (let i = 0; i < 4; i++) {
      expect(campaign.cases[i].difficulty).toBe('easy');
    }
  });

  it('cases 4-7 are medium', () => {
    const campaign = createNewCampaign(1);
    for (let i = 4; i < 8; i++) {
      expect(campaign.cases[i].difficulty).toBe('medium');
    }
  });

  it('cases 8-11 are hard', () => {
    const campaign = createNewCampaign(1);
    for (let i = 8; i < 12; i++) {
      expect(campaign.cases[i].difficulty).toBe('hard');
    }
  });

  it('starts at rank rookie', () => {
    const campaign = createNewCampaign(1);
    expect(campaign.rank).toBe('rookie');
  });

  it('slot is set correctly', () => {
    expect(createNewCampaign(1).slot).toBe(1);
    expect(createNewCampaign(2).slot).toBe(2);
    expect(createNewCampaign(3).slot).toBe(3);
  });

  it('same campaign seed produces same cases', () => {
    // Two campaigns with same seed should have same case seeds
    const c1 = createNewCampaign(1);
    // Can't force seed in createNewCampaign, but test deriveCaseSeed directly
    const seed = c1.campaignSeed;
    expect(deriveCaseSeed(seed, 0)).toBe(deriveCaseSeed(seed, 0));
  });

  it('each difficulty tier uses 4 distinct themes (no repeats)', () => {
    // Verify across 50 random campaign seeds
    for (let i = 0; i < 50; i++) {
      const campaignSeed = (i * 0x9e3779b9 + 0x12345678) >>> 0;
      const themes = deriveCaseThemes(campaignSeed);
      expect(themes).toHaveLength(12);

      // Easy tier (0-3): all distinct
      const easyThemes = themes.slice(0, 4);
      expect(new Set(easyThemes).size).toBe(4);

      // Medium tier (4-7): all distinct
      const medThemes = themes.slice(4, 8);
      expect(new Set(medThemes).size).toBe(4);

      // Hard tier (8-11): all distinct
      const hardThemes = themes.slice(8, 12);
      expect(new Set(hardThemes).size).toBe(4);
    }
  });
});

describe('calculateRank', () => {
  const base = createNewCampaign(1);

  it('rookie when 0 cases solved', () => {
    expect(calculateRank(base)).toBe('rookie');
  });

  it('investigator when 4 cases solved', () => {
    const c = { ...base, cases: base.cases.map((cs, i) =>
      i < 4 ? { ...cs, status: 'solved' as const } : cs) };
    expect(calculateRank(c)).toBe('investigator');
  });

  it('detective when 8 cases solved', () => {
    const c = { ...base, cases: base.cases.map((cs, i) =>
      i < 8 ? { ...cs, status: 'solved' as const } : cs) };
    expect(calculateRank(c)).toBe('detective');
  });

  it('senior when 12 cases solved', () => {
    const c = { ...base, cases: base.cases.map(cs => ({ ...cs, status: 'solved' as const })) };
    expect(calculateRank(c)).toBe('senior');
  });
});

describe('completeCampaignCase', () => {
  it('marks case as solved and unlocks next', () => {
    const campaign = createNewCampaign(1);
    const updated = completeCampaignCase(campaign, 0, 90000, 'Dave');
    expect(updated.cases[0].status).toBe('solved');
    expect(updated.cases[0].killerName).toBe('Dave');
    expect(updated.cases[0].solveTimeMs).toBe(90000);
    expect(updated.cases[1].status).toBe('in_progress');
  });

  it('does not unlock beyond case 11', () => {
    const campaign = createNewCampaign(1);
    // Manually mark first 11 as solved
    const nearly = {
      ...campaign,
      cases: campaign.cases.map((c, i) =>
        i < 11 ? { ...c, status: 'solved' as const } : c
      ),
      currentCase: 11,
    };
    const updated = completeCampaignCase(nearly, 11, 60000, 'Eve');
    expect(updated.cases[11].status).toBe('solved');
    expect(updated.currentCase).toBe(11);
  });
});

describe('generateCampaignSeed', () => {
  it('returns non-negative integer', () => {
    const seed = generateCampaignSeed();
    expect(seed).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(seed)).toBe(true);
  });

  it('produces different seeds on successive calls (probabilistic)', () => {
    const seeds = new Set(Array.from({ length: 10 }, () => generateCampaignSeed()));
    expect(seeds.size).toBeGreaterThan(1);
  });
});
