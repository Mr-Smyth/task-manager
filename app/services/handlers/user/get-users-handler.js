import Service, { inject as service } from '@ember/service';
import { normalizeUserToJsonAPIPayload } from '../../../utils/normalize-to-json-api';

export default class HandlersUserGetUsersHandler extends Service {
  @service store;

  /**
   * Handles the request to fetch users from the server, normalizes the response data,
   * and updates the Ember store with the retrieved users.
   *
   * This method performs the following steps:
   * 1. Wait for the response from the next handler in the chain (the server's response).
   * 2. Normalize each user in the response data and push them into the store.
   * 3. Return a full list of users from the Ember data store.
   *
   * @param {Object} context - The context object containing the request and response information.
   * @param {Function} next - The next handler function in the middleware chain that processes the request and provides the response.
   * @returns {Array} - A list of all users stored in the Ember data store.
   */

  async request(context, next) {
    const response = await next(context.request);

    // Handling the GET response and normalizing data for the store
    if (Array.isArray(response.content.users)) {
      response.content.users.forEach((user) => {
        const userRecord = normalizeUserToJsonAPIPayload(user);
        // Push the user record into the store, updating if it exists
        this.store.push(userRecord);
      });
    }

    // Return users from the store
    return this.store.peekAll('user');
  }
}
