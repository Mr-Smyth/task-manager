// app/routes/users.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersRoute extends Route {
  @service store;

  async model() {
    // Retrieve all users from the store
    let allUsers = this.store.peekAll('user');

    return allUsers;
  }
}
