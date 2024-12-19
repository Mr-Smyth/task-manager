import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking'; // Import the tracked decorator
import { action } from '@ember/object';

export default class TasksController extends Controller {
  // Default to 'all' tasks
  @tracked selectedFilter = 'all';


  // Retrieve the tasks from the model
  get tasks() {
    return this.model.tasks;
  }

  // Filter tasks that are marked as completed (status === 'done')
  get completedTasks() {
    return this.tasks.filter((task) => task.status === 'done');
  }

  // Filter tasks that are not completed (status !== 'done')
  get incompleteTasks() {
    return this.tasks.filter((task) => task.status !== 'done');
  }

  // Filter tasks that have no assigned user - relies on `isUnassigned` property on the task model
  get unassignedTasks() {
    return this.tasks.filter(
      (task) => task.isUnassigned && task.status !== 'done',
    );
  }

  // Filter tasks that have an assigned user
  get assignedTasks() {
    return this.tasks.filter(
      (task) => !task.isUnassigned && task.status !== 'done',
    );
  }

  // Based on selectedFilter, return the filtered tasks
  get filteredTasks() {
    switch (this.selectedFilter) {
      case 'unassigned':
        return this.unassignedTasks;
      case 'assigned':
        return this.assignedTasks;
      case 'done':
        return this.completedTasks;
      default:
        // Show all tasks if no specific filter is selected.
        return this.tasks;
    }
  }

  // Display title based on selected filter
  get filterTitle() {
    switch (this.selectedFilter) {
      case 'unassigned':
        return 'Unassigned';
      case 'assigned':
        return 'Assigned';
      case 'done':
        return 'Done';
      default:
        return 'All';
    }
  }

  // Action to handle filter change from the dropdown
  @action
  filterTasks(event) {
    this.selectedFilter = event.target.value;
  }
}
