// app/routes/users.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersRoute extends Route {
  @service store;
  @service dataLoader;

  async model() {
    // Load the tasks and users concurrently
    await Promise.all([
      this.dataLoader.loadUsers(),
      this.dataLoader.loadTasks(),
    ]);
    // Retrieve all users from the store
    let allUsers = this.store.peekAll('user');

    return allUsers;
  }
}
