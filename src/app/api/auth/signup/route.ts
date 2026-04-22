import { AuthService } from "@/features/auth/auth.service";
import { handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const auth = new AuthService(prisma);
    return ok(await auth.signup(await request.json()), 201);
  } catch (error) {
    return handleApiError(error);
  }
}
