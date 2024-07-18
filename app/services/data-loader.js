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
        return this.store.createRecord('user', {
          id: user.id,
          name: user.name,
          description: user.description,
          taskIds: user.taskIds
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
        return this.store.createRecord('task', {
          id: task.id,
          title: task.title,
          description: task.description,
          owner: task.owner
        });
      } else {
        return existingTask;
      }
    });
  }
}
