import { test, expect, request } from '@playwright/test';
/*
 * API testing is testing the backend APIs directly without using the UI.
 * APIRequestContext: 
 * Playwright's HTTP client for sending API requests without opening a browser.
 *
 * request fixture:
 * Playwright creates an APIRequestContext automatically for each test
 * and closes it after the test.
 */
// APIRequestContext is a Playwright object that allows us to send HTTP/API requests directly without opening a browser page. https://automationexercise.com/api/productsList
const baseURL = "https://jsonplaceholder.typicode.com";
test('use the request fixture', async ({ request }) => { //In Playwright, request is an API client that can send HTTP requests.
  // GET sends an HTTP GET request and returns an APIResponse.
  const response = await request.get(`${baseURL}/posts`);
  console.log(response)
  expect(response.status()).toBe(200);
  expect(response.ok()).toBe(true);
});

test('use page.request', async ({ page }) => {
  await page.goto(baseURL);
  const response = await page.request.get('https://jsonplaceholder.typicode.com/posts');
  console.log(response);
  expect(response.status()).toBe(200);
});

test('create APIRequestContext manually', async () => {
  // request.newContext() Create a new, separate APIRequestContext with my own settings.
  const apiContext = await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: { Accept: 'text/plain' },
  });
  const response = await apiContext.get('/posts');
  console.log(response)
  expect(response.status()).toBe(200);

  // A manually created context must be closed manually.
  await apiContext.dispose();
});
// | Header                     | Meaning                 |
// | -------------------------- | ----------------------- |
// | `Accept: application/json` | I want JSON             |
// | `Accept: application/xml`  | I want XML              |
// | `Accept: text/html`        | I want HTML             |
// | `Accept: text/plain`       | I want plain text       |
// | `Accept: */*`              | I can accept any format |
