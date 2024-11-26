// tests/unit/services/handlers/task/update-task-handler-test.js
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Service | handlers/task/update-task-handler', function (hooks) {
  setupTest(hooks); // This sets up the test environment for the service

  test('it exists', function (assert) {
    let service = this.owner.lookup('service:handlers/task/update-task-handler');
    assert.ok(service);
  });

  test('it normalizes and updates the store when response contains a task', async function (assert) {
    // Mock the store.push method to capture the arguments passed to it
    let store = this.owner.lookup('service:store');
    let capturedData = null;

    // Override the store's push method to capture the data it is called with
    store.push = function (data) {
      capturedData = data;
    };

    // Creating a mock task response that would be returned from the "next" handler
    const mockResponse = {
      content: {
        task: {
          id: 1,
          title: 'Updated Task',
          description: 'Updated Description',
          userId: '2',
        },
      },
    };

    // Creating a fake next handler function that returns the mock response
    const next = async () => mockResponse;

    // Lookup the service we want to test
    let service = this.owner.lookup('service:handlers/task/update-task-handler');

    // Run the request method (the one that processes the task update)
    await run(() => service.request({ request: {} }, next));

    // Assert that store.push was called
    assert.ok(capturedData, 'store.push was called');

    // Assert that store.push was called with the correct normalized data
    const normalizedData = {
      data: {
        id: '1',
        type: 'task',
        attributes: {
          title: 'Updated Task',
          description: 'Updated Description',
        },
        relationships: {
          user: {
            data: {
              id: '2',
              type: 'user',
            },
          },
        },
      },
    };

    assert.deepEqual(capturedData, normalizedData, 'store.push was called with the correct normalized data');
  });
});
