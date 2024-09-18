import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class UsersCreateUserController extends Controller {
  @service router;
  @service store;

  @action
  closeModal() {
    this.router.transitionTo('users');
  }

  // setting the heading to be passed to the modal component
  get modalHeading() {
    return "Create a new User:";
  }

  @action
  createUser(event) {
    event.preventDefault();

    // get the form values from the event target
    let userFirstName = event.target.userFirstName.value;
    let userLastName = event.target.userLastName.value;
    let userDescription = event.target.userDescription.value;
    let userTaskIds = [];

    // Basic validation
    if (!userFirstName || !userLastName) {
      alert("First name and Last name are required.");
      return;
    }

    // Create a new user record and save it
    let newUser = this.store.createRecord('user', {
      name: `${userFirstName} ${userLastName}`,
      description: userDescription,
      taskIds: userTaskIds,
    });

    // Save then reroute to users with closeModal()
    newUser.save().then(() => {
      {this.closeModal()};
    }).catch((error) => {
      console.error("Failed to create the new user: ", error)
    });
  }
}
