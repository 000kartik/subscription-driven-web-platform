import { CheckCircle2, Play, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";

export default function AdminDrawsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-semibold md:text-5xl">Draw management</h1>
          <p className="mt-3 text-ink/65">Simulate safely, publish once approved, and trigger winner verification workflow.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Shuffle size={18} aria-hidden />
            Simulate
          </Button>
          <Button>
            <CheckCircle2 size={18} aria-hidden />
            Publish
          </Button>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <MetricCard label="Mode" value="Weighted" detail="Balances most and least frequent member scores" />
        <MetricCard label="Seed" value="APR-2026" detail="Stored for deterministic audit replay" />
        <MetricCard label="Rollover" value="$7,400" detail="Only 5-match unclaimed pool rolls forward" />
      </div>
      <Card className="mt-8">
        <h2 className="text-2xl font-semibold">Simulation Result</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {[7, 18, 24, 36, 41].map((number) => (
            <span key={number} className="grid size-14 place-items-center rounded-md bg-ink text-xl font-semibold text-paper">
              {number}
            </span>
          ))}
        </div>
        <Button className="mt-8">
          <Play size={18} aria-hidden />
          Create official draw
        </Button>
      </Card>
    </main>
  );
}
