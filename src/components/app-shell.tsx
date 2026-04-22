import { Gift, HeartHandshake, ShieldCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/charities", label: "Charities" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin", label: "Admin" }
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-9 place-items-center rounded-md bg-ink text-paper">
            <Trophy size={18} aria-hidden />
          </span>
          Impact Draw Club
        </a>
        <nav className="hidden items-center gap-6 text-sm text-ink/72 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
        <Button href="/signup" className="hidden md:inline-flex">
          Subscribe
        </Button>
      </div>
    </header>
  );
}

export function TrustStrip() {
  const items = [
    { icon: ShieldCheck, label: "Verified winners" },
    { icon: Gift, label: "Monthly prize pool" },
    { icon: HeartHandshake, label: "Minimum 10% to charity" }
  ];

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3 rounded-md border border-line bg-white/60 p-3 text-sm font-medium">
          <item.icon size={18} className="text-marine" aria-hidden />
          {item.label}
        </div>
      ))}
    </div>
  );
}
