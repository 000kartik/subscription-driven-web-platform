import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("premium-panel rounded-lg p-5", className)}>{children}</div>;
}

export function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <Card>
      <p className="text-sm text-ink/60">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-normal">{value}</p>
      <p className="mt-2 text-sm text-ink/65">{detail}</p>
    </Card>
  );
}
