// app/services/data-loader.js
import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class DataLoaderService extends Service {
  @service store;
  
  /* The aim is to make this file redundant - so far i have removed the loadUsers
  as now getting from backend using serializer and adaptor setup
  currently we are still pulling tasks from local file at memonet but will move to a serializer / adaptor 
  setup once implemented in the backend */

  /* *
   * Loads task data from local JSON file.
   * Checks if each task already exists in the store; pushes if not.
   * Returns an array of task records (Ember Data models).
   */
  async loadTasks() {
    // Fetch task data from the local JSON file
    let response = await fetch('api/tasks.json');
    let taskData = await response.json();

    // Map the fetched task data to Ember Data models
    return taskData.tasks.map((task) => {
      // Check if the task already exists in the store
      let existingTask = this.store.peekRecord('task', task.id);

      // If the task doesn't exist, create a new record
      if (!existingTask) {
        return this.store.push({
          data: {
            id: task.id,
            type: 'task',
            attributes: {
              title: task.title,
              description: task.description,
            },
          },
        });
      } else {
        // If the task exists, return the existing record
        return existingTask;
      }
    });
  }
}
