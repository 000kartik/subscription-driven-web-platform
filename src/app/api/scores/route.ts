import { ScoreService } from "@/features/scores/score.service";
import { requireSubscriber } from "@/lib/auth/guards";
import { handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await requireSubscriber();
    return ok(await new ScoreService(prisma).listLatest(user.id));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireSubscriber();
    const score = await new ScoreService(prisma).upsertScore(user.id, await request.json());
    return ok(score, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
