// app/components/user-selector.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UserSelectorComponent extends Component {
  // Track the currently selected user's ID
  @tracked selectedUserId;

  // Initialize the component with the appropriate selected user ID
  constructor() {
    super(...arguments);
    // Set the selected user ID based on the provided task
    this.selectedUserId = this.args.task.user.id;
  }

  @action
  handleChange(event) {
    // Update the selected user ID when the selection changes
    this.selectedUserId = event.target.value;
  }

  @action
  handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Call the onUserAssign function which is up in the route tasks controller with the task ID and selected user ID
    this.args.onUserAssign(this.args.task.id, this.selectedUserId);
  }

  get userOptions() {
    return this.selectedUserId
      ? // I want to show the option to set as unassigned when a task is already assigned else show unassigned
        [{ id: null, name: 'Set as Unassigned' }, ...this.args.users]
      : [{ id: null, name: 'Unassigned' }, ...this.args.users];
  }
}
