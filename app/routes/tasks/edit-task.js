import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TasksEditTaskRoute extends Route {
  @service store;

  async model(params) {
    // use peekRecord as we cannot/should not edit a record not already in the store
    return this.store.peekRecord('task', params.task_id);
  }
}
