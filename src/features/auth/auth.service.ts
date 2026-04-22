import bcrypt from "bcryptjs";
import type { PrismaClient } from "@prisma/client";
import { ApiError } from "@/lib/api";
import { setSessionCookie } from "@/lib/auth/session";
import { loginSchema, signupSchema } from "./auth.schema";

type Db = Pick<PrismaClient, "user" | "role" | "userProfile" | "userCharityPreference">;

export class AuthService {
  constructor(private db: Db) {}

  async signup(input: unknown) {
    const data = signupSchema.parse(input);
    const existing = await this.db.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ApiError("CONFLICT", "An account already exists for this email", 409);

    const role = await this.db.role.upsert({
      where: { name: "SUBSCRIBER" },
      update: {},
      create: { name: "SUBSCRIBER", description: "Registered subscriber" }
    });

    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await this.db.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash,
        roleId: role.id,
        profile: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            countryCode: data.countryCode
          }
        },
        charityPreferences: {
          create: {
            charityId: data.charityId,
            contributionBps: data.contributionBps,
            isActive: true
          }
        }
      },
      include: { role: true }
    });

    await setSessionCookie({
      id: user.id,
      email: user.email,
      role: user.role.name,
      subscriptionStatus: "INACTIVE"
    });

    return { id: user.id, email: user.email, role: user.role.name };
  }

  async login(input: unknown) {
    const data = loginSchema.parse(input);
    const user = await this.db.user.findUnique({
      where: { email: data.email.toLowerCase() },
      include: { role: true, subscriptions: { orderBy: { createdAt: "desc" }, take: 1 } }
    });

    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
      throw new ApiError("UNAUTHORIZED", "Invalid email or password", 401);
    }

    await setSessionCookie({
      id: user.id,
      email: user.email,
      role: user.role.name,
      subscriptionStatus: user.subscriptions[0]?.status ?? "INACTIVE"
    });

    return { id: user.id, email: user.email, role: user.role.name };
  }
}
