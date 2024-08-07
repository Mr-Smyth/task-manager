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
}
