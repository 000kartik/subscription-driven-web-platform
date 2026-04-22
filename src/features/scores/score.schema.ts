import { z } from "zod";

export const stablefordScoreSchema = z.object({
  score: z.number().int().min(1).max(45),
  playedOn: z.coerce.date()
});

export const updateStablefordScoreSchema = stablefordScoreSchema.partial({
  score: true
}).extend({
  id: z.string().min(1)
});

export type StablefordScoreInput = z.infer<typeof stablefordScoreSchema>;
