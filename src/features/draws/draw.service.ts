import { createHash } from "crypto";
import type { DrawEntryInput, DrawInputScore, DrawMode, DrawResult } from "./draw.types";

const DRAW_SIZE = 5;
const MIN_SCORE = 1;
const MAX_SCORE = 45;

export class DrawEngine {
  generate({
    mode,
    seed,
    scores,
    entries
  }: {
    mode: DrawMode;
    seed: string;
    scores: DrawInputScore[];
    entries: DrawEntryInput[];
  }): DrawResult {
    const numbers =
      mode === "RANDOM" ? this.randomNumbers(seed) : this.weightedFrequencyNumbers(seed, scores);
    const normalized = numbers.sort((a, b) => a - b);

    const scoredEntries = entries.map((entry) => ({
      ...entry,
      numbers: this.normalizeEntryNumbers(entry.numbers),
      matches: this.countMatches(entry.numbers, normalized)
    }));

    return {
      numbers: normalized,
      seed,
      mode,
      entries: scoredEntries,
      winnerUserIdsByTier: {
        5: scoredEntries.filter((entry) => entry.matches === 5).map((entry) => entry.userId),
        4: scoredEntries.filter((entry) => entry.matches === 4).map((entry) => entry.userId),
        3: scoredEntries.filter((entry) => entry.matches === 3).map((entry) => entry.userId)
      }
    };
  }

  simulate(input: { mode: DrawMode; seed: string; scores: DrawInputScore[]; entries: DrawEntryInput[] }) {
    return this.generate(input);
  }

  private randomNumbers(seed: string) {
    return this.pickUnique(seed, Array.from({ length: MAX_SCORE }, (_, index) => index + 1));
  }

  private weightedFrequencyNumbers(seed: string, scores: DrawInputScore[]) {
    const counts = new Map<number, number>();
    for (let score = MIN_SCORE; score <= MAX_SCORE; score += 1) counts.set(score, 0);
    scores.forEach((score) => counts.set(score.score, (counts.get(score.score) ?? 0) + 1));

    const ranked = Array.from(counts.entries()).sort((a, b) => {
      const frequencyDelta = a[1] - b[1];
      return frequencyDelta === 0 ? a[0] - b[0] : frequencyDelta;
    });

    const leastFrequent = ranked.slice(0, 20).map(([score]) => score);
    const mostFrequent = ranked.slice(-20).map(([score]) => score);
    const blended = Array.from(new Set([...leastFrequent, ...mostFrequent]));

    return this.pickUnique(seed, blended);
  }

  private pickUnique(seed: string, candidates: number[]) {
    const pool = [...candidates];
    const picked: number[] = [];

    for (let index = 0; picked.length < DRAW_SIZE; index += 1) {
      const entropy = createHash("sha256").update(`${seed}:${index}`).digest("hex");
      const position = parseInt(entropy.slice(0, 8), 16) % pool.length;
      const [value] = pool.splice(position, 1);
      picked.push(value);
    }

    return picked;
  }

  private normalizeEntryNumbers(numbers: number[]) {
    const unique = Array.from(new Set(numbers)).sort((a, b) => a - b);
    if (unique.length !== DRAW_SIZE || unique.some((value) => value < MIN_SCORE || value > MAX_SCORE)) {
      throw new Error("Draw entries must contain five unique numbers from 1 to 45");
    }
    return unique;
  }

  private countMatches(entryNumbers: number[], drawNumbers: number[]) {
    const drawSet = new Set(drawNumbers);
    return this.normalizeEntryNumbers(entryNumbers).filter((value) => drawSet.has(value)).length;
  }
}
