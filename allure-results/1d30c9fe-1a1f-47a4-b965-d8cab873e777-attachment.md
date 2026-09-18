# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API-Testing\08-mocking-api-responses-with-page-route.spec.ts >> Mock OrangeHRM API response
- Location: tests\API-Testing\08-mocking-api-responses-with-page-route.spec.ts:6:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /employee/
Received string:  "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList"

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    6 × locator resolved to <html>…</html>
      - unexpected value "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList"
  - Test timeout of 30000ms exceeded.

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  4  | 
  5  | test('Mock OrangeHRM API response', async ({ page }) => {
  6  | 
  7  |   // Intercept an OrangeHRM API request.
  8  |   await page.route('**/api/**', async route => {
  9  | 
  10 |     // Send our own fake response.
  11 |     await route.fulfill({
  12 |       status: 200,
  13 |       contentType: 'application/json',
  14 |       body: JSON.stringify({
  15 |         data: []
  16 |       })
  17 |     });
  18 |   });
  19 | 
  20 |   // Open OrangeHRM.
  21 |   await page.goto(URL);
  22 | 
  23 |   // Login.
  24 |   await page.getByPlaceholder('Username').fill('Admin');
  25 |   await page.getByPlaceholder('Password').fill('admin123');
  26 |   await page.getByRole('button', { name: 'Login' }).click();
  27 | 
  28 |   // Open Employee List.
  29 |   await page.getByText('PIM').click();
  30 |   await page.getByText('Employee List').click();
  31 | 
  32 |   // Verify the page.
  33 |   await expect(page).toHaveURL(/employee/);
> 34 | });
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  35 | 
  36 | // Why mocking? → Avoid depending on the real API.
  37 | // page.route() → Intercept request.
  38 | // route.fulfill() → Give fake response.
  39 | // Test 200 response.
  40 | // Test 500 response.
  41 | // route.request() → Inspect request.
  42 | // page.unroute() → Remove mock.
```