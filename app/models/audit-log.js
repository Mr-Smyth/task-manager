import Model, { attr } from '@ember-data/model';

export default class AuditLogModel extends Model {
  @attr('string') eventType;
  @attr('string') entity;
  @attr('number') entityId;
  @attr('string') description;
  @attr('number') userId;
  @attr('date') timestamp;
}
