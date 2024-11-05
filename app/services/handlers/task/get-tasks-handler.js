// app/services/handlers/task/get-tasks-handler.js
import Service, { inject as service } from '@ember/service';

export default class HandlersTaskGetTasksHandler extends Service {
  @service store;

  async request(context, next) {
    const response = await next(context.request);

    // Handling the GET response and normalizing data for the store

    // Check if the response contains an array of tasks - which it should
    if (Array.isArray(response.content.tasks)) {
      response.content.tasks.forEach((task) => {
        let existingTask = this.store.peekRecord('task', String(task.id));

        // using push - so the store will expect the correct format - setting up taskRecord to be the correct format
        const taskRecord = {
          data: {
            id: String(task.id),
            type: 'task',
            attributes: {
              title: task.title,
              description: task.description,
            },
          },
        };

        // and if exists or not we update the store
        if (!existingTask) {
          this.store.push(taskRecord);
        } else {
          existingTask.setProperties({
            title: task.title,
            description: task.description
          });
        }
      });
    }
    // Return and log tasks from the store
    const tasksInStore = this.store.peekAll('task');
    return tasksInStore;
  }
}
