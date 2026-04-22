import { ImagePlus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminCharitiesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-semibold md:text-5xl">Charity management</h1>
          <p className="mt-3 text-ink/65">Create profiles, manage media, publish events, and feature selected charities.</p>
        </div>
        <Button>
          <ImagePlus size={18} aria-hidden />
          Add charity
        </Button>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {["Next Fairway Foundation", "Waterline Trust", "Mindful Recovery Network"].map((name) => (
          <Card key={name}>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="mt-2 text-sm text-ink/60">Active profile with events, content blocks, and contribution reporting.</p>
            <div className="mt-6 flex gap-2">
              <Button variant="secondary">
                <Pencil size={16} aria-hidden />
                Edit
              </Button>
              <button className="focus-ring grid size-11 place-items-center rounded-md border border-line bg-white text-ink/65 hover:text-ember" aria-label={`Delete ${name}`}>
                <Trash2 size={16} aria-hidden />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
