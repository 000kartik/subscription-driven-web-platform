import { ScoreService } from "@/features/scores/score.service";
import { requireSubscriber } from "@/lib/auth/guards";
import { handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/db";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireSubscriber();
    const { id } = await params;
    return ok(await new ScoreService(prisma).deleteScore(user.id, id));
  } catch (error) {
    return handleApiError(error);
  }
}
