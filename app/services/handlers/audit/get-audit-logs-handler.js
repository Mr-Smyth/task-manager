import Service, { inject as service } from '@ember/service';
import { normalizeAuditLogToJsonAPIPayload } from '../../../utils/normalize-to-json-api';

export default class HandlersAuditGetAuditLogsHandler extends Service {
  @service store;

  /**
   * Handles the request to fetch audit logs from the server, normalizes the response data,
   * and updates the Ember store with the retrieved audit logs.
   *
   * @param {Object} context - The context object containing the request and response information.
   * @param {Function} next - The next handler function in the middleware chain that processes the request and provides the response.
   * @returns {Array} - A list of all audit logs stored in the Ember data store.
   */
  async request(context, next) {
    const response = await next(context.request);

    // Ensure the response contains the expected structure
    if (response && Array.isArray(response.content.logs)) {
      response.content.logs.forEach((log) => {
        const auditLogRecord = normalizeAuditLogToJsonAPIPayload(log);

        // Check if the record has valid structure
        if (auditLogRecord && auditLogRecord.data) {
          this.store.push(auditLogRecord);
        } else {
          console.error('Invalid audit log format:', log);
        }
      });
    } else {
      console.error('Response content is missing or malformed:', response);
    }
  }
}
