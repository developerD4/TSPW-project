# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API-Testing\01-apirequestcontext-overview-and-setup.spec.ts >> use page.request
- Location: tests\API-Testing\01-apirequestcontext-overview-and-setup.spec.ts:22:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://automationexercise.com/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect, request } from '@playwright/test';
  2  | 
  3  | /*
  4  |  * API testing is testing the backend APIs directly without using the UI.
  5  |  * APIRequestContext: 
  6  |  * Playwright's HTTP client for sending API requests without opening a browser.
  7  |  *
  8  |  * request fixture:
  9  |  * Playwright creates an APIRequestContext automatically for each test
  10 |  * and closes it after the test.
  11 |  */
  12 | // APIRequestContext is a Playwright object that allows us to send HTTP/API requests directly without opening a browser page.
  13 | const baseURL = "https://automationexercise.com";
  14 | test('use the request fixture', async ({ request }) => { //In Playwright, request is an API client that can send HTTP requests.
  15 |   // GET sends an HTTP GET request and returns an APIResponse.
  16 |   const response = await request.get(`${baseURL}/api/productsList`);
  17 |   console.log(response)
  18 |   expect(response.status()).toBe(200);
  19 |   expect(response.ok()).toBe(true);
  20 | });
  21 | 
  22 | test('use page.request', async ({ page }) => {
  23 |   // page.request is an APIRequestContext connected to the browser context.
> 24 |   await page.goto('https://automationexercise.com');
     |              ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  25 |   const response = await page.request.get('https://automationexercise.com/api/productsList');
  26 |   console.log(response)
  27 |   expect(response.status()).toBe(200);
  28 | });
  29 | 
  30 | test('create APIRequestContext manually', async () => {
  31 |   // request.newContext() creates a new API client with its own settings.
  32 |   const apiContext = await request.newContext({
  33 |     baseURL: 'https://automationexercise.com',
  34 |     extraHTTPHeaders: {
  35 |       Accept: 'application/json',
  36 |     }, // adds headers to API requests made by this context. It is not mandatory for every API. If the API works without the Accept header, you don't need to add it.
  37 |   });
  38 | 
  39 |   const response = await apiContext.get('/api/productsList');
  40 |   console.log(response)
  41 |   expect(response.status()).toBe(200);
  42 | 
  43 |   // A manually created context must be closed manually.
  44 |   await apiContext.dispose();
  45 | });
  46 | // | Header                     | Meaning                 |
  47 | // | -------------------------- | ----------------------- |
  48 | // | `Accept: application/json` | I want JSON             |
  49 | // | `Accept: application/xml`  | I want XML              |
  50 | // | `Accept: text/html`        | I want HTML             |
  51 | // | `Accept: text/plain`       | I want plain text       |
  52 | // | `Accept: */*`              | I can accept any format |
  53 | 
  54 | 
```