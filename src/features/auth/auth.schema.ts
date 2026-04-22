import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  countryCode: z.string().length(2).default("US"),
  charityId: z.string().min(1),
  contributionBps: z.number().int().min(1000).max(10000).default(1000)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});
