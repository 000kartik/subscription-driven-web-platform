import type { SubscriptionStatus } from "@prisma/client";
import { ApiError } from "@/lib/api";

const subscriberAccessStates: SubscriptionStatus[] = ["ACTIVE", "RENEWAL_DUE", "PAST_DUE"];

export function assertSubscriberAccess(status?: SubscriptionStatus | null) {
  if (!status || !subscriberAccessStates.includes(status)) {
    throw new ApiError("PAYMENT_REQUIRED", "An active subscription is required", 402);
  }
}

export function mapStripeStatus(status: string): SubscriptionStatus {
  switch (status) {
    case "active":
    case "trialing":
      return "ACTIVE";
    case "past_due":
      return "PAST_DUE";
    case "canceled":
      return "CANCELLED";
    case "unpaid":
      return "LAPSED";
    default:
      return "INACTIVE";
  }
}
