// app/routes/users.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersRoute extends Route {
  // Get Services required
  @service store;
  @service('requests/user/user-service') requestsUserUserService;

  async model() {
    let users = this.store.peekAll('user');

    if (users.length > 0) {
      // Return users from the store if they exist

      // Just to log the users for viewing purposes - this can be removed once completed
      users.forEach((user) => {
        console.log('Users In Store:', {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          description: user.description,
        });
      });

      return users;
    }

    // otherwise get them from the API
    let getApiUsers = await this.requestsUserUserService.getUsers();
    users = getApiUsers.content;

    // Just to log the users for viewing purposes - this can be removed once completed
    users.forEach((user) => {
      console.log('Users From API:', {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        description: user.description,
      });
    });
    return users;
  }
}
