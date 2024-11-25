import { module, test } from 'qunit';
import { setupRenderingTest } from 'task-manager/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Render the modal without block content
    await render(hbs`<Modal />`);

    // Check if the modal has no text (empty by default)
    assert.dom('.modal-backdrop').exists(); // Ensure the backdrop exists
    assert.dom('.modal-header').exists(); // Ensure the modal header exists
    assert.dom('.modal-header h2').hasText(''); // Check if the modal heading is empty by default

    // Template block usage:
    await render(hbs`
      <Modal>
        template block text
      </Modal>
    `);

    // Check that the modal content (i.e., the yielded text) is rendered correctly
    assert.dom('[data-test-modal-content]').hasText('template block text');
  });
});
