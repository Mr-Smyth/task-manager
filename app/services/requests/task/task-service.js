// app/services/requests/task/task-service.js
import Service, { inject as service } from '@ember/service';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';

export default class RequestsTaskTaskServiceService extends Service {
  @service store;
  @service('handlers/task/get-tasks-handler') getTaskHandler;

  constructor() {
    super(...arguments);
    this.manager = new RequestManager();
    this.manager.use([this.getTaskHandler, Fetch]);
  }

  async getTasks() {
    return this.manager.request({
      url: 'http://localhost:3000/task-manager-data/api/tasks',
      method: 'GET',
    });
  }
}
