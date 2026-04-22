import { ApiError } from "@/lib/api";
import { readSession, type SessionUser } from "./session";
import { assertSubscriberAccess } from "@/features/subscriptions/subscription.service";

export async function requireUser() {
  const user = await readSession();
  if (!user) throw new ApiError("UNAUTHORIZED", "Authentication required", 401);
  return user;
}

export async function requireSubscriber() {
  const user = await requireUser();
  assertSubscriberAccess(user.subscriptionStatus);
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") throw new ApiError("FORBIDDEN", "Administrator access required", 403);
  return user;
}

export function canManageUser(actor: SessionUser, targetUserId: string) {
  return actor.role === "ADMIN" || actor.id === targetUserId;
}
