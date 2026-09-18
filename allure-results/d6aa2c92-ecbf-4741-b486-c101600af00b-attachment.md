# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API-Testing\05-chaining-api-calls-for-test-data-setup.spec.ts >> API chaining - create, update, read and delete
- Location: tests\API-Testing\05-chaining-api-calls-for-test-data-setup.spec.ts:18:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | /*
  4  |  * API Chaining:
  5  |  * Perform multiple dependent API operations using the same data.
  6  |  *
  7  |  * Example:
  8  |  * POST → create data
  9  |  * GET  → read the created data
  10 |  * PUT  → update the data
  11 |  * GET  → verify the update
  12 |  * DELETE → remove the data
  13 |  *
  14 |  * JSONPlaceholder is a practice API.
  15 |  * POST, PUT and DELETE responses are simulated.
  16 |  */
  17 | // 1. CREATE → UPDATE → GET → DELETE
  18 | test('API chaining - create, update, read and delete', async ({ request }) => {
  19 | 
  20 |   // CREATE
  21 |   const createResponse = await request.post(
  22 |     'https://jsonplaceholder.typicode.com/posts',
  23 |     {
  24 |       data: {
  25 |         title: 'Original Title',
  26 |         body: 'Original content',
  27 |         userId: 1
  28 |       }
  29 |     }
  30 |   );
  31 |   expect(createResponse.status()).toBe(201);
  32 |   const createdPost = await createResponse.json();
  33 |   console.log(createdPost);
  34 |   const postId = createdPost.id;
  35 |   // UPDATE the same post.
  36 |   const updateResponse = await request.put(
  37 |     `https://jsonplaceholder.typicode.com/posts/${postId}`,
  38 |     {
  39 |       data: {
  40 |         id: postId,
  41 |         title: 'Updated Title',
  42 |         body: 'Updated content',
  43 |         userId: 1
  44 |       }
  45 |     }
  46 |   );
> 47 |   expect(updateResponse.status()).toBe(200);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  48 |   // READ again and verify the update.
  49 |   const getResponse = await request.get(
  50 |     `https://jsonplaceholder.typicode.com/posts/${postId}`
  51 |   );
  52 | 
  53 |   expect(getResponse.status()).toBe(200);
  54 |   // DELETE the same post.
  55 |   const deleteResponse = await request.delete(
  56 |     `https://jsonplaceholder.typicode.com/posts/${postId}`
  57 |   );
  58 | 
  59 |   expect(deleteResponse.status()).toBe(200);
  60 | });
  61 | 
```