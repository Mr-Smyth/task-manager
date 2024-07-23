// services/data-loader.js
import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class DataLoaderService extends Service {
  @service store;

  /**
   * Loads user data from a local Json file.
   * Checks if each user already exists in the store; creates a new record if not.
   * returns an Array of user records (Ember Data models).
   */
  async loadUsers() {
    let response = await fetch('api/users.json');
    let userData = await response.json();

    return userData.users.map((user) => {
      let existingUser = this.store.peekRecord('user', user.id);

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
        return existingUser;
      }
    });
  }

  /**
   * Loads user data from a local Json file.
   * Checks if each task already exists in the store; creates a new record if not.
   * returns an array of task records (Ember Data models).
   */
  async loadTasks() {
    let response = await fetch('api/tasks.json');
    let taskData = await response.json();

    return taskData.tasks.map((task) => {
      let existingTask = this.store.peekRecord('task', task.id);

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
        return existingTask;
      }
    });
  }
}
