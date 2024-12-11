import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TasksCreateTaskController extends Controller {
  @service router;
  @service store;
  @service('requests/task/task-service') requestTaskService;

  @tracked selectedPriority = 'low';
  @tracked selectedStatus = 'new';

  get priorityOptions() {
    return ['low', 'normal', 'high', 'urgent'];
  }

  get statusOptions() {
    return ['new', 'in-triage', 'in-review', 'in-progress', 'on-hold', 'done'];
  }

  @action
  closeModal() {
    this.router.transitionTo('tasks');
  }

  // Reset the defaults when the modal is opened
  @action
  resetDefaults() {
    this.selectedPriority = 'low';
    this.selectedStatus = 'new';
  }

  get modalHeading() {
    return 'Create a new Task:';
  }

  @action
  updatePriority(option) {
    // Directly update with the option value
    this.selectedPriority = option;
  }

  @action
  updateStatus(option) {
    // Directly update with the option value
    this.selectedStatus = option;
  }

  @action
  async createTask(event) {
    event.preventDefault();

    // Get form values
    let taskTitle = event.target.taskTitle.value;
    let taskDescription = event.target.taskDescription.value;
    let taskDueDate = event.target.taskDueDate.value;
    let taskPriority = this.selectedPriority;
    let taskStatus = this.selectedStatus;

    // Basic validation
    if (!taskTitle || !taskDescription) {
      alert('Title and Description are required.');
      return;
    }

    // Construct a task object
    let newTask = {
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate || null,
      priority: taskPriority,
      status: taskStatus,
    };

    // Save the task to the server
    try {
      await this.requestTaskService.createTask(newTask);
      this.closeModal();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again later.');
    }
  }
}
