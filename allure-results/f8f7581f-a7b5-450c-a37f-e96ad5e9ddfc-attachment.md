# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API-Testing\08-mocking-api-responses-with-page-route.spec.ts >> Mock successful API response
- Location: tests\API-Testing\08-mocking-api-responses-with-page-route.spec.ts:32:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#result')
Expected: "John - Admin"
Received: "Error: Failed to execute 'fetch' on 'Window': Failed to parse URL from /api/user"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#result')
    14 × locator resolved to <div id="result">Error: Failed to execute 'fetch' on 'Window': Fai…</div>
       - unexpected value "Error: Failed to execute 'fetch' on 'Window': Failed to parse URL from /api/user"

```

```yaml
- text: "Error: Failed to execute 'fetch' on 'Window': Failed to parse URL from /api/user"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | /*
  4   |  * Mocking:
  5   |  * We replace a real API response with our own test response.
  6   |  *
  7   |  * page.route()      → intercepts the API request
  8   |  * route.fulfill()   → sends our fake response
  9   |  * route.request()   → gives request information
  10  |  * page.unroute()    → removes the mock
  11  |  */
  12  | 
  13  | const html = `
  14  |   <button id="load">Load User</button>
  15  |   <div id="result"></div>
  16  |   <script>
  17  |     document.getElementById('load').onclick = async () => {
  18  |       try {
  19  |         const response = await fetch('/api/user');
  20  |         if (!response.ok) {
  21  |           throw new Error(response.status);
  22  |         }
  23  |         const user = await response.json();
  24  |         document.getElementById('result').textContent = user.name + ' - ' + user.role;
  25  |       } catch (error) {
  26  |         document.getElementById('result').textContent = 'Error: ' + error.message;
  27  |       }
  28  |     };
  29  |   </script>`;
  30  | 
  31  | // 1. Mock a successful API response
  32  | test('Mock successful API response', async ({ page }) => {
  33  | 
  34  |   await page.route('**/api/user', async route => {
  35  |     await route.fulfill({
  36  |       status: 200,
  37  |       contentType: 'application/json',
  38  |       body: JSON.stringify({
  39  |         name: 'John',
  40  |         role: 'Admin'
  41  |       })
  42  |     });
  43  |   });
  44  |   await page.setContent(html);
  45  |   await page.locator('#load').click();
  46  | 
> 47  |   await expect(page.locator('#result')).toHaveText('John - Admin');
      |                                         ^ Error: expect(locator).toHaveText(expected) failed
  48  | });
  49  | 
  50  | // 2. Mock a server error
  51  | test('Mock API error', async ({ page }) => {
  52  | 
  53  |   await page.route('**/api/user', async route => {
  54  |     await route.fulfill({
  55  |       status: 500,
  56  |       body: 'Server Error'
  57  |     });
  58  |   });
  59  | 
  60  |   await page.setContent(html);
  61  |   await page.locator('#load').click();
  62  | 
  63  |   await expect(page.locator('#result'))
  64  |     .toHaveText('Error: 500');
  65  | });
  66  | 
  67  | 
  68  | // 3. Read the intercepted request
  69  | test('Inspect API request', async ({ page }) => {
  70  |   let requestUrl = '';
  71  |   await page.route('**/api/user', async route => {
  72  | 
  73  |     requestUrl = route.request().url();
  74  | 
  75  |     await route.fulfill({
  76  |       status: 200,
  77  |       contentType: 'application/json',
  78  |       body: JSON.stringify({
  79  |         name: 'David',
  80  |         role: 'User'
  81  |       })
  82  |     });
  83  |   });
  84  | 
  85  |   await page.setContent(html);
  86  |   await page.locator('#load').click();
  87  | 
  88  |   expect(requestUrl).toContain('/api/user');
  89  | });
  90  | 
  91  | 
  92  | // 4. Remove the mock
  93  | test('Remove API mock', async ({ page }) => {
  94  | 
  95  |   const mock = async (route: any) => {
  96  |     await route.fulfill({
  97  |       status: 200,
  98  |       body: JSON.stringify({ name: 'Mock User' })
  99  |     });
  100 |   };
  101 | 
  102 |   await page.route('**/api/user', mock);
  103 | 
  104 |   // Remove the route.
  105 |   await page.unroute('**/api/user', mock);
  106 | });
  107 | 
  108 | // Why mocking? → Avoid depending on the real API.
  109 | // page.route() → Intercept request.
  110 | // route.fulfill() → Give fake response.
  111 | // Test 200 response.
  112 | // Test 500 response.
  113 | // route.request() → Inspect request.
  114 | // page.unroute() → Remove mock.
```