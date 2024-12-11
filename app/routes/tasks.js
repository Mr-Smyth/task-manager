import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TasksRoute extends Route {
  // Get Services required
  @service store;
  @service('requests/user/user-service') requestUserService;
  @service('requests/task/task-service') requestTaskService;

  async model() {
    // Fetch users and tasks from the API each time
    await this.requestTaskService.getTasks();
    await this.requestUserService.getUsers();

    // Retrieve the latest data from the store (now populated with API data)
    let tasks = this.store.peekAll('task');
    let users = this.store.peekAll('user');

    return { tasks, users };
  }

  // Hook to reset the selectedFilter to 'all' when entering this route
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.selectedFilter = 'all'; // Reset the filter to 'all' on page load
  }
}
