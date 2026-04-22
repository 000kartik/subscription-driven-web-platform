export type DrawMode = "RANDOM" | "WEIGHTED_FREQUENCY";

export type DrawInputScore = {
  userId: string;
  score: number;
  playedOn: Date;
};

export type DrawEntryInput = {
  userId: string;
  numbers: number[];
};

export type DrawResult = {
  numbers: number[];
  seed: string;
  mode: DrawMode;
  entries: Array<DrawEntryInput & { matches: number }>;
  winnerUserIdsByTier: Record<3 | 4 | 5, string[]>;
};
