import { test, expect } from '@playwright/test';

/*
 * API Response Validation
 * Status  → HTTP result
 * Headers → response information
 * Body    → data returned by API
 */

// 1. Validate status code
test('Validate status code', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  // status() returns the HTTP status code.
  expect(response.status()).toBe(200);

  // ok() returns true for 200-299 status codes.
  expect(response.ok()).toBe(true);
});

// 2. Validate response headers
test('Validate response headers', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  // headers() returns response headers.
  const headers = response.headers();

  expect(headers['content-type']).toContain('application/json');
});

// 3. Validate response body
test('Validate response body', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  // json() converts JSON response into a JavaScript object.
  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.userId).toBe(1);
  expect(body.title1).toBeTruthy();
  expect(body.body).toBeTruthy();
});

// 4. Validate selected fields
test('Validate selected fields', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  const body = await response.json();

  // toMatchObject() checks only the fields we specify.
  expect(body).toMatchObject({
    id: 1,
    userId: 1,
    title: "Updatedtest post"
  });
});

// 5. Read response as text
test('Read response as text', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  // text() returns the response body as a string.
  const body = await response.text();
  console.log(body)
  expect(body).toContain('"id": 1');
});

// 6. Validate error response
test('Validate 404 response', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/999999'
  );

  expect(response.status()).toBe(404);

  // 404 is not a successful HTTP status.
  expect(response.ok()).toBe(false);
});

// | Status  | Name                  | Simple meaning                              |
// | ------- | --------------------- | ------------------------------------------- |
// | **200** | OK                    | Request was successful                      |
// | **201** | Created               | New resource was created                    |
// | **204** | No Content            | Request succeeded, but no response body     |
// | **400** | Bad Request           | Request/data is invalid                     |
// | **401** | Unauthorized          | Authentication is missing/invalid           |
// | **403** | Forbidden             | Authenticated, but not allowed              |
// | **404** | Not Found             | Resource/API endpoint not found             |
// | **405** | Method Not Allowed    | HTTP method isn't allowed for that endpoint |
// | **409** | Conflict              | Request conflicts with existing data        |
// | **422** | Unprocessable Content | Data format/validation is unacceptable      |
// | **500** | Internal Server Error | Server-side error                           |
// | **502** | Bad Gateway           | Gateway/proxy received a bad response       |
// | **503** | Service Unavailable   | Server/service temporarily unavailable      |