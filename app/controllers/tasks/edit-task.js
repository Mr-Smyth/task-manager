import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class TasksEditTaskController extends Controller {
  @service router;
  @service store;
  @service('requests/task/task-service') requestTaskService;

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
  async editTask(event) {
    event.preventDefault();

    // Access the form fields via event.target
    let taskName = event.target.taskName.value;
    let taskDescription = event.target.taskDescription.value;

    // Update the task with new values
    this.model.title = taskName;
    this.model.description = taskDescription;

    // update the user with the task from the option list component selector
    let selectedUserId = event.target.querySelector('#assign-user').value;
    let assignedUser = this.users.find((user) => user.id === selectedUserId);
    this.model.set('user', assignedUser || null);

    // Call the updateTask service to send the PATCH request
    try {
      await this.requestTaskService.updateTask(this.model, selectedUserId);

      // After saving the task, close the modal and return to the task list
      this.closeModal();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }
}
