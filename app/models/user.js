// models/user.js
import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') name;
  @attr('string') description;
  @attr() taskIds; // an array of task ids
}
