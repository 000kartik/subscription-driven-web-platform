import Stripe from "stripe";
import { mapStripeStatus } from "@/features/subscriptions/subscription.service";
import { handleApiError, ok } from "@/lib/api";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY ?? "sk_test_placeholder");
    const signature = request.headers.get("stripe-signature");
    const rawBody = await request.text();

    if (!signature || !env.STRIPE_WEBHOOK_SECRET) {
      return ok({ received: true, verified: false, reason: "Webhook secret not configured" });
    }

    const event = stripe.webhooks.constructEvent(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
    const subscription = event.data.object as Stripe.Subscription;

    return ok({
      received: true,
      providerEventId: event.id,
      type: event.type,
      mappedSubscriptionStatus: "status" in subscription ? mapStripeStatus(subscription.status) : undefined
    });
  } catch (error) {
    return handleApiError(error);
  }
}
