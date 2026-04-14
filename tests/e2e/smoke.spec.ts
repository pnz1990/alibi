import { test, expect } from '@playwright/test';

test('page loads with canvas and no JS errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/alibi/');
  await expect(page.locator('[data-testid="game-canvas"]')).toBeVisible();
  expect(errors).toHaveLength(0);
});

test('canvas has correct dimensions', async ({ page }) => {
  await page.goto('/alibi/');
  const canvas = page.locator('[data-testid="game-canvas"]');
  await expect(canvas).toBeVisible();
  const width = await canvas.getAttribute('width');
  const height = await canvas.getAttribute('height');
  expect(Number(width)).toBeGreaterThan(0);
  expect(Number(height)).toBeGreaterThan(0);
});
