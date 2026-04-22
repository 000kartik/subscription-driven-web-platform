import { describe, expect, it } from "vitest";
import { PrizePoolService } from "./prize.service";

describe("PrizePoolService", () => {
  it("splits pools by 40/35/25 and rolls over unclaimed five-match jackpot", () => {
    const result = new PrizePoolService().calculate({
      activeSubscriberCount: 100,
      subscriptionPrizePoolCents: 1000,
      rolloverInCents: 5000,
      winnersByTier: { 3: 4, 4: 2, 5: 0 }
    });

    expect(result.fiveMatchPoolCents).toBe(45000);
    expect(result.fourMatchPoolCents).toBe(35000);
    expect(result.threeMatchPoolCents).toBe(25000);
    expect(result.rolloverOutCents).toBe(45000);
    expect(result.payoutPerWinnerCents[4]).toBe(17500);
  });
});
