// app/services/requests/user/user-service.js
import Service, { inject as service } from '@ember/service';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';

export default class RequestsUserUserService extends Service {
  @service store;
  @service('handlers/user/get-users-handler') getUserHandler;
  @service('handlers/user/create-user-handler') createUserHandler;

  constructor() {
    super(...arguments);
    this.manager = new RequestManager();
    this.manager.use([this.getUserHandler, this.createUserHandler, Fetch]);
  }

  async getUsers() {
    return this.manager.request({
      url: 'http://localhost:3000/task-manager-data/api/users',
      method: 'GET',
    });
  }

  async createUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json'); // Set the request content type to JSON

    // Send a PATCH request to update the task with new details
    return this.manager.request({
      url: `http://localhost:3000/task-manager-data/api/users`,
      method: 'POST',
      body: JSON.stringify({
        first_name: user.firstName,
        last_name: user.lastName,
        description: user.description,
      }),
      headers: headers,
    });
  }
}
