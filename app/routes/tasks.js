import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TasksRoute extends Route {
  @service store;
  @service dataLoader;

  async model() {
    // Load the tasks and users concurrently
    await Promise.all([
      this.dataLoader.loadUsers(),
      this.dataLoader.loadTasks(),
    ]);

    let tasks = this.store.peekAll('task');
    let users = this.store.peekAll('user');

    // return the users and tasks as i need to pass the users to the user-select component
    return { tasks, users };
  }
}
