/**
 * Playwright e2e tests for the canvas renderer (src/render/).
 * TDD: written before implementation. Tests verify DOM/canvas output
 * after the game screen is rendered with a seed-deterministic puzzle.
 *
 * Requires: `window.__alibi_puzzle` set in DEV build (see AGENTS.md).
 * Navigate to /?theme=coffee-shop&difficulty=easy&seed=42 to get deterministic puzzle.
 */

import { test, expect } from '@playwright/test';

test.describe('renderer: game screen elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alibi/?theme=coffee-shop&difficulty=easy&seed=42');
    // Wait for game screen (set by renderer wiring in main.ts)
    await page.waitForSelector('[data-testid="screen-game"]', { timeout: 5000 });
  });

  test('canvas element is visible and has non-zero dimensions', async ({ page }) => {
    const canvas = page.locator('[data-testid="game-canvas"]');
    await expect(canvas).toBeVisible();
    const width = await canvas.getAttribute('width');
    const height = await canvas.getAttribute('height');
    expect(Number(width)).toBeGreaterThan(0);
    expect(Number(height)).toBeGreaterThan(0);
  });

  test('game screen element is present', async ({ page }) => {
    await expect(page.locator('[data-testid="screen-game"]')).toBeVisible();
  });

  test('narrative intro overlay appears on load', async ({ page }) => {
    // Overlay is appended to body after screen-game — wait for it explicitly
    await expect(page.locator('[data-testid="narrative-intro"]')).toBeVisible({ timeout: 3000 });
  });

  test('clue cards are rendered in sidebar after dismissing intro', async ({ page }) => {
    const intro = page.locator('[data-testid="narrative-intro"]');
    if (await intro.isVisible()) {
      await page.locator('[data-testid="narrative-intro"] button').click();
    }
    // At least 5 clue cards for easy difficulty
    const clueCards = page.locator('[data-testid^="clue-"]');
    const count = await clueCards.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('clue card 0 has correct test id', async ({ page }) => {
    const intro = page.locator('[data-testid="narrative-intro"]');
    if (await intro.isVisible()) {
      await page.locator('[data-testid="narrative-intro"] button').click();
    }
    await expect(page.locator('[data-testid="clue-0"]')).toBeVisible();
  });

  test('window.__alibi_puzzle is set in dev build', async ({ page }) => {
    const hasPuzzle = await page.evaluate(() => {
      return !!(window as Window & { __alibi_puzzle?: unknown }).__alibi_puzzle;
    });
    expect(hasPuzzle).toBe(true);
  });

  test('zero JavaScript errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.reload();
    await page.waitForSelector('[data-testid="screen-game"]');
    expect(errors).toHaveLength(0);
  });
});
