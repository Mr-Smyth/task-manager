// app/services/handlers/task/update-task-handler.js
import Service, { inject as service } from '@ember/service';
import { normalizeTaskToJsonAPIPayload } from '../../../utils/normalize-to-json-api';

export default class HandlersTaskUpdateTaskHandler extends Service {
  @service store;

  /**
   * Handles the request to update a task by normalizing the response data and updating the store with the new task information.
   *
   * This method performs the following steps:
   * 1. Wait for the response from the next handler in the chain (typically the server's response).
   * 2. Check if the response contains the updated task data.
   * 3. Normalize the task data using the `normalizeTaskToJsonAPIPayload` function.
   * 4. Push the normalized task into the store, updating the existing task if it already exists.
   * 5. Return the original response containing the updated task.
   *
   * @param {Object} context - The context object passed through the handler chain, containing the request and response data.
   * @param {Function} next - The next handler function that processes the request and provides the response.
   * @returns {Object} - The original response containing the updated task data.
   */

  async request(context, next) {
    // Call the next handler in the chain (the actual request)
    const response = await next(context.request);

    // If the response contains a task, normalize and update the store
    if (response.content.task) {
      const updatedTask = response.content.task;

      // Normalize the task data using the utility function and prepare it for the store
      const taskRecord = normalizeTaskToJsonAPIPayload(updatedTask);

      // Push the normalized task data into the Ember Data store
      this.store.push(taskRecord);
    }

    return response;
  }
}
