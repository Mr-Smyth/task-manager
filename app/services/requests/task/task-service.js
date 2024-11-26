// app/services/requests/task/task-service.js
import Service, { inject as service } from '@ember/service';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';

export default class RequestsTaskTaskServiceService extends Service {
  @service store;
  @service('handlers/task/get-tasks-handler') getTaskHandler;
  @service('handlers/task/create-task-handler') createTaskHandler;
  @service('handlers/task/update-task-handler') updateTaskHandler;

  constructor() {
    super(...arguments);
    // Initialize RequestManager to manage HTTP requests
    this.manager = new RequestManager();
    // Use custom handler and Fetch middleware for request processing
    this.manager.use([this.getTaskHandler, this.createTaskHandler, this.updateTaskHandler, Fetch]);

  }

  /**
   * Fetches all tasks from the backend API.
   * This method performs a GET request to retrieve the list of tasks.
   *
   * @returns {Promise} A promise that resolves to the response containing the tasks data.
   */

  async getTasks() {
    return this.manager.request({
      url: 'http://localhost:3000/task-manager-data/api/tasks',
      method: 'GET',
    });
  }

  /**
   * Updates the details of an existing task and assigns it to a user.
   * This method sends a PATCH request to update the task with the specified ID and assigns the task to a user.
   *
   * @param {Object} task - The task object that contains the updated information.
   * @param {string} userId - The ID of the user to assign to the task.
   * @returns {Promise} A promise that resolves to the response of the PATCH request.
   */

  async updateTask(task, userId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json'); // Set the request content type to JSON

    // Send a PATCH request to update the task with new details
    return this.manager.request({
      url: `http://localhost:3000/task-manager-data/api/tasks/${task.id}`,
      method: 'PATCH',
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        userId: userId,
      }),
      headers: headers,
    });
  }

  /**
   * Creates a new task with the provided details.
   * This method sends a POST request to create a new task.
   *
   * @param {Object} task - The task object containing the information for the new task.
   * @returns {Promise} A promise that resolves to the response of the POST request.
   */

  async createTask(task) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Send a PATCH request to update the task with new details
    return this.manager.request({
      url: `http://localhost:3000/task-manager-data/api/tasks`,
      method: 'POST',
      body: JSON.stringify({
        title: task.title,
        description: task.description,
      }),
      headers: headers,
    });
  }
}
