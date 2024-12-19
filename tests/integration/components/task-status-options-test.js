import { module, test } from 'qunit';
import { setupRenderingTest } from 'task-manager/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | task-status-options', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TaskStatusOptions />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <TaskStatusOptions>
        template block text
      </TaskStatusOptions>
    `);

    assert.dom().hasText('template block text');
  });
});
