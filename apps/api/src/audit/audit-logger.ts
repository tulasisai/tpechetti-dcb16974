export interface AuditEntry {
  timestamp: string;
  userId: string;
  method: string;
  url: string;
  statusCode?: number;
}

export class AuditLogger {
  private static logs: AuditEntry[] = [];

  static add(entry: AuditEntry) {
    this.logs.push(entry);
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-500);
    }
  }

  static getAll(): AuditEntry[] {
    return [...this.logs];
  }

  static clear() {
    this.logs = [];
  }
}
