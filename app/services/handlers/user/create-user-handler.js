import Service, { inject as service } from '@ember/service';
import { normalizeUserToJsonAPIPayload } from '../../../utils/normalize-to-json-api';

export default class HandlersUserCreateUserHandlerService extends Service {
  @service store;

  /**
   * Handles the request to create a new user. This method processes the response from the server,
   * normalizes the user data, and pushes it into the store.
   *
   * The method follows these steps:
   * 1. Await the response from the next handler in the chain.
   * 2. Check if the response contains an array of users.
   * 3. For each user, normalize the data and push it into the store.
   * 4. Return the list of all users stored in the Ember data store.
   *
   * @param {Object} context - The context object containing request and response information.
   * @param {Function} next - The next handler function in the chain that returns the response promise.
   * @returns {Array} - A list of all users stored in the Ember data store, including the newly created user.
   */

  async request(context, next) {
    const response = await next(context.request);

    // Handling the POST response and normalizing data for the store
    if (Array.isArray(response.content.users)) {
      response.content.users.forEach((user) => {
        const userRecord = normalizeUserToJsonAPIPayload(user);
        // Push the user record into the store
        this.store.push(userRecord);
      });
    }

    // Return users from the store
    return this.store.peekAll('user');
  }
}
