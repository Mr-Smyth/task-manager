// Old code - Works
// import Model, { attr } from '@ember-data/model';

// export default class TaskModel extends Model {
//   @attr('string') title;
//   @attr('string') description;
//   @attr('string') owner;
// }

// new code
import Model, { attr, belongsTo } from '@ember-data/model';

export default class TaskModel extends Model {
  @attr('string') title;
  @attr('string') description;
  // Tell Ember Data to load the related records asynchronously
  // Also tells Ember Data that the user relationship is the inverse of the tasks relationship in the UserModel
  @belongsTo('user', { async: true, inverse: 'tasks' }) user;
}
