import { BarChart3, HeartHandshake, ShieldCheck, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";

const modules = [
  { href: "/admin/users", icon: Users, title: "Users", text: "Profiles, roles, subscriptions, and score moderation." },
  { href: "/admin/charities", icon: HeartHandshake, title: "Charities", text: "Directory content, media, events, and featured placement." },
  { href: "/admin/draws", icon: Trophy, title: "Draws", text: "Simulation, publication, jackpot rollover, and winner creation." },
  { href: "/admin/reports", icon: BarChart3, title: "Reports", text: "Operational analytics for users, pools, contributions, and trends." }
];

export default function AdminDashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-marine">Operational command center</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Admin dashboard</h1>
        </div>
        <Button href="/admin/draws">
          <ShieldCheck size={18} aria-hidden />
          Run draw simulation
        </Button>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <MetricCard label="Users" value="12,480" detail="8,920 active subscribers" />
        <MetricCard label="Prize pool" value="$48.2k" detail="$7.4k rollover in" />
        <MetricCard label="Charity" value="$18.4k" detail="Projected monthly contributions" />
        <MetricCard label="Claims" value="17" detail="Pending verification" />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {modules.map((module) => (
          <Card key={module.title}>
            <module.icon className="text-marine" aria-hidden />
            <h2 className="mt-4 text-xl font-semibold">{module.title}</h2>
            <p className="mt-3 text-sm text-ink/65">{module.text}</p>
            <Button href={module.href} variant="secondary" className="mt-6 w-full">
              Open
            </Button>
          </Card>
        ))}
      </div>
    </main>
  );
}
