import { z } from "zod";
import { DrawEngine } from "@/features/draws/draw.service";
import { requireAdmin } from "@/lib/auth/guards";
import { handleApiError, ok } from "@/lib/api";

const simulationSchema = z.object({
  mode: z.enum(["RANDOM", "WEIGHTED_FREQUENCY"]),
  seed: z.string().min(4),
  scores: z.array(z.object({ userId: z.string(), score: z.number().int().min(1).max(45), playedOn: z.coerce.date() })),
  entries: z.array(z.object({ userId: z.string(), numbers: z.array(z.number().int().min(1).max(45)).length(5) }))
});

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const input = simulationSchema.parse(await request.json());
    return ok(new DrawEngine().simulate(input));
  } catch (error) {
    return handleApiError(error);
  }
}
