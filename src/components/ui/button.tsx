import Link from "next/link";
import type { LinkProps } from "next/link";
import { clsx } from "clsx";
import type { ComponentProps, ReactNode } from "react";

type ButtonProps = ComponentProps<"button"> & {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

const styles = {
  primary: "bg-ink text-paper hover:-translate-y-0.5 hover:shadow-lift",
  secondary: "border border-line bg-white/70 text-ink hover:-translate-y-0.5 hover:bg-white",
  ghost: "text-ink hover:bg-ink/5"
};

export function Button({ href, variant = "primary", className, children, ...props }: ButtonProps) {
  const classes = clsx(
    "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition",
    styles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href as LinkProps<string>["href"]} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
