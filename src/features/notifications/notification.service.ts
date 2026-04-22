type NotificationPayload = {
  userId?: string;
  channel: "email" | "in_app";
  template: string;
  subject?: string;
  body: string;
  metadata?: Record<string, unknown>;
};

export class NotificationService {
  async enqueue(payload: NotificationPayload) {
    return {
      id: crypto.randomUUID(),
      status: "PENDING" as const,
      ...payload,
      createdAt: new Date()
    };
  }
}
