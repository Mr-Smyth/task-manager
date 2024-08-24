import { module, test } from 'qunit'; // Import QUnit testing functions
import { setupRenderingTest } from 'task-manager/tests/helpers'; // Import helper for setting up rendering tests
import { render, select, triggerEvent, pauseTest } from '@ember/test-helpers'; // Import helpers for rendering and simulating interactions
import { hbs } from 'ember-cli-htmlbars'; // Import hbs helper for using HTMLBars templates in tests

module('Integration | Component | user-selector', function (hooks) {
  setupRenderingTest(hooks); // Set up the rendering environment for this test module

  test('It displays the component, assigns user on submit', async function (assert) {
    // Arrange: Define mock data for the test

    // Mock user data to simulate users that can be selected
    let mockUsers = [
      {
        id: '1001', // Unique ID for User One
        name: 'User One', // Display name of User One
        description: 'user-one description', // Description for User One
        taskIds: [], // Task IDs associated with User One (empty in this mock)
      },
      {
        id: '1002', // Unique ID for User Two
        name: 'User Two', // Display name of User Two
        description: 'user-two description', // Description for User Two
        taskIds: [], // Task IDs associated with User Two (empty in this mock)
      },
      {
        id: '1003', // Unique ID for User Three
        name: 'User Three', // Display name of User Three
        description: 'user-three description', // Description for User Three
        taskIds: [], // Task IDs associated with User Three (empty in this mock)
      },
    ];

    // Mock task data to simulate the task being edited
    let mockTask = {
      id: '1', // Unique ID for the task
      title: 'Test Task', // Title of the task
      description: 'Test Task Description', // Description of the task
      user: { id: '1001' }, // Initially assigned user (ID '1001')
    };

    // Set up component properties and action handlers
    // Provide mock users & tasks to the component
    this.setProperties({
      users: mockUsers,
      model: mockTask,
      // Define the action handler for user assignment
      assignUser: (taskId, userId) => {
        // Assertions within the action to verify the correct task ID and user ID

        // Assert that the task ID passed to the action matches the mock task ID
        assert.strictEqual(
          taskId,
          mockTask.id,
          `assignUser action receives the correct task ID ${taskId}`,
        );
        // Assert that the user ID passed to the action is '1002'
        assert.strictEqual(
          userId,
          '1002',
          `assignUser action receives the correct user ID ${userId}`,
        );
      },
    });

    // Render the component with the provided mock data
    await render(
      hbs`<UserSelector @users={{this.users}} @task={{this.model}} @onUserAssign={{this.assignUser}}/>`,
    );

    // await pauseTest();

    // Check the rendered output
    // Check if the button text is 'Assign user'
    assert
      .dom('[data-test-us-button]')
      .hasText('Assign user', 'The user sees the correct button Text.');

    // Check if there are 4 options in the select element (3 users + 1 unassigned option)
    assert
      .dom('select[data-test-selector] option')
      .exists(
        { count: 4 },
        'Component shows the correct number of user options: 4',
      );

    // Check that the initially selected user is correctly set in the dropdown
    assert
      .dom('select[data-test-selector]')
      .hasValue(
        '1001',
        'The initially selected user is correctly displayed: 1001',
      );

    // Simulate user interactions
    // Select 'User Two' from the dropdown (ID '1002')
    await select('select[data-test-selector]', '1002');

    // Simulate form submission
    await triggerEvent('form', 'submit');
  });
});
