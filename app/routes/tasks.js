// app/routes/tasks.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TasksRoute extends Route {
  @service store;
  @service dataLoader;

  async model() {
    // Load the tasks
    await this.dataLoader.loadTasks();

    // Return all tasks and users as is
    // getting the tasks locally from dataLoader
    // getting the users from the store
    let tasks = this.store.peekAll('task');
    let users = this.store.findAll('user');

    return {
      tasks,
      users,
    };
  }
}
