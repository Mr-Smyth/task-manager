import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersRoute extends Route {
  @service store;
  @service dataLoader;

  async model() {
    // Load users and tasks concurrently
    await Promise.all([
      this.dataLoader.loadUsers(),
      this.dataLoader.loadTasks()
    ]);

    // Retrieve all users and tasks from the store
    let allUsers = this.store.peekAll('user');
    let allTasks = this.store.peekAll('task');

    // Filter out users whose name is 'Unassigned' because i dont want them in the list of users
    let filteredUsers = allUsers.filter(user => user.name !== 'Unassigned');

    // Associate tasks with each user based on taskIds currently linked to a user
    filteredUsers.forEach(user => {
      let userTasks = [];
      user.taskIds.forEach(taskId => {
        let task = allTasks.find(task => task.id === taskId);
        if (task) {
          userTasks.push(task);
        }
      });
      user.set('tasks', userTasks);
    });

    return filteredUsers;
  }
}
