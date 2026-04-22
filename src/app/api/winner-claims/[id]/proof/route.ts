import { z } from "zod";
import { requireSubscriber } from "@/lib/auth/guards";
import { handleApiError, ok } from "@/lib/api";

const proofMetadataSchema = z.object({
  fileName: z.string().min(1),
  mimeType: z.enum(["image/png", "image/jpeg", "application/pdf"]),
  fileSizeBytes: z.number().int().positive().max(10 * 1024 * 1024)
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireSubscriber();
    const { id } = await params;
    const metadata = proofMetadataSchema.parse(await request.json());
    return ok(
      {
        claimId: id,
        uploadedBy: user.id,
        uploadUrl: `/api/uploads/presigned/${id}`,
        metadata,
        status: "PENDING"
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
