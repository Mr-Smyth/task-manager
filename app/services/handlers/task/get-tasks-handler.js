// app/services/handlers/task/get-tasks-handler.js
import Service, { inject as service } from '@ember/service';
import { normalizeTaskToJsonAPIPayload } from '../../../utils/normalize-to-json-api';

export default class HandlersTaskGetTasksHandler extends Service {
  @service store;

  /**
   * Handles the request to fetch tasks from the server and update the store with the retrieved tasks.
   *
   * This method performs the following steps:
   * 1. Call the `next` handler function to process the request and retrieve the response.
   * 2. Normalize each task in the response data and push them into the store.
   * 3. Return all task records stored in the Ember data store.
   *
   * @param {Object} context - The context object containing the request and response information.
   * @param {Function} next - The next handler function in the middleware chain that processes the request and provides the response.
   * @returns {Array} - A list of all tasks stored in the Ember data store.
   */

  async request(context, next) {
    const response = await next(context.request);

    // Handling the GET response and normalizing data for the store
    if (Array.isArray(response.content.tasks)) {
      response.content.tasks.forEach((task) => {
        const taskRecord = normalizeTaskToJsonAPIPayload(task);
        // Push the task record into the store, updating if it exists
        this.store.push(taskRecord);
      });
    }

    // Return tasks from the store
    return this.store.peekAll('task');
  }
}
