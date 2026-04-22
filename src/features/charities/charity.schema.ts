import { z } from "zod";

export const charityPreferenceSchema = z.object({
  charityId: z.string().min(1),
  contributionBps: z.number().int().min(1000).max(10000)
});

export const charityUpsertSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().min(20),
  countryCode: z.string().length(2),
  category: z.string().min(2),
  imageUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true)
});
