import { module, test } from 'qunit';
import { setupTest } from 'task-manager/tests/helpers';

module(
  'Unit | Service | requests/audit/get-audit-logs-service',
  function (hooks) {
    setupTest(hooks);

    // TODO: Replace this with your real tests.
    test('it exists', function (assert) {
      let service = this.owner.lookup(
        'service:requests/audit/get-audit-logs-service',
      );
      assert.ok(service);
    });
  },
);
