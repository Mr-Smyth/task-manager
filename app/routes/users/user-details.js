import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersUserDetailsRoute extends Route {
  @service store;

  model(params) {
    // First, check if the user is already in the store (from load in users route) or fetch them
    return this.store.peekRecord('user', params.user_id) || this.store.findRecord('user', params.user_id);
  }
}
