// app/routes/users.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersRoute extends Route {
  @service store;
  @service dataLoader;

  async model() {
    // Retrieve all users from the store
    let users = await this.store.findAll('user');

    // Log user attributes for better inspection
    users.forEach(user => {
      console.log('User:', {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        description: user.description,
      });
    });

    return users;
  }
}
