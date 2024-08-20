import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users/user-details', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:users/user-details');
    assert.ok(route, 'The user-details route exists');
  });
});
