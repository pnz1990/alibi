/**
 * localStorage schema types for ALIBI.
 * All keys are prefixed `alibi_`.
 * Writes must go through src/storage/progress.ts — no other file reads/writes localStorage.
 */

export type Difficulty = 'easy' | 'medium' | 'hard';

export type DetectiveRank = 'rookie' | 'investigator' | 'detective' | 'senior' | 'chief';

export type CaseStatus = 'locked' | 'in_progress' | 'solved';

export interface CaseRecord {
  seed: number;
  themeId: string;
  difficulty: Difficulty;
  status: CaseStatus;
  solveTimeMs?: number;
  killerName?: string;
}

export interface CampaignSave {
  campaignSeed: number;
  slot: 1 | 2 | 3;
  currentCase: number; // 0–11
  startedAt: string;   // ISO date string
  cases: CaseRecord[];
  rank: DetectiveRank;
}

export interface DailySave {
  date: string;    // YYYY-MM-DD
  solved: boolean;
  solveTimeMs?: number;
  killerName?: string;
}

export interface PlayerStats {
  totalSolved: number;
  bestTimes: Record<string, number>; // key: `${themeId}-${difficulty}` → ms
  solvedToday: number;
  lastSolvedDate: string; // YYYY-MM-DD
}

export interface PlayerPrefs {
  muted: boolean;
  howToPlaySeen: boolean;
}

export interface PuzzleState {
  key: string; // `${seed}-${themeId}-${difficulty}`
  placements: Record<string, { x: number; y: number }>; // suspectId → cell
  elapsedMs: number;
  savedAt: string; // ISO date string
}

/** All localStorage keys used by ALIBI */
export const STORAGE_KEYS = {
  campaign: (slot: 1 | 2 | 3) => `alibi_campaign_${slot}` as const,
  daily: (date: string) => `alibi_daily_${date}` as const,
  streak: 'alibi_streak' as const,
  stats: 'alibi_stats' as const,
  prefs: 'alibi_prefs' as const,
  puzzleState: 'alibi_puzzle_state' as const,
} as const;
