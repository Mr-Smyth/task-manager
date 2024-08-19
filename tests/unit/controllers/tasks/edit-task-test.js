import { module, test } from 'qunit';
import { setupTest } from 'task-manager/tests/helpers';

module('Unit | Controller | tasks/edit-task', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:tasks/edit-task');
    assert.ok(controller);
  });
});
