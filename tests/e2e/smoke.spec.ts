import { test, expect } from '@playwright/test';

test('home screen loads with no JS errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/alibi/');
  await expect(page.locator('[data-testid="screen-home"]')).toBeVisible({ timeout: 5000 });
  expect(errors).toHaveLength(0);
});

test('game canvas is present in DOM (may be hidden on home screen)', async ({ page }) => {
  await page.goto('/alibi/');
  // Canvas is in the DOM but hidden on home screen — that is correct
  const canvas = page.locator('[data-testid="game-canvas"]');
  const count = await canvas.count();
  expect(count).toBeGreaterThan(0);
  // Canvas is visible when navigating to a puzzle
  await page.goto('/alibi/?theme=coffee-shop&difficulty=easy&seed=42');
  await page.waitForSelector('[data-testid="screen-game"]');
  await expect(canvas).toBeVisible();
  const width = await canvas.getAttribute('width');
  expect(Number(width)).toBeGreaterThan(0);
});
