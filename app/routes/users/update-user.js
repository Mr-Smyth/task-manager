import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersUpdateUserRoute extends Route {
  @service store;

  // Get the user from the passed in user_id from the user-details component class
  model(params) {
    return this.store.peekRecord('user', params.user_id);
  }
}
