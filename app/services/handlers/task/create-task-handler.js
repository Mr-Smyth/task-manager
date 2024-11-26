import Service, { inject as service } from '@ember/service';
import { normalizeTaskToJsonAPIPayload } from '../../../utils/normalize-to-json-api';

export default class HandlersTaskCreateTaskHandlerService extends Service {
  @service store;

  /**
   * Handles a request to create tasks on the server, normalizes the response data,
   * and updates the Ember data store with the newly created tasks.
   *
   * This method performs the following steps:
   * 1. Wait for the server's response after processing the task creation request.
   * 2. Normalize the task data returned from the server using the `normalizeTaskToJsonAPIPayload` function.
   * 3. Push the normalized task data into the store, adding or updating the tasks as necessary.
   * 4. Return an array of all task records in the store, including any newly created tasks.
   *
   * @param {Object} context - The context object containing request and response information.
   * @param {Function} next - The next handler function in the middleware chain that processes the request and provides a response.
   * @returns {Array} - A list of all task records in the store, including the newly created tasks.
   */

  async request(context, next) {
    const response = await next(context.request);

    // Handling the POST response and normalizing data for the store
    if (Array.isArray(response.content.tasks)) {
      response.content.tasks.forEach((task) => {
        const taskRecord = normalizeTaskToJsonAPIPayload(task);
        // Push the task record into the store, updating if it exists
        this.store.push(taskRecord);
      });
    }

    // Return all tasks from the store
    return this.store.peekAll('task');
  }
}
