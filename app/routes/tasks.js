// app/routes/tasks.js
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

    // Return all tasks and users as is
    let tasks = this.store.peekAll('task');
    let users = this.store.peekAll('user');

    return {
      tasks,
      users,
    };
  }
}
