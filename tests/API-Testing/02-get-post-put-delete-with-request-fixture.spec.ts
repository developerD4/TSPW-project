import { test, expect } from '@playwright/test';

/*
 * HTTP methods:
 * GET    = read data
 * POST   = create data
 * PUT    = update data
 * DELETE = remove data
 *
 * JSONPlaceholder is a fake API used for testing and practice.
 */
// GET - Read data
test('GET - read posts', async ({ request }) => {
  //shift+Alt+F
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});
// POST - Create data
test('POST - create post', async ({ request }) => {

  const response = await request.post(
    'https://jsonplaceholder.typicode.com/posts',
    {
      data: {
        title: 'API Test Post',
        body: 'Created using Playwright',
        userId: 1
      }
    }
  );
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.title).toBe('API Test Post');
  expect(body.body).toBe('Created using Playwright');
  expect(body.userId).toBe(1);
});
// PUT - Update data
test('PUT - update post', async ({ request }) => {
  const response = await request.put(
    'https://jsonplaceholder.typicode.com/posts/1',
    {
      data: {
        id: 1,
        title: 'Updated Post',
        body: 'Updated using Playwright',
        userId: 1
      }
    }
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.title).toBe('Updated Post');
  expect(body.body).toBe('Updated using Playwright');
});
// DELETE - Remove data
test('DELETE - delete post', async ({ request }) => {
  const response = await request.delete(
    'https://jsonplaceholder.typicode.com/posts/1'
  );
  expect(response.status()).toBe(200);
});

// json() converts a JSON response into a JavaScript object.
// const jsonData = '{"id":101,"name":"John"}';
// const jsonresult = JSON.parse(jsonData)
// const user = { id: 101, 1: "John" };
// console.log(jsonresult.id)
// console.log(user.id)

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
