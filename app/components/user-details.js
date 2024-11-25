import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class UserDetailsComponent extends Component {
  @service router;

  // Navigate to the user update route, passing the user's ID
  @action
  navigateToEditUser() {
    this.router.transitionTo('users.update-user', this.args.user.id);
  }
}
