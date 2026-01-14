import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact page content', async ({ page }) => {
    // Page should load with contact-related content
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Should have some form or contact method
    const hasForm = await page.locator('form').isVisible().catch(() => false);
    const hasScheduler = await page.getByText(/schedule|book|appointment/i).first().isVisible().catch(() => false);

    expect(hasForm || hasScheduler).toBe(true);
  });

  test('should display scheduling option or contact info', async ({ page }) => {
    // Look for scheduling/booking UI or contact information
    const pageContent = await page.textContent('body');

    const hasContactMethod =
      pageContent?.includes('schedule') ||
      pageContent?.includes('Schedule') ||
      pageContent?.includes('book') ||
      pageContent?.includes('Book') ||
      pageContent?.includes('email') ||
      pageContent?.includes('Email') ||
      pageContent?.includes('@');

    expect(hasContactMethod).toBe(true);
  });

  test('should have interactive elements', async ({ page }) => {
    // Look for buttons or links to take action
    const buttons = page.locator('button, a[href*="mailto"], a[href*="schedule"]');
    const count = await buttons.count();

    expect(count).toBeGreaterThan(0);
  });
});
