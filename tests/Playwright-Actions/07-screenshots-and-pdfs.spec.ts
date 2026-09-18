import { test, expect } from '@playwright/test';

// ==================== FULL PAGE SCREENSHOT ====================

test('Take a full page screenshot', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');
  // Take screenshot of the full page
  await page.screenshot({
    path: 'full-page.png',
    fullPage: true
  });
});

// ==================== ELEMENT SCREENSHOT ====================
test('Take screenshot of an element', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com');
  const heading = page.locator('h1');
  // Take screenshot of the heading
  await heading.screenshot({
    path: 'heading.png'
  });
  // Verify element is visible
  await expect(heading).toBeVisible();
});

// ==================== PDF ====================

test('Save page as PDF', async ({ page, browserName }) => {
  // PDF works only with Chromium
  //Run the PDF test only in Chromium; skip it in Firefox and WebKit.
  test.skip(browserName !== 'chromium');

  await page.goto('https://demo.playwright.dev/todomvc');

  // Save page as PDF
  await page.pdf({
    path: 'todo.pdf',
    format: 'A4'
  });
});
// Chromium: page.pdf() is supported because Chromium has a built-in PDF generation feature that Playwright can use.
// Firefox & WebKit: Playwright does not support page.pdf() because these browsers don't provide the same PDF-generation capability through Playwright.
// Headless Chromium: page.pdf() works when Chromium runs in headless mode.
// Headed Chromium: page.pdf() is not designed to control the browser's visible Print dialog.
// page.pdf() is a Playwright feature that uses Chromium's built-in PDF generation. Therefore, PDF generation is supported only with Chromium in headless mode, not Firefox, WebKit, or headed Chromium.
// Use Chromium for PDF generation. Use Firefox/WebKit for browser compatibility testing, usually with screenshots or normal UI assertions.