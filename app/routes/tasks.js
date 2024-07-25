import Route from '@ember/routing/route';
import {
    inject as service
} from '@ember/service';

export default class TasksRoute extends Route {
    @service store;
    @service dataLoader;

    async model() {
        // Load the tasks and users concurrently
        await Promise.all([
            this.dataLoader.loadUsers(),
            this.dataLoader.loadTasks(),
        ]);

        let tasks = this.store.peekAll('task');
        let users = this.store.peekAll('user');

        // Filter tasks based on user relationship - looking for Unassigned tasks
        let unassignedTasks = tasks.filter((task) => {
            // get the user object
            let user = task.get('user');
            // Check if the user exists
            if (user) {
                // Get the name of the user
                let userName = user.get('name');

                // Check if the user's name is 'Unassigned'
                if (userName === 'Unassigned') {
                    // If all conditions are met, return true to include this task in Unassigned
                    return true;
                }
            }
            // If any condition fails, return false to skip this task
            return false;
        });


        // Filter tasks based on user relationship - looking for Assigned tasks
        let assignedTasks = tasks.filter((task) => {
            // get the user object
            let user = task.get('user');
            if (user) {
                // get the name of the user
                let userName = user.get('name');

                // Check if the user's name is not 'Unassigned'
                if (userName !== 'Unassigned') {
                    // If all conditions are met, return true to include this task
                    return true;
                }
            }
            // If any condition fails, return false to skip this task
            return false;
        });

        // return the users and assigned/unassigned tasks as i need to pass the users to the user-select component
        return {
            tasks: {
                unassigned: unassignedTasks,
                assigned: assignedTasks,
            },
            users,
        };
    }
}