import { ArrowRight, CircleDollarSign, HeartHandshake, Sparkles } from "lucide-react";
import { MotionRise } from "@/components/motion-rise";
import { TrustStrip } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, MetricCard } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main>
      <section className="noise overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100vh-66px)] max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:px-6">
          <MotionRise>
            <Badge tone="success">Premium monthly draw platform</Badge>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal md:text-7xl">
              Play your last five scores. Fund real causes. Win monthly.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
              Impact Draw Club turns a subscription into a transparent prize pool and a recurring charity contribution,
              with verified winners and admin-controlled draw governance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/signup">
                Start subscription
                <ArrowRight size={18} aria-hidden />
              </Button>
              <Button href="/charities" variant="secondary">
                Explore charities
              </Button>
            </div>
          </MotionRise>
          <MotionRise delay={0.12}>
            <div className="premium-panel rounded-lg p-5">
              <div className="grid gap-4">
                <div className="rounded-lg bg-ink p-5 text-paper">
                  <p className="text-sm text-paper/65">April projected pool</p>
                  <p className="mt-2 text-5xl font-semibold">$48,240</p>
                  <div className="mt-6 grid grid-cols-3 gap-2 text-sm">
                    <span className="rounded-md bg-white/10 p-3">5 match 40%</span>
                    <span className="rounded-md bg-white/10 p-3">4 match 35%</span>
                    <span className="rounded-md bg-white/10 p-3">3 match 25%</span>
                  </div>
                </div>
                <TrustStrip />
              </div>
            </div>
          </MotionRise>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Minimum impact" value="10%" detail="Every subscription reserves charity contribution at signup." />
          <MetricCard label="Score window" value="5" detail="Only latest scores are retained, sorted newest first." />
          <MetricCard label="Winner tiers" value="3" detail="Five, four, and three-number matches are paid from fixed shares." />
        </div>
      </section>

      <section className="bg-ink py-16 text-paper">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3 md:px-6">
          {[
            { icon: Sparkles, title: "Enter scores", text: "Subscribers maintain five Stableford scores from 1 to 45 with date-level validation." },
            { icon: CircleDollarSign, title: "Draw monthly", text: "Admins simulate, audit, publish, and distribute rewards with rollover governance." },
            { icon: HeartHandshake, title: "Grow impact", text: "Members choose charities, increase contribution percentage, and donate independently." }
          ].map((item) => (
            <Card key={item.title} className="border-white/10 bg-white/8 text-paper shadow-none">
              <item.icon className="text-gold" size={24} aria-hidden />
              <h2 className="mt-5 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-paper/68">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
