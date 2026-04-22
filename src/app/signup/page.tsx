import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-6">
      <section>
        <h1 className="text-4xl font-semibold md:text-6xl">Create your membership.</h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">
          Choose a plan, select a charity, set your contribution percentage, then enter your first scores once subscribed.
        </p>
      </section>
      <Card>
        <form className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input className="focus-ring rounded-md border border-line px-3 py-3" placeholder="First name" />
            <input className="focus-ring rounded-md border border-line px-3 py-3" placeholder="Last name" />
          </div>
          <input className="focus-ring rounded-md border border-line px-3 py-3" placeholder="Email" type="email" />
          <input className="focus-ring rounded-md border border-line px-3 py-3" placeholder="Password" type="password" />
          <select className="focus-ring rounded-md border border-line px-3 py-3" defaultValue="">
            <option value="" disabled>
              Select charity
            </option>
            <option>Next Fairway Foundation</option>
            <option>Waterline Trust</option>
          </select>
          <label className="grid gap-2 text-sm font-medium">
            Charity contribution percentage
            <input className="accent-marine" type="range" min={10} max={100} defaultValue={10} />
          </label>
          <Button type="submit">Continue to payment</Button>
        </form>
      </Card>
    </main>
  );
}
