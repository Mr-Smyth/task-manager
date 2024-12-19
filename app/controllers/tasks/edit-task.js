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

  // setting the sub-heading to be passed to the modal component
  get modalSubHeading() {
    return `Created: ${this.model.createdAt}`;
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

  // Format the model's due date to "YYYY-MM-DD" for input
  get dueDate() {
    if (this.model.dueDate) {
      return new Date(this.model.dueDate).toISOString().split('T')[0];
    }
    // Default to empty if no due date is set
    return null;
  }

  // get the edited task and save
  @action
  async editTask(event) {
    event.preventDefault();

    // Collect form data
    let taskName = event.target.taskName.value;
    let taskDescription = event.target.taskDescription.value;
    let taskDueDate = event.target.taskDueDate.value;
    let selectedUserId = event.target.querySelector('#assign-user').value;
    let taskPriority = event.target.prioritySelection.value;
    let taskStatus = event.target.statusSelection.value;

    // Ensure selectedUserId is null if "Unassigned" is selected
    if (selectedUserId === 'Set as Unassigned' || selectedUserId === '') {
      selectedUserId = null;
    }

    // Update the task model with form data
    this.model.title = taskName;
    this.model.description = taskDescription;
    this.model.dueDate = taskDueDate ? new Date(taskDueDate) : null;
    this.model.priority = taskPriority;
    this.model.status = taskStatus;

    try {
      // Save the task's updated properties
      await this.requestTaskService.updateTask(this.model);

      // Assign or unassign the user if necessary
      // Pass the task and the selected user and the service will handle logic and update
      await this.requestTaskService.assignUserToTask(
        this.model,
        selectedUserId,
      );

      // Close the modal upon success
      this.closeModal();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to update the task. Please try again later.');
    }
  }

  @action
  async deleteTask() {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        // Explicitly set the user relationship to null
        this.model.set('user', null);

        // Now destroy the task
        await this.model.destroyRecord();

        // After deleting the task, close the modal
        this.closeModal();
      } catch (error) {
        console.error('Failed to delete the task: ', error);
        alert('Error: ' + error.message || 'Failed to delete the task.');
      }
    }
  }
}
