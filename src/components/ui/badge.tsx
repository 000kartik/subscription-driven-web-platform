import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warn" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tone === "neutral" && "bg-ink/8 text-ink",
        tone === "success" && "bg-moss/12 text-moss",
        tone === "warn" && "bg-ember/12 text-ember"
      )}
    >
      {children}
    </span>
  );
}
