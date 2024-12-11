import { setupTest } from 'task-manager/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | audit log', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('audit-log', {});
    assert.ok(model, 'model exists');
  });
});
