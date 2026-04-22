import { describe, expect, it } from "vitest";
import { DrawEngine } from "./draw.service";

describe("DrawEngine", () => {
  it("generates deterministic random numbers from a seed", () => {
    const engine = new DrawEngine();
    const input = {
      mode: "RANDOM" as const,
      seed: "APR-2026",
      scores: [],
      entries: [{ userId: "user-1", numbers: [1, 2, 3, 4, 5] }]
    };

    expect(engine.generate(input)).toEqual(engine.generate(input));
  });

  it("assigns winners into exact match tiers", () => {
    const result = new DrawEngine().generate({
      mode: "RANDOM",
      seed: "tier-test",
      scores: [],
      entries: [
        { userId: "five", numbers: new DrawEngine().generate({ mode: "RANDOM", seed: "tier-test", scores: [], entries: [] }).numbers },
        { userId: "none", numbers: [1, 2, 3, 4, 5] }
      ]
    });

    expect(result.winnerUserIdsByTier[5]).toContain("five");
  });
});
