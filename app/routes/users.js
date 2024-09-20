// app/routes/users.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersRoute extends Route {
  @service store;
  @service dataLoader;

  async model() {
    // Retrieve all users from the store
    let users = this.store.findAll('user');

    return users;
  }
}
