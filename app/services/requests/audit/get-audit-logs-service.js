import Service, { inject as service } from '@ember/service';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';

export default class RequestsAuditGetAuditLogsServiceService extends Service {
  @service('handlers/audit/get-audit-logs-handler') getAuditLogsHandler;

  constructor() {
    super(...arguments);
    this.manager = new RequestManager();
    this.manager.use([this.getAuditLogsHandler, Fetch]);
  }

  /**
   * Fetches audit logs from the backend API.
   *
   * @returns {Promise} A promise that resolves to the response containing the audit logs data.
   */
  async getAuditLogs() {
    const response = await this.manager.request({
      url: 'http://localhost:3000/task-manager-data/api/audit',
      method: 'GET',
    });

    return response;
  }
}
