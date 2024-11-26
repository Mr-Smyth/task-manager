import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class UsersUpdateUserController extends Controller {
  @service router;
  @service store;
  @service('requests/user/user-service') requestUserService;

  // Load the user model from the given id
  model(params) {
    return this.store.peekRecord('user', params.user_id);
  }

  @action
  closeModal() {
    this.router.transitionTo('users');
  }

  @action
  cancelEditUser() {
    this.router.transitionTo('users.user-details', this.model.id);
  }

  // setting the heading to be passed to the modal component
  get modalHeading() {
    return `Edit User: ${this.model.firstName} ${this.model.lastName}`;
  }

  @action
  async updateUser(event) {
    event.preventDefault();

    // Get form values entered for the user
    let userId = this.model.id;
    let userFirstName = event.target.userFirstName.value;
    let userLastName = event.target.userLastName.value;
    let userDescription = event.target.userDescription.value;

    // Basic validation
    if (!userFirstName || !userLastName) {
      alert('First name and Last name are required.');
      return;
    }

    // Construct a user object to be passed to the server
    let updatedUser = {
      id: userId,
      firstName: userFirstName,
      lastName: userLastName,
      description: userDescription,
    };

    // Save the user to the server via the service
    try {
      await this.requestUserService.updateUser(updatedUser);
      this.closeModal();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again later.');
    }
  }
}

