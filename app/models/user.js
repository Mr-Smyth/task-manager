import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') name;
  @attr('string') description;
  // Tell Ember Data to load the related records asynchronously
  // Also tell Ember Data that the tasks relationship is the inverse of the user relationship in the TaskModel.
  @hasMany('task', { async: true, inverse: 'user' }) tasks;
}
