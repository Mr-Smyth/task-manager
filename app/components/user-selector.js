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
    // Checking if this exists - this is where my test breaks down - as its not getting args
    this.selectedUserId = this.args.task.user.id
      ? this.args.task.user.id
      : null;
  }

  @action
  handleChange(event) {
    // Update the selected user ID when the selection changes - store it locally until we grab it in edit-task controller
    this.selectedUserId = event.target.value;

  }

  get userOptions() {
    // I want to show the option to set as unassigned when a task is already assigned else show unassigned
    return this.selectedUserId
      ? [{ id: null, name: 'Set as Unassigned' }, ...this.args.users]
      : [{ id: null, name: 'Unassigned' }, ...this.args.users];
  }
}