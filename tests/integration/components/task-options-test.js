import { module, test } from 'qunit';
import { setupRenderingTest } from 'task-manager/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | task-options', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TaskOptions />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <TaskOptions>
        template block text
      </TaskOptions>
    `);

    assert.dom().hasText('template block text');
  });
});
