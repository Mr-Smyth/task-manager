// app/controllers/tasks.js
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TasksController extends Controller {
  @service store;
  // track the tasks from the model provided in the route
  @tracked tasks = this.model.tasks;
  @tracked users = this.model.users;

  get unassignedTasks() {
    // Filtering tasks in an filter/if where the user name is 'Unassigned' - moved from route
    return this.tasks.filter((task) => {
      let userName = task.get('user') ? task.get('user').get('name') : 'Unassigned';
      return userName === 'Unassigned';
    });
  }

  get assignedTasks() {
    // Filtering tasks in an filter/if where the user name is not 'Unassigned' - moved from route
    return this.tasks.filter((task) => {
      let userName = task.get('user') ? task.get('user').get('name') : 'Unassigned';
      return userName !== 'Unassigned';
    });
  }

  @action
  assignUser(taskId, userId) {

    // I found no possible way to remove the refresh option and still get it to work, so i began to redo my tasks.js route and integrate it more neatly into this controller
    // It now seems to work, perhaps given my different approach above where i track the tasks and users, and get the different tasks


    // Retrieve the task and user records by their IDs - This works - but should we always get from the store?
    // let task = this.store.peekRecord('task', taskId);
    // let user = this.store.peekRecord('user', userId);

    // this works also getting the data from the model - which is the best approach?
    // is it best to if {} this below code and have the above code in the else where we get from the store??
    // let task = this.tasks.find((task) => task.id === taskId);
    // let user = this.users.find((user) => user.id === userId);

    // compromise - but which method is best - is this overkill?
    // get tasks if in model, else get them from the store
    let task =
      this.tasks.find((task) => task.id === taskId) || this.store.peekRecord('task', taskId);
    let user =
      this.users.find((user) => user.id === userId) || this.store.peekRecord('user', userId);

    // If both task and user exist, assign the user to the task
    if (task && user) {
      task.set('user', user);
    } else {
      console.error('There is either no task or no user');
    }
  }
}
