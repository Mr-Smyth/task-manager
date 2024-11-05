// app/services/handlers/user/get-users-handler.js
import Service, { inject as service } from '@ember/service';

export default class HandlersUserGetUsersHandler extends Service {
  @service store;

  async request(context, next) {
    const response = await next(context.request);

    // Handling the GET response and normalizing data for the store

    // Check if the response contains an array of users - which it should
    if (Array.isArray(response.content.users)) {
      response.content.users.forEach((user) => {
        let existingUser = this.store.peekRecord('user', String(user.id));

        // using push - so the store will expect the correct format - setting up userRecord to be the correct format
        const userRecord = {
          data: {
            id: String(user.id),
            type: 'user',
            attributes: {
              firstName: user.first_name,
              lastName: user.last_name,
              description: user.description,
            }
          }
        };

        // and if exists or not we update the store
        if (!existingUser) {
          this.store.push(userRecord);
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
