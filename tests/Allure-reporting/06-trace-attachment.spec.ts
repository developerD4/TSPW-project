import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

/*
 * Trace:
 * A trace records browser actions, screenshots, and page snapshots.
 * It is very useful when debugging a failed test.
 * Trace: A detailed record of test execution that helps us investigate and debug failures step-by-step. trace.zip = Raw trace data; Trace Viewer = Human-readable visual tool for analyzing the trace.
 */
test('attach an OrangeHRM trace for one test', async ({ context, page }, testInfo) => {
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
  });
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();
  const tracePath = testInfo.outputPath('orangehrm-login-trace.zip');
  await context.tracing.stop({
    path: tracePath,
  });
  await allure.attachTrace('orangehrm-login-trace', tracePath);
  await expect(page).toHaveURL(/dashboard/);
});
