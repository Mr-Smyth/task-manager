// app/controllers/tasks.js
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TasksController extends Controller {
  // Inject router and store services
  @service router;
  @service store;

  // Define the assignUser action to assign a user to a task
  @action
  async assignUser(taskId, userId) {
    console.log('Inside assignUser: app/controllers/tasks.js');
    console.log('Task ID:', taskId, 'User ID:', userId);

    // Retrieve the task and user records by their IDs
    let task = this.store.peekRecord('task', taskId);
    let user = this.store.peekRecord('user', userId);

    // If both task and user exist, assign the user to the task use set
    // 
    if (task && user) {
      task.set('user', user);
      this.router.refresh('tasks'); 
    }
  }
}

