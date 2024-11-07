// app/services/handlers/user/get-users-handler.js
import Service, { inject as service } from '@ember/service';
import { normalizeUserToJsonAPIPayload } from '../../../utils/normalize-to-json-api';

export default class HandlersUserGetUsersHandler extends Service {
  @service store;

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
