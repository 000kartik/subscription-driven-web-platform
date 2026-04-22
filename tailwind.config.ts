import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111315",
        paper: "#F8F5EF",
        ember: "#F36B3D",
        moss: "#4D7C59",
        marine: "#124E66",
        gold: "#D8A545",
        line: "rgba(17, 19, 21, 0.12)"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(18, 78, 102, 0.22)",
        lift: "0 16px 40px rgba(17, 19, 21, 0.12)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
