import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const charities = [
  { slug: "next-fairway-foundation", name: "Next Fairway Foundation", category: "Youth access", impact: "$84k funded this year" },
  { slug: "waterline-trust", name: "Waterline Trust", category: "Clean water", impact: "41 projects supported" },
  { slug: "mindful-recovery-network", name: "Mindful Recovery Network", category: "Mental health", impact: "12k counseling hours" }
];

export default function CharitiesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-semibold md:text-6xl">Choose where your impact lands.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
            Members select one charity at signup and can raise their monthly contribution above the 10% minimum.
          </p>
        </div>
        <label className="relative block min-w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/45" size={18} aria-hidden />
          <input className="focus-ring w-full rounded-md border border-line bg-white px-10 py-3" placeholder="Search charities" />
        </label>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {charities.map((charity) => (
          <Card key={charity.slug}>
            <p className="text-sm font-semibold text-marine">{charity.category}</p>
            <h2 className="mt-3 text-2xl font-semibold">{charity.name}</h2>
            <p className="mt-4 text-ink/65">{charity.impact}</p>
            <Button href={`/charities/${charity.slug}`} variant="secondary" className="mt-7 w-full">
              View profile
            </Button>
          </Card>
        ))}
      </div>
    </main>
  );
}
