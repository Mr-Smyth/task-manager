import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class TasksEditTaskController extends Controller {
  @service router;
  @service store;

  // setting the heading to be passed to the modal component
  get modalHeading() {
    return `Task Details: ${this.model.title}`;
  }

  // Retrieve all users from the store
  get users() {
    return this.store.peekAll('user');
  }

  // Retrieve all tasks from the store
  get tasks() {
    return this.store.peekAll('task');
  }

  // close the modal
  @action
  closeModal() {
    this.router.transitionTo('tasks');
  }

  // get the edited task and save
  @action
  editTask(event) {
    event.preventDefault();

    // Access the form fields via event.target
    let taskName = event.target.taskName.value;
    let taskDescription = event.target.taskDescription.value;

    // Update the model with new values
    this.model.title = taskName;
    this.model.description = taskDescription;

    this.closeModal();
  }

  @action
  // take the taskId, userId and find the correct task and user. 
  // Then tell Ember Data that the task now belongs to the selected user.
  // Ember Data automatically updates the user's tasks relationship to 
  // include the task because of the inverse relationship defined in the model.
  assignUser(taskId, userId) {
    let task = this.tasks.find((task) => task.id === taskId);
    let user = this.users.find((user) => user.id === userId);

    // no checks needed here for null values as a task not linked wont have a user_id - this will be a valid case so we just set
    task.set('user', user);
  }
}
