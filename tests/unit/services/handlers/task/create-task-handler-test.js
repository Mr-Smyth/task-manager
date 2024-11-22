import { module, test } from 'qunit';
import { setupTest } from 'task-manager/tests/helpers';

module('Unit | Service | handlers/task/create-task-handler', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup(
      'service:handlers/task/create-task-handler',
    );
    assert.ok(service);
  });
});
