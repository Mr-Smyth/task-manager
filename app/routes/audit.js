import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuditRoute extends Route {
  @service store;
  @service('requests/audit/get-audit-logs-service') requestAuditService;

  async model() {
    // Fetch the latest audit logs from the API and allow the handler to populate the store
    await this.requestAuditService.getAuditLogs();

    // return fresh data from store to template
    return this.store.peekAll('audit-log');
  }
}
