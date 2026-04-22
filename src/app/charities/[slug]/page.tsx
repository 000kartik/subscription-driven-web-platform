import { CalendarDays, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function CharityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <p className="text-sm font-semibold text-marine">Featured charity</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{name}</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">
            A managed charity profile with description, campaign imagery, upcoming events, and contribution reporting.
            Admins can curate this content and media from the operational dashboard.
          </p>
          <Button href="/signup" className="mt-8">
            Select this charity
          </Button>
        </section>
        <Card>
          <HeartHandshake className="text-ember" size={28} aria-hidden />
          <h2 className="mt-5 text-2xl font-semibold">Contribution Controls</h2>
          <p className="mt-3 text-ink/66">Minimum 10% is enforced in validation. Members can voluntarily increase up to 100%.</p>
          <div className="mt-6 rounded-md bg-ink p-4 text-paper">
            <p className="text-sm text-paper/60">Projected member support</p>
            <p className="mt-1 text-3xl font-semibold">$18,420</p>
          </div>
        </Card>
      </div>
      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {["Community launch", "Donor roundtable", "Impact report"].map((event) => (
            <Card key={event}>
              <CalendarDays className="text-marine" aria-hidden />
              <h3 className="mt-4 font-semibold">{event}</h3>
              <p className="mt-2 text-sm text-ink/60">Admin-managed event details and timestamps.</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
