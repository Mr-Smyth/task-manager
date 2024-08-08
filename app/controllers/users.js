import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class UsersController extends Controller {
  // track the modal state in users template
  @tracked isModalOpen = false;

  @action
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  @action
  createUser(event) {
    event.preventDefault();
    
    // get the form values from the event target
    const userName = event.target.userName.value;
    const userDescription = event.target.userDescription.value;

    // log data for now
    console.log("Creating a user with name =", userName);
    console.log("Creating a user with description =", userDescription);

    this.toggleModal();
  }
}
