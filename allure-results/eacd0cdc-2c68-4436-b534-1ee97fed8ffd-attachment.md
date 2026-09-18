# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API-Testing\06-handling-authentication-bearer-apikey-cookie.spec.ts >> API Key in Query Parameter
- Location: tests\API-Testing\06-handling-authentication-bearer-apikey-cookie.spec.ts:35:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "demo-key-123"
Received: undefined
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | /*
  4  |  * Authentication:
  5  |  * Authentication = proving who the API caller is.
  6  |  *
  7  |  * 1. Bearer Token → sent in Authorization header
  8  |  * 2. API Key      → sent in a header or query parameter
  9  |  * 3. Cookie       → sent as a cookie
  10 |  */
  11 | 
  12 | // 1. Bearer Token
  13 | test('Bearer Token authentication', async ({ request }) => {
  14 |   const response = await request.get('https://postman-echo.com/headers', {
  15 |     headers: { Authorization: 'Bearer test-token-123' }
  16 |   });
  17 |   expect(response.status()).toBe(200);
  18 |   const body = await response.json();
  19 |   // Verify that the token was sent.
  20 |   expect(body.headers.authorization).toBe('Bearer test-token-123');
  21 | });
  22 | 
  23 | // 2. API Key in Header
  24 | test('API Key in Header', async ({ request }) => {
  25 |   const response = await request.get('https://postman-echo.com/headers', {
  26 |     headers: { 'X-Api-Key': 'demo-key-123' }
  27 |   });
  28 |   expect(response.status()).toBe(200);
  29 |   const body = await response.json();
  30 |   // Verify that the API key was sent.
  31 |   expect(body.headers['x-api-key']).toBe('demo-key-123');
  32 | });
  33 | 
  34 | // 3. API Key as Query Parameter
  35 | test('API Key in Query Parameter', async ({ request }) => {
  36 |   const response = await request.get('https://postman-echo.com/get', {
  37 |     params: {
  38 |       api_key: 'demo-key-123'
  39 |     }
  40 |   });
  41 |   expect(response.status()).toBe(200);
  42 |   const body = await response.json();
  43 |   console.log(body);
  44 |   // Verify the query parameter.
> 45 |   expect(body.api_key).toBe('demo-key-123');
     |                        ^ Error: expect(received).toBe(expected) // Object.is equality
  46 | });
  47 | 
  48 | // 4. Cookie
  49 | test('Cookie authentication', async ({ request }) => {
  50 |   const response = await request.get('https://postman-echo.com/cookies', {
  51 |     headers: {
  52 |       Cookie: 'session_id=abc123'
  53 |     }
  54 |   });
  55 |   expect(response.status()).toBe(200);
  56 |   const body = await response.json();
  57 |   // Verify that the cookie was sent.
  58 |   expect(body.cookies.session_id).toBe('abc123');
  59 | });
  60 | 
  61 | 
  62 | // Authentication → where credential is sent → send request → verify response.
  63 | // | Concept          | Simple meaning                            | Playwright            |
  64 | // | ---------------- | ----------------------------------------- | --------------------- |
  65 | // | **Bearer Token** | Send token in `Authorization` header      | `headers`             |
  66 | // | **API Key**      | Send key to identify/authorize the client | `headers` or `params` |
  67 | // | **Cookie**       | Send session information with request     | `Cookie` header       |
  68 | // | **headers**      | Extra information sent with request       | `headers: {}`         |
  69 | // | **params**       | Query parameters added to URL             | `params: {}`          |
  70 | 
```