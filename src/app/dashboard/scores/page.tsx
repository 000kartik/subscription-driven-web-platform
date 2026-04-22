import { ScoreManager } from "@/components/forms/score-manager";

export default function ScoresPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-semibold md:text-5xl">Score management</h1>
      <p className="mt-3 max-w-2xl text-ink/65">
        Stableford entries are date-unique, validated from 1 to 45, and capped to the latest five scores.
      </p>
      <div className="mt-8">
        <ScoreManager />
      </div>
    </main>
  );
}
