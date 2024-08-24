import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class UsersUserDetailsController extends Controller {
  @service router;

  @action
  closeUserDetails() {
    this.router.transitionTo('users');
  }
}
