// app/services/requests/user/user-service.js
import Service, { inject as service } from '@ember/service';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';

export default class RequestsUserUserService extends Service {
  @service store;
  @service('handlers/user/get-users-handler') getUserHandler;
  @service('handlers/user/create-user-handler') createUserHandler;
  @service('handlers/user/update-user-handler') updateUserHandler;

  constructor() {
    super(...arguments);
    this.manager = new RequestManager();
    this.manager.use([
      this.getUserHandler,
      this.createUserHandler,
      this.updateUserHandler,
      Fetch,
    ]);
  }

  /**
   * Fetches all users from the backend API.
   * This method performs a GET request to retrieve the list of users.
   *
   * @returns {Promise} A promise that resolves to the response containing the users data.
   */

  async getUsers() {
    return this.manager.request({
      url: 'http://localhost:3000/task-manager-data/api/users',
      method: 'GET',
    });
  }

  /**
   * Creates a new user with the provided details.
   * This method sends a POST request to create a new user.
   *
   * @param {Object} user - The user object containing the information for the new user.
   * @returns {Promise} A promise that resolves to the response of the POST request.
   */

  async createUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json'); // Set the request content type to JSON

    // Send a PATCH request to create the new user
    return this.manager.request({
      url: `http://localhost:3000/task-manager-data/api/users`,
      method: 'POST',
      body: JSON.stringify({
        first_name: user.firstName,
        last_name: user.lastName,
        description: user.description,
      }),
      headers: headers,
    });
  }

  /**
   * Updates an existing user with the provided details.
   * This method sends a PUT request to update the user's details.
   *
   * @param {Object} user - The user object containing the updated user information.
   * @returns {Promise} A promise that resolves to the response of the PUT request.
   */
  async updateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json'); // Set the request content type to JSON

    // Send a PUT request to update the existing user
    return this.manager.request({
      url: `http://localhost:3000/task-manager-data/api/users/${user.id}`,
      method: 'PATCH', // Using PUT to update the resource
      body: JSON.stringify({
        first_name: user.firstName,
        last_name: user.lastName,
        description: user.description,
      }),
      headers: headers,
    });
  }
}
