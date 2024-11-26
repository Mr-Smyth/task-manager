import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class UsersCreateUserController extends Controller {
  @service router;
  @service store;
  @service('requests/user/user-service') requestUserService;

  @action
  closeModal() {
    this.router.transitionTo('users');
  }

  // setting the heading to be passed to the modal component
  get modalHeading() {
    return 'Create a new User:';
  }

  @action
  async createUser(event) {
    event.preventDefault();

    // Get form values entered for the new user
    let userFirstName = event.target.userFirstName.value;
    let userLastName = event.target.userLastName.value;
    let userDescription = event.target.userDescription.value;

    // Basic validation
    if (!userFirstName || !userLastName) {
      alert('First name and Last name are required.');
      return;
    }

    // Construct a user object to be passed to the server
    let newUser = {
      firstName: userFirstName,
      lastName: userLastName,
      description: userDescription,
    };

    // Save the user to the server via the service
    try {
      await this.requestUserService.createUser(newUser);
      this.closeModal();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again later.');
    }
  }
}
