import { charityUpsertSchema } from "@/features/charities/charity.schema";
import { requireAdmin } from "@/lib/auth/guards";
import { handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") ?? "";
    const category = url.searchParams.get("category") ?? undefined;
    const charities = await prisma.charity.findMany({
      where: {
        isActive: true,
        category,
        OR: query
          ? [
              { name: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } }
            ]
          : undefined
      },
      orderBy: [{ isFeatured: "desc" }, { name: "asc" }]
    });
    return ok(charities);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const data = charityUpsertSchema.parse(await request.json());
    return ok(await prisma.charity.create({ data }), 201);
  } catch (error) {
    return handleApiError(error);
  }
}
