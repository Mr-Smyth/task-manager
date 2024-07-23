import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersRoute extends Route {
  @service store;
  @service dataLoader;

  async model() {
    // Retrieve all users and tasks from the store
    let allUsers = this.store.peekAll('user');

    // Filter out users whose name is 'Unassigned' because i dont want them in the list of users
    let filteredUsers = allUsers.filter((user) => user.name !== 'Unassigned');

    return filteredUsers;
  }
}
