import { setupTest } from 'task-manager/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Adapter | task manager', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const adapter = this.owner.lookup('adapter:task-manager');
    assert.ok(adapter, 'adapter exists');
  });
});
