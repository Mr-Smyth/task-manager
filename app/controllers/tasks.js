// app/controllers/tasks.js
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TasksController extends Controller {
  @service store;

  // Changed from // @tracked tasks = this.model.tasks to a getter
  get tasks() {
    return this.model.tasks;
  }

  // Changed from // @tracked users = this.model.users to a getter
  get users() {
    return this.model.users;
  }

  get unassignedTasks() {
    // Filtering tasks in an filter/if where the user name is 'Unassigned' - moved from route
    return this.tasks.filter((task) => {
      return task.isUnassigned;
    });
  }

  get assignedTasks() {
    // Filtering tasks in an filter/if where the user name is not 'Unassigned' - moved from route
    return this.tasks.filter((task) => {
      return !task.isUnassigned;
    });
  }

  @action
  assignUser(taskId, userId) {
    let task = this.tasks.find((task) => task.id === taskId);
    let user = this.users.find((user) => user.id === userId);

    // no checks needed here for null values as a task not linked wont have a user_id - this will be a case so we just set
    task.set('user', user);
  }
}
