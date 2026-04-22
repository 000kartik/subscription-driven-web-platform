import type { Prisma, PrismaClient } from "@prisma/client";
import { ApiError } from "@/lib/api";
import { stablefordScoreSchema, type StablefordScoreInput } from "./score.schema";

type Db = Pick<PrismaClient, "golfScore">;

export class ScoreService {
  constructor(private db: Db) {}

  async listLatest(userId: string) {
    return this.db.golfScore.findMany({
      where: { userId },
      orderBy: { playedOn: "desc" },
      take: 5
    });
  }

  async upsertScore(userId: string, input: StablefordScoreInput) {
    const data = stablefordScoreSchema.parse(input);
    const playedOn = this.toDateOnly(data.playedOn);

    const score = await this.db.golfScore.upsert({
      where: { userId_playedOn: { userId, playedOn } },
      create: { userId, score: data.score, playedOn },
      update: { score: data.score }
    });

    await this.trimToLatestFive(userId);
    return score;
  }

  async deleteScore(userId: string, scoreId: string) {
    const existing = await this.db.golfScore.findFirst({ where: { id: scoreId, userId } });
    if (!existing) {
      throw new ApiError("NOT_FOUND", "Score entry was not found", 404);
    }

    return this.db.golfScore.delete({ where: { id: scoreId } });
  }

  async adminSetScores(userId: string, scores: StablefordScoreInput[]) {
    if (scores.length > 5) {
      throw new ApiError("BAD_REQUEST", "Only five latest scores may be retained", 422);
    }

    const seen = new Set<string>();
    const parsed = scores.map((score) => {
      const data = stablefordScoreSchema.parse(score);
      const playedOn = this.toDateOnly(data.playedOn);
      const key = playedOn.toISOString().slice(0, 10);
      if (seen.has(key)) throw new ApiError("CONFLICT", "Duplicate score date", 409);
      seen.add(key);
      return { ...data, playedOn };
    });

    await this.db.golfScore.deleteMany({ where: { userId } });
    await this.db.golfScore.createMany({
      data: parsed.map((score) => ({ userId, score: score.score, playedOn: score.playedOn }))
    });

    return this.listLatest(userId);
  }

  private async trimToLatestFive(userId: string) {
    const retained = await this.db.golfScore.findMany({
      where: { userId },
      orderBy: [{ playedOn: "desc" }, { createdAt: "desc" }],
      skip: 5,
      select: { id: true }
    });

    if (retained.length === 0) return;

    await this.db.golfScore.deleteMany({
      where: { id: { in: retained.map((score) => score.id) } }
    });
  }

  private toDateOnly(value: Date) {
    return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
  }
}

export type ScoreWithUser = Prisma.GolfScoreGetPayload<{ include: { user: true } }>;
