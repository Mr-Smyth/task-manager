import Service, { inject as service } from '@ember/service';
import { normalizeUserToJsonAPIPayload } from '../../../utils/normalize-to-json-api'; // If needed, implement normalization logic

export default class HandlersUserUpdateUserHandlerService extends Service {
  @service store;

  /**
   * Handles the request to update a user by normalizing the response data and updating the store with the new user information.
   *
   * This method performs the following steps:
   * 1. Wait for the response from the next handler in the chain (typically the server's response).
   * 2. Check if the response contains the updated user data.
   * 3. Normalize the user data using a utility function (if needed).
   * 4. Push the normalized user into the store, updating the existing user if it already exists.
   * 5. Return the original response containing the updated user.
   *
   * @param {Object} context - The context object passed through the handler chain, containing the request and response data.
   * @param {Function} next - The next handler function that processes the request and provides the response.
   * @returns {Object} - The original response containing the updated user data.
   */
  async request(context, next) {
    // Call the next handler in the chain (the actual request)
    const response = await next(context.request);

    // If the response contains a user, normalize and update the store
    if (response.content.users && response.content.users.length > 0) {
      const updatedUser = response.content.users[0];

      // Normalize the user data using the utility function and prepare it for the store
      const userRecord = normalizeUserToJsonAPIPayload(updatedUser);

      // Push the normalized user data into the Ember Data store
      this.store.push(userRecord);
    }

    return response;
  }
}
