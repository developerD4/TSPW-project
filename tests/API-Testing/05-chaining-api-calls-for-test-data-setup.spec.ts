import { test, expect } from '@playwright/test';

/*
 * API Chaining:
 * Perform multiple dependent API operations using the same data.
 *
 * Example:
 * POST → create data
 * GET  → read the created data
 * PUT  → update the data
 * GET  → verify the update
 * DELETE → remove the data
 *
 * JSONPlaceholder is a practice API.
 * POST, PUT and DELETE responses are simulated.
 */
// 1. CREATE → UPDATE → GET → DELETE
test('API chaining - create, update, read and delete', async ({ request }) => {

  // CREATE
  const createResponse = await request.post(
    'https://jsonplaceholder.typicode.com/posts',
    {
      data: {
        title: 'Original Title',
        body: 'Original content',
        userId: 1
      }
    }
  );
  expect(createResponse.status()).toBe(201);
  const createdPost = await createResponse.json();
  console.log(createdPost);
  const postId = createdPost.userId;
  // UPDATE the same post.
  const updateResponse = await request.put(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      data: {
        id: postId,
        title: 'Updated Title',
        body: 'Updated content',
        userId: 1
      }
    }
  );
  expect(updateResponse.status()).toBe(200);
  // READ again and verify the update.
  const getResponse = await request.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  expect(getResponse.status()).toBe(200);
  // DELETE the same post.
  const deleteResponse = await request.delete(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  expect(deleteResponse.status()).toBe(200);
});
