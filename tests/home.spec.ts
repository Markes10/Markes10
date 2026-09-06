import { expect, test } from '@playwright/test';

test('loads the portfolio terminal', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[aria-label="PORTFOLIO"]').first()).toBeVisible({
    timeout: 7000,
  });
});

test('deletes the last typed character with Backspace', async ({ page }) => {
  await page.goto('/');
  const terminal = page.locator('[aria-label*="terminal"]');

  await expect(terminal).toBeVisible();
  await page.waitForTimeout(5200);
  await terminal.click();
  await page.keyboard.type('abc');
  await page.keyboard.press('Backspace');

  await expect(page.locator('body')).toContainText('Dweepan@cli: ~& ab');
});
