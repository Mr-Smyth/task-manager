import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TasksEditTaskRoute extends Route {
  @service store;

  // need to reset the set options for priority and status within the controller
  // so the modal displays the correct default selections
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.resetDefaults();
  }

  async model(params) {
    // use peekRecord as we cannot/should not edit a record not already in the store
    return this.store.peekRecord('task', params.task_id);
  }
}
