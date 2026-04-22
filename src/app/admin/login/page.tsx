import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-66px)] max-w-md place-items-center px-4 py-10">
      <Card className="w-full">
        <ShieldCheck className="text-marine" aria-hidden />
        <h1 className="mt-4 text-3xl font-semibold">Admin access</h1>
        <form className="mt-6 grid gap-4">
          <input className="focus-ring rounded-md border border-line px-3 py-3" placeholder="Admin email" type="email" />
          <input className="focus-ring rounded-md border border-line px-3 py-3" placeholder="Password" type="password" />
          <Button type="submit">Continue</Button>
        </form>
      </Card>
    </main>
  );
}
