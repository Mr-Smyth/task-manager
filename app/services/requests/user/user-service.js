// app/services/requests/user/user-service.js
import Service, { inject as service } from '@ember/service';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';

export default class RequestsUserUserService extends Service {
  @service store;
  @service('handlers/user/get-users-handler') getUserHandler;

  constructor() {
    super(...arguments);
    this.manager = new RequestManager();
    this.manager.use([this.getUserHandler, Fetch]);
  }

  handleError(message, error) {
    console.error(message, error);
    alert(message + (error.message || 'Something went wrong Getting the users from the Server.'));
  }

  async getUsers() {
    return this.manager.request({
      url: 'http://localhost:3000/task-manager-data/api/users',
      method: 'GET',
    });
  }
}
