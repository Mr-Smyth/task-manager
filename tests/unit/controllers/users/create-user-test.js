import { module, test } from 'qunit';
import { setupTest } from 'task-manager/tests/helpers';

module('Unit | Controller | users/create-user', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:users/create-user');
    assert.ok(controller);
  });
});
