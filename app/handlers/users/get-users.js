import { inject as service } from '@ember/service';

export default class GetUsersHandler {
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
            first_name: user.first_name,
            last_name: user.last_name,
            description: user.description,
          });
        } else {
          existingUser.setProperties({
            first_name: user.first_name,
            last_name: user.last_name,
            description: user.description,
          });
        }
      });
    }
     // Return and log users from the store
     const usersInStore = this.store.peekAll('user');
     console.log('Users in Store:', usersInStore.slice());
     return usersInStore;
  }
}
