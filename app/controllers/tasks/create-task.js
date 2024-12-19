import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TasksCreateTaskController extends Controller {
  @service router;
  @service store;
  @service('requests/task/task-service') requestTaskService;

  // Initialize the selected status and priority
  selectedStatus = 'new';  
  selectedPriority = 'normal';

  @action
  closeModal() {
    this.router.transitionTo('tasks');
  }

  get modalHeading() {
    return 'Create a new Task:';
  }

  @action
  async createTask(event) {
    event.preventDefault();

    // Get form values
    let taskTitle = event.target.taskTitle.value;
    let taskDescription = event.target.taskDescription.value;
    let taskDueDate = event.target.taskDueDate.value;
    let taskPriority = event.target.prioritySelection.value;
    let taskStatus = event.target.statusSelection.value;

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


    console.log("New Task is: ", newTask);

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
