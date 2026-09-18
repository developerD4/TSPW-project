import { test, expect } from '@playwright/test';
/*
 * Authentication:
 * Authentication = proving who the API caller is.
 *
 * 1. Bearer Token → sent in Authorization header
 * 2. API Key      → sent in a header or query parameter
 * 3. Cookie       → sent as a cookie
 */
// 1. Bearer Token
test('Bearer Token authentication', async ({ request }) => {
  const response = await request.get('https://postman-echo.com/headers', {
    headers: { Authorization: 'Bearer test-token-123' }
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  // Verify that the token was sent.
  expect(body.headers.authorization).toBe('Bearer test-token-123');
});

// 2. API Key in Header
test('API Key in Header', async ({ request }) => {
  const response = await request.get('https://postman-echo.com/headers', {
    headers: { 'X-Api-Key': 'demo-key-123' }
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  // Verify that the API key was sent.
  expect(body.headers['x-api-key']).toBe('demo-key-123');
});
// 3. API Key as Query Parameter === https://postman-echo.com/get?api_key=demo-key-123
test('API Key in Query Parameter', async ({ request }) => {
  const response = await request.get('https://postman-echo.com/get', {
    params: {
      api_key: 'demo-key-123'
    }//get?api_key=demo-key-123
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);
  // Verify the query parameter.
  expect(body.args.api_key).toBe('demo-key-123');
});
// 4. Cookie
test('Cookie authentication', async ({ request }) => {
  const response = await request.get('https://postman-echo.com/cookies', {
    headers: {
      Cookie: 'session_id=abc123'
    }
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  // Verify that the cookie was sent.
  expect(body.cookies.session_id).toBe('abc123');
});


// Authentication → where credential is sent → send request → verify response.
// | Concept          | Simple meaning                            | Playwright            |
// | ---------------- | ----------------------------------------- | --------------------- |
// | **Bearer Token** | Send token in `Authorization` header      | `headers`             |
// | **API Key**      | Send key to identify/authorize the client | `headers` or `params` |
// | **Cookie**       | Send session information with request     | `Cookie` header       |
// | **headers**      | Extra information sent with request       | `headers: {}`         |
// | **params**       | Query parameters added to URL             | `params: {}`          |
