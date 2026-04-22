type AuditEvent = {
  actorUserId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
};

export class AuditService {
  async record(event: AuditEvent) {
    return {
      id: crypto.randomUUID(),
      ...event,
      createdAt: new Date()
    };
  }
}
