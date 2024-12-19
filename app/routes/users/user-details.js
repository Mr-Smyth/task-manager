import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersUserDetailsRoute extends Route {
  @service store;

  model(params) {
    // Check if the user is already in the store
    return this.store.peekRecord('user', params.user_id);
  }
}
