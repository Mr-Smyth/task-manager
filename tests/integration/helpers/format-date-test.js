// Imports
import { module, test } from 'qunit';
import { setupRenderingTest } from 'task-manager/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// Define a test module for the 'format-date' helper
module('Integration | Helper | format-date', function (hooks) {
  // Set up the rendering test environment before each test
  setupRenderingTest(hooks);

  // Test case: checking if the helper correctly formats a valid date
  test('it formats a valid date', async function (assert) {
    // Set the input value and the format to be used for formatting
    this.set('inputValue', '2024-12-18');
    this.set('format', 'YYYY-MM-DD');

    // Render the helper in the template with the input value and format
    await render(hbs`{{format-date this.inputValue this.format}}`);

    // Assert that the rendered output matches the expected formatted date
    assert.dom().hasText('2024-12-18');
  });

  // Test case: checking how the helper handles invalid date input
  test('it handles invalid date input', async function (assert) {
    // Set an invalid date value (a non-date string) and a format
    this.set('inputValue', '1234');
    this.set('format', 'YYYY-MM-DD');

    // Render the helper in the template with the invalid date input
    await render(hbs`{{format-date this.inputValue this.format}}`);

    // Assert that the rendered output is 'Invalid Date'
    assert.dom().hasText('Invalid Date');
  });
});
