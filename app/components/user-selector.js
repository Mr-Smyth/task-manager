// app/components/user-selector.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UserSelectorComponent extends Component {
  // Track the currently selected user's ID
  @tracked selectedUserId;

  constructor() {
    super(...arguments);
    // Moved initialization logic into a separate method for clarity
    this.initializeSelectedUserId();
  }

  /**
   * Initialize the selected user ID based on the provided task argument.
   * This method ensures the component starts with the correct user selection,
   * handling potential null or undefined values gracefully.
   */
  initializeSelectedUserId() {
    // Set the selected user ID to the user's ID if available, or null if unassigned
    this.selectedUserId = this.args.task?.user?.id || null;
  }

  @action
  handleChange(event) {
    // Convert the selected value to null if it represents unassignment, otherwise remain with same value
    this.selectedUserId =
      event.target.value === 'null' ? null : event.target.value;
  }

  /**
   * Returns the list of options for the user selector dropdown.
   * Includes a Base option to show either "Unassigned" or "Set as Unassigned" if the associated user id is null
   * If there is a selectedUserId (user already associated) - the baseOption will be "Set as Unassigned"
   * If there is no id - the baseOption will be "Unassigned"
   */
  get userOptions() {
    const baseOption = {
      id: null,
      name: this.selectedUserId ? 'Set as Unassigned' : 'Unassigned',
    };

    // Map over the real users provided in arguments to format them for the dropdown
    const userOptions = this.args.users.map((user) => ({
      id: user.id, // Use user ID as the value
      name: `${user.firstName} ${user.lastName}`,
    }));

    // Combine the base option with the user options
    return [baseOption, ...userOptions];
  }
}
