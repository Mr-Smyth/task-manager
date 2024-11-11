// app/controllers/tasks.js
import Controller from '@ember/controller';

export default class TasksController extends Controller {
  // Retrieve the tasks from the model
  get tasks() {
    return this.model.tasks;
  }

  // Filter tasks that have no assigned user - relies on `isUnassigned` property on the task model
  get unassignedTasks() {
    return this.tasks.filter((task) => task.isUnassigned);
  }

  // Filter tasks that have an assigned user - relies on `isUnassigned` property on the task model
  get assignedTasks() {
    return this.tasks.filter((task) => !task.isUnassigned);
  }
}
