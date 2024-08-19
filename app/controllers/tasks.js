// app/controllers/tasks.js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class TasksController extends Controller {
  @service store;

  // Get the tasks from the model
  get tasks() {
    return this.model.tasks;
  }

  // Get Users from the model
  get users() {
    return this.model.users;
  }

  get unassignedTasks() {
    // Filtering tasks where the task has no user
    return this.tasks.filter((task) => {
      return task.isUnassigned;
    });
  }

  get assignedTasks() {
    // Filtering tasks where the task has a user
    return this.tasks.filter((task) => {
      return !task.isUnassigned;
    });
  }

}
