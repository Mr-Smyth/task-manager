import Route from '@ember/routing/route';

export default class TasksCreateTaskRoute extends Route {
  // needed to reset the previously set options for priority and status within the controller
  // so the modal displays the correct default selections
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.resetDefaults();
  }
}
