// app/services/handlers/task/update-task-handler.js
import Service, { inject as service } from '@ember/service';
import { normalizeTaskToJsonAPIPayload } from '../../../utils/normalize-to-json-api';

export default class HandlersTaskUpdateTaskHandler extends Service {
  @service store;

  /**
   * Handles the request to update a task.
   * This method is responsible for processing the task update response.
   * 
   * @param {Object} context - The context passed through the handler chain.
   * @param {Function} next - The next handler in the chain.
   * 
   * @returns {Promise} The response returned.
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
