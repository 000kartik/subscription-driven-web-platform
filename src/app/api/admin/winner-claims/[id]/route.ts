import { z } from "zod";
import { requireAdmin } from "@/lib/auth/guards";
import { handleApiError, ok } from "@/lib/api";

const reviewSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "PAID"]),
  reviewNotes: z.string().max(2000).optional()
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;
    const review = reviewSchema.parse(await request.json());
    return ok({
      id,
      reviewedById: admin.id,
      reviewedAt: new Date().toISOString(),
      ...review
    });
  } catch (error) {
    return handleApiError(error);
  }
}
