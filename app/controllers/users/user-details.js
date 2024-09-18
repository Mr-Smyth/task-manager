import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class UsersUserDetailsController extends Controller {
  @service router;

  @action
  closeUserDetails() {
    this.router.transitionTo('users');
  }

  @action
  async deleteUser() {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await this.model.destroyRecord();
        this.closeUserDetails();
      } catch (error) {
        console.error('Failed to delete the user: ', error);
        // use the browser alert for now to notify
        alert('Error: ' + error.message || 'Failed to delete the user.');
      }
    }
  }
  
}
