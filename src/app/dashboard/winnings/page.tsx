import { Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WinningsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="text-4xl font-semibold md:text-5xl">Winnings and verification</h1>
      <Card className="mt-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <Badge tone="warn">Proof required</Badge>
            <h2 className="mt-4 text-2xl font-semibold">April 3-match prize</h2>
            <p className="mt-2 text-ink/65">$420 pending admin verification before payout.</p>
          </div>
          <Button>
            <Upload size={18} aria-hidden />
            Upload proof
          </Button>
        </div>
      </Card>
    </main>
  );
}
