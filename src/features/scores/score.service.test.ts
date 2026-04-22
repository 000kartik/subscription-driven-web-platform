import { describe, expect, it } from "vitest";
import { ScoreService } from "./score.service";

function createScoreDb() {
  let rows: Array<{ id: string; userId: string; score: number; playedOn: Date; createdAt: Date; updatedAt: Date }> = [];

  return {
    golfScore: {
      findMany: async ({ where, orderBy, skip = 0, take, select }: any) => {
        let result = rows.filter((row) => row.userId === where.userId);
        result = result.sort((a, b) => b.playedOn.getTime() - a.playedOn.getTime());
        result = result.slice(skip, take ? skip + take : undefined);
        return select?.id ? result.map((row) => ({ id: row.id })) : result;
      },
      findFirst: async ({ where }: any) => rows.find((row) => row.id === where.id && row.userId === where.userId) ?? null,
      upsert: async ({ where, create, update }: any) => {
        const existing = rows.find(
          (row) => row.userId === where.userId_playedOn.userId && row.playedOn.getTime() === where.userId_playedOn.playedOn.getTime()
        );
        if (existing) {
          existing.score = update.score;
          return existing;
        }
        const row = { id: `${create.userId}-${create.playedOn.toISOString()}`, ...create, createdAt: new Date(), updatedAt: new Date() };
        rows.push(row);
        return row;
      },
      deleteMany: async ({ where }: any) => {
        const ids = new Set(where.id?.in ?? []);
        rows = rows.filter((row) => !ids.has(row.id));
        return { count: ids.size };
      },
      delete: async ({ where }: any) => {
        const row = rows.find((item) => item.id === where.id);
        rows = rows.filter((item) => item.id !== where.id);
        return row;
      },
      createMany: async ({ data }: any) => {
        rows.push(...data.map((row: any) => ({ id: crypto.randomUUID(), ...row, createdAt: new Date(), updatedAt: new Date() })));
        return { count: data.length };
      }
    }
  };
}

describe("ScoreService", () => {
  it("keeps only latest five scores and updates duplicate dates", async () => {
    const db = createScoreDb();
    const service = new ScoreService(db as any);

    for (let day = 1; day <= 6; day += 1) {
      await service.upsertScore("user-1", { score: day + 10, playedOn: new Date(`2026-04-0${day}T00:00:00Z`) });
    }

    await service.upsertScore("user-1", { score: 45, playedOn: new Date("2026-04-06T00:00:00Z") });
    const scores = await service.listLatest("user-1");

    expect(scores).toHaveLength(5);
    expect(scores[0].score).toBe(45);
    expect(scores.some((score) => score.playedOn.toISOString().startsWith("2026-04-01"))).toBe(false);
  });
});
