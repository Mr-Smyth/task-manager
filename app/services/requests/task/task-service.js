// app/services/requests/task/task-service.js
import Service, { inject as service } from '@ember/service';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';

export default class RequestsTaskTaskServiceService extends Service {
  @service store;
  @service('handlers/task/get-tasks-handler') getTaskHandler;

  constructor() {
    super(...arguments);
    // Initialize RequestManager to manage HTTP requests
    this.manager = new RequestManager();
    // Use custom handler and Fetch middleware for request processing
    this.manager.use([this.getTaskHandler, Fetch]);
  }

  /**
   * Fetches all tasks from the backend API.
   * Makes a GET request to retrieve the list of tasks.
   * 
   * @returns {Promise} Resolves to the response containing tasks data.
   */
  async getTasks() {
    return this.manager.request({
      url: 'http://localhost:3000/task-manager-data/api/tasks',
      method: 'GET',
    });
  }

  /**
   * Updates the specified task with the new details and assigns it to a user.
   * Makes a PATCH request to update the task with the given task ID and user ID.
   * 
   * @param {Object} task - The task object to be updated.
   * @param {string} userId - The ID of the user to be assigned to the task.
   * @returns {Promise} Resolves to the response of the PATCH request.
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
}
