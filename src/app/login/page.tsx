import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-66px)] max-w-md place-items-center px-4 py-10">
      <Card className="w-full">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <form className="mt-6 grid gap-4">
          <input className="focus-ring rounded-md border border-line px-3 py-3" placeholder="Email" type="email" />
          <input className="focus-ring rounded-md border border-line px-3 py-3" placeholder="Password" type="password" />
          <Button type="submit">Log in</Button>
        </form>
      </Card>
    </main>
  );
}
