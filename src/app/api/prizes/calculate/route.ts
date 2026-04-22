import { z } from "zod";
import { PrizePoolService } from "@/features/prizes/prize.service";
import { requireAdmin } from "@/lib/auth/guards";
import { handleApiError, ok } from "@/lib/api";

const schema = z.object({
  activeSubscriberCount: z.number().int().min(0),
  subscriptionPrizePoolCents: z.number().int().min(0),
  rolloverInCents: z.number().int().min(0),
  winnersByTier: z.object({
    3: z.number().int().min(0),
    4: z.number().int().min(0),
    5: z.number().int().min(0)
  })
});

export async function POST(request: Request) {
  try {
    await requireAdmin();
    return ok(new PrizePoolService().calculate(schema.parse(await request.json())));
  } catch (error) {
    return handleApiError(error);
  }
}
