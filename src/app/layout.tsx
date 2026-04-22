import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Impact Draw Club",
  description: "Subscription prize draws powered by verified scores and meaningful charity impact."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
