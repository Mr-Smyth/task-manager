import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class DataLoaderService extends Service {
  @service store;

  /**
   * Loads user data from local JSON file.
   * Checks if each user already exists in the store; creates a new record if not.
   * Returns an array of user records (Ember Data models).
   */
  async loadUsers() {
    // Fetch user data from the local JSON file
    let response = await fetch('api/users.json');
    let userData = await response.json();

    // Map the fetched user data to Ember Data models
    return userData.users.map((user) => {
      // Check if the user already exists in the store
      let existingUser = this.store.peekRecord('user', user.id);

      // If the user doesn't exist, create a new record
      if (!existingUser) {
        return this.store.push({
          data: [
            {
              id: user.id,
              type: 'user',
              attributes: {
                name: user.name,
                description: user.description,
              },
              relationships: {
                tasks: {
                  data: user.taskIds.map((taskId) => {
                    return {
                      id: taskId,
                      type: 'task',
                    };
                  }),
                },
              },
            },
          ],
        });
      } else {
        // If the user exists, return the existing record
        return existingUser;
      }
    });
  }

  /**
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
