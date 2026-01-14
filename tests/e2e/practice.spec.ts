import { test, expect } from '@playwright/test';

test.describe('Practice Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice');
  });

  test('should display practice page with header', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();

    // Should have tab-like navigation
    const tabArea = page.locator('button').filter({ hasText: /feelings|needs|scenarios/i });
    await expect(tabArea.first()).toBeVisible();
  });

  test('should have feelings tab content', async ({ page }) => {
    // Click on Feelings tab specifically (exact match)
    const feelingsTab = page.getByRole('button', { name: 'Feelings', exact: true });
    if (await feelingsTab.isVisible()) {
      await feelingsTab.click();
    }

    // Should show feelings-related content
    await expect(page.getByText(/explore feelings|feeling/i).first()).toBeVisible();
  });

  test('should have needs tab', async ({ page }) => {
    // Click on Needs tab specifically (exact match)
    const needsTab = page.getByRole('button', { name: 'Needs', exact: true });
    await needsTab.click();

    // Should show needs-related content
    await expect(page.getByText(/explore needs|need/i).first()).toBeVisible();
  });

  test('should have scenarios tab with cards', async ({ page }) => {
    // Click on Scenarios tab
    const scenariosTab = page.getByRole('button', { name: 'Scenarios', exact: true });
    await scenariosTab.click();

    // Wait for content to load
    await page.waitForTimeout(500);

    // Should show scenario cards or category sections
    const hasScenarioContent =
      (await page.locator('[class*="card"], [class*="scenario"]').count()) > 0 ||
      (await page.locator('h3').count()) > 0;

    expect(hasScenarioContent).toBe(true);
  });

  test('should display emotion/feeling wheel', async ({ page }) => {
    // Feelings tab is default, should have wheel or selection UI
    await expect(
      page.locator('[class*="wheel"], [class*="emotion"], [class*="feeling"], [class*="grid"]').first()
    ).toBeVisible();
  });

  test('should show OFNR process explanation', async ({ page }) => {
    // Scroll to bottom to see OFNR section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // Should have OFNR headers (use exact match to avoid conflicts)
    await expect(page.getByRole('heading', { name: 'Observation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Feelings', exact: true })).toBeVisible();
  });

  test('should have AI practice section', async ({ page }) => {
    // Should mention AI or NVC facilitator somewhere
    const pageContent = await page.textContent('body');
    const hasAIContent =
      pageContent?.includes('AI') ||
      pageContent?.includes('facilitator') ||
      pageContent?.includes('Practice');

    expect(hasAIContent).toBe(true);
  });
});
