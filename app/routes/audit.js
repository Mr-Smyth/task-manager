import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuditRoute extends Route {
  @service store;
  @service('requests/audit/get-audit-logs-service') requestAuditService;

  async model() {
    // Fetch the audit logs from the API
    await this.requestAuditService.getAuditLogs();

    // Retrieve the latest audit logs from the store
    let auditLogs = this.store.peekAll('audit-log');

    console.log(auditLogs);  // Logs the audit logs, check the structure

    return auditLogs;  // Ensure you're returning the data correctly
  }
}
