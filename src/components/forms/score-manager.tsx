"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Score = { id: string; score: number; playedOn: string };

const initialScores: Score[] = [
  { id: "1", score: 38, playedOn: "2026-04-12" },
  { id: "2", score: 33, playedOn: "2026-03-29" },
  { id: "3", score: 41, playedOn: "2026-03-15" },
  { id: "4", score: 29, playedOn: "2026-03-02" },
  { id: "5", score: 36, playedOn: "2026-02-12" }
];

export function ScoreManager() {
  const [scores, setScores] = useState(initialScores);
  const [score, setScore] = useState(35);
  const [playedOn, setPlayedOn] = useState("2026-04-22");
  const [error, setError] = useState("");

  const ordered = useMemo(
    () => [...scores].sort((a, b) => new Date(b.playedOn).getTime() - new Date(a.playedOn).getTime()),
    [scores]
  );

  function addScore() {
    setError("");
    if (score < 1 || score > 45) {
      setError("Stableford score must be between 1 and 45.");
      return;
    }

    const next = [
      { id: playedOn, score, playedOn },
      ...scores.filter((item) => item.playedOn !== playedOn)
    ]
      .sort((a, b) => new Date(b.playedOn).getTime() - new Date(a.playedOn).getTime())
      .slice(0, 5);

    setScores(next);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <form
        className="premium-panel rounded-lg p-5"
        onSubmit={(event) => {
          event.preventDefault();
          addScore();
        }}
      >
        <h2 className="text-xl font-semibold">Score Entry</h2>
        <p className="mt-2 text-sm text-ink/65">Latest five Stableford scores only. Reusing a date updates that entry.</p>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-medium">
            Played on
            <input
              className="focus-ring rounded-md border border-line bg-white px-3 py-3"
              type="date"
              value={playedOn}
              onChange={(event) => setPlayedOn(event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Stableford score
            <input
              className="focus-ring rounded-md border border-line bg-white px-3 py-3"
              type="number"
              min={1}
              max={45}
              value={score}
              onChange={(event) => setScore(Number(event.target.value))}
            />
          </label>
          {error && <p className="rounded-md bg-ember/10 p-3 text-sm text-ember">{error}</p>}
          <Button type="submit">
            <Plus size={18} aria-hidden />
            Save score
          </Button>
        </div>
      </form>
      <div className="premium-panel rounded-lg p-5">
        <h2 className="text-xl font-semibold">Retained Scores</h2>
        <div className="mt-5 divide-y divide-line">
          {ordered.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 py-4">
              <div>
                <p className="font-semibold">{item.score} points</p>
                <p className="text-sm text-ink/60">{item.playedOn}</p>
              </div>
              <button
                className="focus-ring grid size-10 place-items-center rounded-md border border-line bg-white text-ink/70 transition hover:text-ember"
                type="button"
                aria-label={`Delete score for ${item.playedOn}`}
                onClick={() => setScores((current) => current.filter((scoreItem) => scoreItem.id !== item.id))}
              >
                <Trash2 size={17} aria-hidden />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
