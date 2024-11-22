import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class TasksCreateTaskController extends Controller {
  @service router;
  @service store;
  @service('requests/task/task-service') requestTaskService;

  @action
  closeModal() {
    this.router.transitionTo('tasks');
  }

  // setting the heading to be passed to the modal component
  get modalHeading() {
    return 'Create a new Task:';
  }

  @action
  async createTask(event) {
    event.preventDefault();

    // Get form values entered for the new user
    let taskTitle = event.target.taskTitle.value;
    let taskDescription = event.target.taskDescription.value;

    // Basic validation
    if (!taskTitle || !taskDescription) {
      alert('Title and Description are required.');
      return;
    }

    // Construct a user object to be passed to the server
    let newTask = {
      title: taskTitle,
      description: taskDescription,
    };

    // Save the task to the server via the service
    try {
      await this.requestTaskService.createTask(newTask);
      this.closeModal();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again later.');
    }
  }
}
