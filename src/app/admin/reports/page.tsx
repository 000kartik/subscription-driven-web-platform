import { TrendingUp } from "lucide-react";
import { Card, MetricCard } from "@/components/ui/card";

const bars = [
  { label: "Users", value: "82%" },
  { label: "Subscribers", value: "67%" },
  { label: "Prize pool", value: "74%" },
  { label: "Charity", value: "58%" }
];

export default function AdminReportsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-semibold md:text-5xl">Reports and analytics</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <MetricCard label="Total users" value="12,480" detail="+8.4% month over month" />
        <MetricCard label="Active subscribers" value="8,920" detail="71.4% active ratio" />
        <MetricCard label="Prize pool" value="$48.2k" detail="Includes jackpot rollover" />
        <MetricCard label="Charity" value="$18.4k" detail="Minimum and voluntary shares" />
      </div>
      <Card className="mt-8">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-marine" aria-hidden />
          <h2 className="text-2xl font-semibold">Operational trend snapshot</h2>
        </div>
        <div className="mt-8 grid gap-5">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between text-sm">
                <span>{bar.label}</span>
                <span>{bar.value}</span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-ink/8">
                <div className="h-3 rounded-full bg-marine" style={{ width: bar.value }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
