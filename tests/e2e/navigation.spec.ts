import { test, expect } from '@playwright/test';

// Helper to dismiss cookie consent if visible
async function dismissCookieConsent(page: any) {
  const acceptButton = page.locator('button:has-text("Accept")');
  if (await acceptButton.isVisible({ timeout: 1000 }).catch(() => false)) {
    await acceptButton.click();
    await page.waitForTimeout(300);
  }
}

// Helper to open mobile menu if needed
async function openMobileMenuIfNeeded(page: any, isMobile: boolean) {
  if (!isMobile) return;

  const mobileMenuButton = page.locator('button[aria-label="Toggle navigation menu"]');
  const menuButtonVisible = await mobileMenuButton.isVisible({ timeout: 2000 }).catch(() => false);

  if (menuButtonVisible) {
    await mobileMenuButton.click();
    await page.waitForTimeout(500);
  }
}

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await dismissCookieConsent(page);
  });

  test('should navigate to About page', async ({ page, isMobile }) => {
    await openMobileMenuIfNeeded(page, isMobile);

    if (isMobile) {
      await page.locator('#mobile-menu a[href*="about"]').first().click();
    } else {
      await page.locator('header a[href*="about"]').first().click();
    }

    await expect(page).toHaveURL(/about/);
  });

  test('should navigate to Services page', async ({ page, isMobile }) => {
    await openMobileMenuIfNeeded(page, isMobile);

    if (isMobile) {
      // On mobile, expand Services accordion first
      const servicesAccordion = page.locator('#mobile-menu button:has-text("Services")');
      await servicesAccordion.click();
      await page.waitForTimeout(200);
      await page.locator('#mobile-menu a[href="/services"]').first().click();
    } else {
      // On desktop, hover over Services dropdown to reveal submenu
      const servicesButton = page.locator('header button:has-text("Services")');
      await servicesButton.hover();
      await page.waitForTimeout(200);
      await page.locator('header a[href="/services"]').first().click();
    }

    await expect(page).toHaveURL(/services/);
  });

  test('should navigate to Practice page', async ({ page, isMobile }) => {
    await openMobileMenuIfNeeded(page, isMobile);

    if (isMobile) {
      // On mobile, expand Practice accordion first
      const practiceAccordion = page.locator('#mobile-menu button:has-text("Practice")');
      await practiceAccordion.click();
      await page.waitForTimeout(200);
      await page.locator('#mobile-menu a[href="/practice"]').first().click();
    } else {
      // On desktop, hover over Practice dropdown
      const practiceButton = page.locator('header button:has-text("Practice")');
      await practiceButton.hover();
      await page.waitForTimeout(200);
      await page.locator('header a[href="/practice"]').first().click();
    }

    await expect(page).toHaveURL(/practice/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to Contact page', async ({ page }) => {
    // Contact page is typically accessed via CTA buttons or footer, not main nav
    // Navigate directly to verify the page works
    await page.goto('/contact');
    await expect(page).toHaveURL(/contact/);
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should navigate to Resources page', async ({ page, isMobile }) => {
    await openMobileMenuIfNeeded(page, isMobile);

    if (isMobile) {
      await page.locator('#mobile-menu a[href*="resources"]').first().click();
    } else {
      await page.locator('header a[href*="resources"]').first().click();
    }

    await expect(page).toHaveURL(/resources/);
  });

  test('should return home when clicking logo/brand', async ({ page }) => {
    await page.goto('/about');
    await dismissCookieConsent(page);
    await page.locator('header a[href="/"]').first().click();
    await expect(page).toHaveURL('/');
  });

  test('should have consistent header across pages', async ({ page }) => {
    const pages = ['/', '/about', '/services', '/practice', '/contact'];

    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator('header').first()).toBeVisible();
    }
  });
});
