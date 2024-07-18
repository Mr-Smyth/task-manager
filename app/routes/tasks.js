// routes/tasks.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TasksRoute extends Route {
  @service store;
  @service dataLoader;

  async model() {
    // Load tasks and users concurrently
    await Promise.all([
      this.dataLoader.loadUsers(),
      this.dataLoader.loadTasks()
    ]);

    let tasks = this.store.peekAll('task');

    // Iterate through each task and associate the owner details
    tasks.forEach(task => {
      let ownerId = task.owner;
      if (ownerId) {
        let user = this.store.peekRecord('user', ownerId);
        if (user) {
          task.set('ownerDetails', user); // Example: Assuming you want to set ownerDetails on each task
        }
      }
    });

    return tasks;
  }
}
