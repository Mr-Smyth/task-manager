// tests/unit/services/handlers/user/create-user-handler-test.js
import { module, test } from 'qunit';
import { setupTest } from 'task-manager/tests/helpers';
import { run } from '@ember/runloop';
import { normalizeUserToJsonAPIPayload } from 'task-manager/utils/normalize-to-json-api';

module('Unit | Service | handlers/user/create-user-handler', function (hooks) {
  setupTest(hooks);

  // Test that the service exists
  test('it exists', function (assert) {
    let service = this.owner.lookup(
      'service:handlers/user/create-user-handler',
    );
    assert.ok(service);
  });

  // Test that a user is added to the store when createUser is called
  test('it adds the new user to the store after creation', async function (assert) {
    // Mocking the response from the createUser service
    const mockResponse = {
      content: {
        users: [
          {
            id: 1,
            first_name: 'Louie',
            last_name: 'Smyth',
            description: 'Student',
            taskIds: [],
          },
        ],
      },
    };

    // Mock the store to simulate the store's push method
    let store = this.owner.lookup('service:store');

    // We'll mock the normalizeUserToJsonAPIPayload function by directly invoking it
    let normalizedUser = normalizeUserToJsonAPIPayload(
      mockResponse.content.users[0],
    );

    // Before executing, check the store length to ensure it starts empty - perhaps not required
    let initialStoreCount = store.peekAll('user').length;

    // Mocking the next handler function to return the mock response
    let service = this.owner.lookup(
      'service:handlers/user/create-user-handler',
    );
    let next = () => Promise.resolve(mockResponse);

    // Execute the request method
    await service.request({ request: {}, response: {} }, next);

    // After the request, check if the store has increased in length (user was added)
    let updatedStoreCount = store.peekAll('user').length;

    assert.equal(
      updatedStoreCount,
      initialStoreCount + 1,
      'A new user was added to the store',
    );

    // Check if the new user is correctly in the store
    let userInStore = store.peekRecord('user', normalizedUser.id);

    assert.ok(userInStore, 'The new user is present in the store');
    assert.deepEqual(
      userInStore.toJSON(),
      normalizedUser,
      'The user in the store matches the normalized user data',
    );
  });
});
