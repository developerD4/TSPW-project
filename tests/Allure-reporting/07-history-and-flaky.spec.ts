import { test, expect } from '@playwright/test';

/*
 * History:
 * Allure history connects the same test across different report runs.
 * It allows us to see whether the test is stable or failing repeatedly.
 *
 * Flaky test:
 * A flaky test does not give a consistent result across runs or retries.
 * History helps us identify tests that fail and later pass again.
 */

test('OrangeHRM login test used for history', async ({ page }) => {
  // await page.goto('/web/index.php/auth/login');
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');


  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/dashboard/);
});
//                 FIRST RUN
//                    │
//                    ▼
//             Clear allure-results
//                    │
//                    ▼
//             Run Playwright test
//                    │
//                 PASS
//                    │
//                    ▼
//     allure-results/ → current result
//                    │
//                    ▼
//  npx allure generate allure-results -o allure-report
//                    │
//                    ▼
//      allure-history/history.jsonl
//             stores Run 1
//             Second run
//                           Clear allure-results
//                    │
//                    ▼
//             Run Playwright test
//                    │
//                 FAIL
//                    │
//                    ▼
//     allure-results/ → current result
//                    │
//                    ▼
//  npx allure generate allure-results -o allure-report
//                    │
//                    ▼
//      history.jsonl
//      PASS → FAIL
// Clear allure-results for each independent run, but preserve allure-history so Allure can compare the current run with previous runs.