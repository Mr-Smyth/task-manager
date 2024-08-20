import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Route | users/user-details', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the user details correctly', async function(assert) {
    // Create mock user data
    let mockUser = {
      id: '1001',
      name: 'User One',
      description: 'user-one description',
      tasks: [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' }
      ],
    };

    // Set up the route's model
    this.set('model', mockUser);

    // Render the route's template
    await render(hbs`route:users/user-details`);

    // Check if the user name is displayed
    assert.dom('[data-test-userName]').hasText('User One', 'The user name is displayed.');

    // Check if the user description is displayed
    assert.dom('[data-test-userDescription]').hasText('user-one description', 'The user description is displayed.');

    // Check if the number of tasks assigned text is correct
    assert.dom('[data-test-numTasks]').hasText('Number of tasks: 2', 'The number of tasks is shown correctly.');

    // Check if the <li> elements contain the names of the tasks assigned are displayed
    assert.dom('[data-test-taskList] li').exists({ count: 2 }, 'The correct number of tasks is displayed.');
    assert.dom('[data-test-taskList] li:nth-child(1)').hasText('Task 1', 'First task is correctly displayed.');
    assert.dom('[data-test-taskList] li:nth-child(2)').hasText('Task 2', 'Second task is correctly displayed.');
  });
});
