import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0A0F1C",
        "off-white": "#F0EFE8",
        gold: "#D4A843",
        "card-slate": "#1F2937",
        "card-border": "#374151",
        "cool-grey": "#B0B8C4",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
