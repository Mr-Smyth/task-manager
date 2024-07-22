// old code
// import Model, { attr } from '@ember-data/model';

// export default class UserModel extends Model {
//   @attr('string') name;
//   @attr('string') description;
//   @attr() taskIds; // an array of task ids
// }

// new code
import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') name;
  @attr('string') description;
  // Tell Ember Data to load the related records asynchronously
  // Also tell Ember Data that the tasks relationship is the inverse of the user relationship in the TaskModel.
  @hasMany('task', { async: true, inverse: 'user' }) tasks;
}
