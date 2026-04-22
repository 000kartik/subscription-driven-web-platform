import { requireAdmin } from "@/lib/auth/guards";
import { handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();
    const [users, activeSubscribers, charities, draws, pendingClaims] = await Promise.all([
      prisma.user.count(),
      prisma.subscription.count({ where: { status: "ACTIVE" } }),
      prisma.charity.count({ where: { isActive: true } }),
      prisma.draw.count(),
      prisma.winnerClaim.count({ where: { status: "PENDING" } })
    ]);

    return ok({ users, activeSubscribers, charities, draws, pendingClaims });
  } catch (error) {
    return handleApiError(error);
  }
}
