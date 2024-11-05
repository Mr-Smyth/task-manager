// app/routes/tasks.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TasksRoute extends Route {
  @service store;
  @service('requests/task/task-service') requestsTaskTaskService;
  @service('requests/user/user-service') requestsUserUserService;

  async model() {
    // Fetch users and tasks from the API each time
    await this.requestsTaskTaskService.getTasks();
    await this.requestsUserUserService.getUsers();
  
    // Retrieve the latest data from the store (now populated with API data)
    let tasks = this.store.peekAll('task');
    let users = this.store.peekAll('user');
  
    return { tasks, users };
  }  
}
