# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API-Testing\08-mocking-api-responses-with-page-route.spec.ts >> route.continue()
- Location: tests\API-Testing\08-mocking-api-responses-with-page-route.spec.ts:6:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://demo.playwright.dev/todomvc", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const URL = 'https://demo.playwright.dev/todomvc';
  4  | 
  5  | // 1. Intercept + continue
  6  | test('route.continue()', async ({ page }) => {
  7  |   let count = 0;
  8  |   await page.route('**/*', async (route) => { //Whenever the browser makes a request matching this pattern, intercept it. **/* -> Match all network requests.
  9  |     count++;
  10 |     console.log(route.request().url());
  11 |     await route.continue();
  12 |   });
> 13 |   await page.goto(URL);
     |              ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  14 |   expect(count).toBe(5);
  15 | });
  16 | // 2. Inspect request
  17 | test('route.request()', async ({ page }) => {
  18 |   await page.route('**/*', async route => {
  19 |     console.log('URL:', route.request().url());
  20 |     console.log('Method:', route.request().method());
  21 |     await route.continue();
  22 |   });
  23 |   await page.goto(URL);
  24 | });
  25 | // 3. Block request
  26 | test('route.abort()', async ({ page }) => {
  27 |   await page.route('**/*.js', route => {
  28 |     // route.abort();
  29 |     console.log(route.abort())
  30 |   });
  31 |   await page.goto(URL);
  32 |   await expect(page.getByPlaceholder('What needs to be done?')).not.toBeVisible();
  33 | });
  34 | // 4. Mock 200 response
  35 | test('route.fulfill() - 200', async ({ page }) => {
  36 |   await page.route('**/mock.json', route =>
  37 |     route.fulfill({
  38 |       status: 200,
  39 |       body: JSON.stringify({ message: 'Fake data' })
  40 |     })
  41 |   );
  42 |   const response = await page.evaluate(() =>
  43 |     fetch('/mock.json').then(res => res.json())
  44 |   );
  45 |   expect(response.message).toBe('Fake data');
  46 | });
  47 | // 5. Mock 500 response
  48 | test('route.fulfill() - 500', async ({ page }) => {
  49 |   await page.route('**/mock.json', route =>
  50 |     route.fulfill({ status: 500, body: 'Server Error' })
  51 |   );
  52 |   const status = await page.evaluate(() =>
  53 |     fetch('/mock.json').then(res => res.status)
  54 |   );
  55 |   expect(status).toBe(500);
  56 | });
  57 | // 6. Remove mock
  58 | test('page.unroute()', async ({ page }) => {
  59 |   const mock = (route: any) =>
  60 |     route.fulfill({ status: 200, body: 'Mock' });
  61 |   await page.route('**/mock.json', mock);
  62 |   await page.unroute('**/mock.json', mock);
  63 | });
  64 | 
  65 | // Why mocking? → Avoid depending on the real API.
  66 | // page.route() → Intercept request.
  67 | // route.fulfill() → Give fake response.
  68 | // Test 200 response.
  69 | // Test 500 response.
  70 | // route.request() → Inspect request.
  71 | // page.unroute() → Remove mock.
```