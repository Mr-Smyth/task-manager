// app/routes/users.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersRoute extends Route {
  // Get Services required
  @service store;
  @service('requests/user/user-service') requestUserService;

  async model() {
    // Fetch users from the API each time
    await this.requestUserService.getUsers();
  
    // Retrieve the latest data from the store (now populated with API data)
    let users = this.store.peekAll('user');
  
    return users;
  }  
}
