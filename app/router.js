import EmberRouter from '@ember/routing/router';
import config from 'task-manager/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('tasks', { path: '/' }, function () {
    this.route('edit-task', { path: '/edit/:task_id' });
  });
  this.route('users', function () {
    this.route('create-user');
    this.route('user-details', { path: '/details/:user_id' });
  });
});
