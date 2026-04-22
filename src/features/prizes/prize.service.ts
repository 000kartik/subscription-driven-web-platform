export type PrizePoolInput = {
  activeSubscriberCount: number;
  subscriptionPrizePoolCents: number;
  rolloverInCents: number;
  winnersByTier: Record<3 | 4 | 5, number>;
};

export type PrizePoolResult = {
  basePoolCents: number;
  fiveMatchPoolCents: number;
  fourMatchPoolCents: number;
  threeMatchPoolCents: number;
  rolloverOutCents: number;
  payoutPerWinnerCents: Record<3 | 4 | 5, number>;
};

export class PrizePoolService {
  calculate(input: PrizePoolInput): PrizePoolResult {
    const basePoolCents = input.activeSubscriberCount * input.subscriptionPrizePoolCents;
    const fiveMatchPoolCents = Math.floor(basePoolCents * 0.4) + input.rolloverInCents;
    const fourMatchPoolCents = Math.floor(basePoolCents * 0.35);
    const threeMatchPoolCents = basePoolCents - Math.floor(basePoolCents * 0.4) - fourMatchPoolCents;

    const fiveWinners = input.winnersByTier[5];
    const rolloverOutCents = fiveWinners === 0 ? fiveMatchPoolCents : 0;

    return {
      basePoolCents,
      fiveMatchPoolCents,
      fourMatchPoolCents,
      threeMatchPoolCents,
      rolloverOutCents,
      payoutPerWinnerCents: {
        5: fiveWinners > 0 ? Math.floor(fiveMatchPoolCents / fiveWinners) : 0,
        4: input.winnersByTier[4] > 0 ? Math.floor(fourMatchPoolCents / input.winnersByTier[4]) : 0,
        3: input.winnersByTier[3] > 0 ? Math.floor(threeMatchPoolCents / input.winnersByTier[3]) : 0
      }
    };
  }
}
