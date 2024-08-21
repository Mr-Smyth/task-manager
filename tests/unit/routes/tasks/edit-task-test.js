import { module, test } from 'qunit';
import { setupTest } from 'task-manager/tests/helpers';

module('Unit | Route | tasks/edit-task', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:tasks/edit-task');
    assert.ok(route);
  });
});