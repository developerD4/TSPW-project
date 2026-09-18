# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API-Testing\08-mocking-api-responses-with-page-route.spec.ts >> route.request - inspect request
- Location: tests\API-Testing\08-mocking-api-responses-with-page-route.spec.ts:39:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Dashboard' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Dashboard' })

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const LOGIN_URL =
  4   |   'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  5   | 
  6   | // Replace this with an API URL from DevTools → Network → Fetch/XHR
  7   | const API_URL = '**/web/index.php/auth/login';
  8   | 
  9   | async function login(page: any) {
  10  |   await page.goto(LOGIN_URL);
  11  | 
  12  |   await page.getByPlaceholder('Username').fill('Admin');
  13  |   await page.getByPlaceholder('Password').fill('admin123');
  14  |   await page.getByRole('button', { name: 'Login' }).click();
  15  | 
> 16  |   await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      |                                                                  ^ Error: expect(locator).toBeVisible() failed
  17  | }
  18  | 
  19  | // 1. Intercept a request
  20  | test('page.route - intercept request', async ({ page }) => {
  21  | 
  22  |   await page.route(API_URL, async route => {
  23  | 
  24  |     console.log('Request intercepted!');
  25  |     console.log('URL:', route.request().url());
  26  | 
  27  |     // Allow the original request to continue
  28  |     await route.continue();
  29  |   });
  30  | 
  31  |   await login(page);
  32  | 
  33  |   // Perform an action that calls the API
  34  |   await page.getByText('PIM').click();
  35  | });
  36  | 
  37  | 
  38  | // 2. Inspect the request
  39  | test('route.request - inspect request', async ({ page }) => {
  40  | 
  41  |   await page.route(API_URL, async route => {
  42  | 
  43  |     const request = route.request();
  44  | 
  45  |     console.log('Request URL:', request.url());
  46  |     console.log('Request method:', request.method());
  47  | 
  48  |     await route.continue();
  49  |   });
  50  | 
  51  |   await login(page);
  52  | 
  53  |   await page.getByText('PIM').click();
  54  | });
  55  | 
  56  | 
  57  | // 3. Replace real response with fake response
  58  | test('route.fulfill - mock response', async ({ page }) => {
  59  | 
  60  |   await page.route(API_URL, async route => {
  61  | 
  62  |     // Do not call the real server.
  63  |     // Return our own response instead.
  64  |     await route.fulfill({
  65  |       status: 200,
  66  |       contentType: 'application/json',
  67  |       body: JSON.stringify({
  68  |         data: []
  69  |       })
  70  |     });
  71  |   });
  72  | 
  73  |   await login(page);
  74  | 
  75  |   await page.getByText('PIM').click();
  76  | });
  77  | 
  78  | 
  79  | // 4. Simulate server error
  80  | test('route.fulfill - simulate 500 error', async ({ page }) => {
  81  | 
  82  |   await page.route(API_URL, async route => {
  83  | 
  84  |     await route.fulfill({
  85  |       status: 500,
  86  |       body: 'Internal Server Error'
  87  |     });
  88  |   });
  89  | 
  90  |   await login(page);
  91  | 
  92  |   await page.getByText('PIM').click();
  93  | });
  94  | 
  95  | 
  96  | // 5. Remove the mock
  97  | test('page.unroute - remove mock', async ({ page }) => {
  98  | 
  99  |   const mockResponse = async (route: any) => {
  100 |     await route.fulfill({
  101 |       status: 200,
  102 |       body: JSON.stringify({ data: [] })
  103 |     });
  104 |   };
  105 | 
  106 |   // Add mock
  107 |   await page.route(API_URL, mockResponse);
  108 | 
  109 |   // Remove mock
  110 |   await page.unroute(API_URL, mockResponse);
  111 | 
  112 |   // After unroute(), the request behaves normally.
  113 |   await login(page);
  114 | });
  115 | 
  116 | // Why mocking? → Avoid depending on the real API.
```