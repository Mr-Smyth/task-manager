import Model, { attr, belongsTo } from '@ember-data/model';

export default class TaskModel extends Model {
  @attr('string') title;
  @attr('string') description;
  @attr('string') status;
  @attr('string') priority;
  @attr('date') dueDate;
  @attr('date') createdAt;
  @attr('date') updatedAt;
  // Tell Ember Data to load the related records asynchronously
  // Also tells Ember Data that the user relationship is the inverse of the tasks relationship in the UserModel
  @belongsTo('user', { async: true, inverse: 'tasks' }) user;

  get isUnassigned() {
    // Unassigned is not a user and so has no content - added in app/components/user-selector.js as a static option
    return !this.user.content;
  }
}
