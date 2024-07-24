import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UserSelectorComponent extends Component {
  // Keep track of the currently selected user's ID
  @tracked selectedUserId;

  // need to properly initialise the component so we properly display the correct user in the current state
  constructor() {
    // This Calls the constructor of the parent class (@glimmer/component) to ensure that any initialization logic from the parent class is also executed.
    super(...arguments);
    // Set the selected user ID from the task passed to the component, if not there then it defaults to 1 which is undefined
    this.selectedUserId = this.args.task.user.id || 1;
  }

  @action
  handleChange(event) {
    // Update the selected user ID when the user selects a different option - get this from the event
    this.selectedUserId = event.target.value;
  }

  @action
  handleSubmit(event) {
    event.preventDefault();
    // Log the currently selected user ID to the console so i can see the correct information
    console.log('Selected user ID:', this.selectedUserId);
    // When i have the code added for assigning the user in tasks.js route, call it with the selected user ID
    // so if the onUserAssign is in the args(ie click submit) - then the onUserAssign gets called which is referenced in the parent component template(tasks.hbs) and subsequently will live in the associated (route)
    if (this.args.onUserAssign) {
      this.args.onUserAssign(this.selectedUserId);
    }
  }
}
