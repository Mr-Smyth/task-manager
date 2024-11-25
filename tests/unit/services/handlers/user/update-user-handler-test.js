import { module, test } from 'qunit';
import { setupTest } from 'task-manager/tests/helpers';

module('Unit | Service | handlers/user/update-user-handler', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup(
      'service:handlers/user/update-user-handler',
    );
    assert.ok(service);
  });
});
