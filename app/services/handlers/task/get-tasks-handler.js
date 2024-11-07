// app/services/handlers/task/get-tasks-handler.js
import Service, { inject as service } from '@ember/service';
import { normalizeTaskToJsonAPIPayload } from '../../../utils/normalize-to-json-api';

export default class HandlersTaskGetTasksHandler extends Service {
  @service store;

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
