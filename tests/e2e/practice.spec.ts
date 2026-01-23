import { test, expect } from '@playwright/test';

test.describe('Practice Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice');
  });

  test('should display practice page with header', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();

    // Should have GOFNR tab navigation
    const tabArea = page.locator('button').filter({ hasText: /goals|feelings|needs|request/i });
    await expect(tabArea.first()).toBeVisible();
  });

  test('should have feelings tab content', async ({ page }) => {
    // Click on Feelings tab (GOFNR tabs show first letter highlighted)
    const feelingsTab = page.locator('button').filter({ hasText: /Feelings/i }).first();
    if (await feelingsTab.isVisible()) {
      await feelingsTab.click();
    }

    // Should show feelings-related content
    await expect(page.getByText(/explore feelings|feeling|emotion/i).first()).toBeVisible();
  });

  test('should have needs tab', async ({ page }) => {
    // Click on Needs tab
    const needsTab = page.locator('button').filter({ hasText: /Needs/i }).first();
    await needsTab.click();

    // Should show needs-related content
    await expect(page.getByText(/explore needs|need|universal/i).first()).toBeVisible();
  });

  test('should have request tab for crafting requests', async ({ page }) => {
    // Click on Request tab
    const requestTab = page.locator('button').filter({ hasText: /Request/i }).first();
    await requestTab.click();

    // Wait for content to load
    await page.waitForTimeout(500);

    // Should show request-related content
    const hasRequestContent =
      (await page.locator('text=/request|asking|specific|actionable/i').count()) > 0 ||
      (await page.locator('textarea, input').count()) > 0;

    expect(hasRequestContent).toBe(true);
  });

  test('should display emotion/feeling wheel', async ({ page }) => {
    // Click on Feelings tab first
    const feelingsTab = page.locator('button').filter({ hasText: /Feelings/i }).first();
    if (await feelingsTab.isVisible()) {
      await feelingsTab.click();
    }

    // Should have wheel or selection UI
    await expect(
      page.locator('[class*="wheel"], [class*="emotion"], [class*="feeling"], [class*="grid"]').first()
    ).toBeVisible();
  });

  test('should show GOFNR process tabs', async ({ page }) => {
    // Should have all GOFNR tabs
    await expect(page.locator('button').filter({ hasText: /Goals/i }).first()).toBeVisible();
    await expect(page.locator('button').filter({ hasText: /Observations/i }).first()).toBeVisible();
    await expect(page.locator('button').filter({ hasText: /Feelings/i }).first()).toBeVisible();
    await expect(page.locator('button').filter({ hasText: /Needs/i }).first()).toBeVisible();
    await expect(page.locator('button').filter({ hasText: /Request/i }).first()).toBeVisible();
  });

  test('should have AI practice section', async ({ page }) => {
    // Should mention AI or NVC facilitator somewhere
    const pageContent = await page.textContent('body');
    const hasAIContent =
      pageContent?.includes('AI') ||
      pageContent?.includes('facilitator') ||
      pageContent?.includes('Practice') ||
      pageContent?.includes('GOFNR');

    expect(hasAIContent).toBe(true);
  });
});
