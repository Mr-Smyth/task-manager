// app/services/handlers/user/get-user-handler.js
import Service, { inject as service } from '@ember/service';

export default class HandlersUserGetUserHandler extends Service {
  @service store;

  async request(context, next) {
    const response = await next(context.request);

    // Handling the GET response and normalizing data for the store

    // Check if the response contains an array of users - which it should
    if (Array.isArray(response.content.users)) {
      response.content.users.forEach((user) => {
        let existingUser = this.store.peekRecord('user', String(user.id));
        if (!existingUser) {
          this.store.createRecord('user', {
            id: String(user.id),
            firstName: user.first_name,
            lastName: user.last_name,
            description: user.description,
          });
        } else {
          existingUser.setProperties({
            firstName: user.first_name,
            lastName: user.last_name,
            description: user.description,
          });
        }
      });
    }
    // Return and log users from the store
    const usersInStore = this.store.peekAll('user');
    return usersInStore;
  }
}
