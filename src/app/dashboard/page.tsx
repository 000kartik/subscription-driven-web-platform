import { CalendarClock, CircleDollarSign, HeartHandshake, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <Badge tone="success">Active subscriber</Badge>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Member dashboard</h1>
          <p className="mt-3 text-ink/65">Subscription, scores, impact, draw entries, winnings, and profile controls.</p>
        </div>
        <Button href="/dashboard/scores">Manage scores</Button>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <MetricCard label="Renewal" value="May 22" detail="Yearly plan, auto-renew enabled" />
        <MetricCard label="Draws entered" value="8" detail="Next draw on April 30" />
        <MetricCard label="Winnings" value="$420" detail="Pending proof approval" />
        <MetricCard label="Charity share" value="15%" detail="Next Fairway Foundation" />
      </div>
      <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <h2 className="text-2xl font-semibold">Participation Summary</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { icon: Trophy, label: "Current entries", value: "38, 33, 41, 29, 36" },
              { icon: CalendarClock, label: "Upcoming draw", value: "April 30, 2026" },
              { icon: CircleDollarSign, label: "Payout status", value: "Pending verification" },
              { icon: HeartHandshake, label: "Selected charity", value: "Next Fairway Foundation" }
            ].map((item) => (
              <div key={item.label} className="rounded-md border border-line p-4">
                <item.icon className="text-marine" size={20} aria-hidden />
                <p className="mt-3 text-sm text-ink/60">{item.label}</p>
                <p className="mt-1 font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold">Profile Settings</h2>
          <p className="mt-3 text-ink/65">Manage identity, password, notification preferences, charity selection, and contribution percentage.</p>
          <Button href="/dashboard/winnings" variant="secondary" className="mt-6 w-full">
            View winnings
          </Button>
        </Card>
      </section>
    </main>
  );
}
