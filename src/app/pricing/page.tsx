import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  { name: "Monthly", price: "$19", cadence: "per month", detail: "Flexible access with monthly draw entry." },
  { name: "Yearly", price: "$190", cadence: "per year", detail: "Two months included and continuous eligibility." }
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold md:text-6xl">Subscribe once. Split value three ways.</h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">
          Membership funds platform access, monthly prize pools, and a charity contribution selected by each member.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <h2 className="text-2xl font-semibold">{plan.name}</h2>
            <p className="mt-4 text-5xl font-semibold">{plan.price}</p>
            <p className="mt-1 text-ink/60">{plan.cadence}</p>
            <p className="mt-5 text-ink/70">{plan.detail}</p>
            <ul className="mt-6 grid gap-3 text-sm">
              {["Stableford score tracking", "Monthly draw eligibility", "Winner verification", "Charity contribution control"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-moss" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/signup" className="mt-8 w-full">
              Choose {plan.name.toLowerCase()}
            </Button>
          </Card>
        ))}
      </div>
    </main>
  );
}
