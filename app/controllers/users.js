import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UsersController extends Controller {
  @service store;

  // track the modal state in users template
  @tracked isModalOpen = false;

  @action
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  /* Simple method to get next available id */
  get newId() {
    // convert each id into a integer by getting the model which is the user model
    let userIds = this.model.map((user) => parseInt(user.id, 10));
    // Start at 1001 if no users exist
    let maxId = Math.max(...userIds, 1001);
    // return a new id
    return (maxId + 1).toString();
  }

  @action
  createUser(event) {
    event.preventDefault();

    // get the form values from the event target
    let newId = this.newId;
    let userName = event.target.userName.value;
    let userDescription = event.target.userDescription.value;
    let userTaskIds = [];

    // Create a new user record and save it using createRecord
    this.store.createRecord('user', {
      id: newId,
      name: userName,
      description: userDescription,
      taskIds: userTaskIds,
    });

    this.toggleModal();
  }
}
