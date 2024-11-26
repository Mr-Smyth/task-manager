import Service, { inject as service } from '@ember/service';
import { normalizeUserToJsonAPIPayload } from '../../../utils/normalize-to-json-api';

export default class HandlersUserCreateUserHandlerService extends Service {
  @service store;

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
