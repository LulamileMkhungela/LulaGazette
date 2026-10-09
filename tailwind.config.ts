import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lg: {
          blue: "#0C68BE",
          "blue-bright": "#0F80EB",
          navy: "#0B151F",
          ink: "#112130",
          slate: "#1D2E40",
          muted: "#5E7B99",
          soft: "#6B7F92",
          line: "#E6EDF4",
          wash: "#F5F8FB",
          green: "#298D62",
          cyan: "#49A9C9",
        },
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "Figtree", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 10px 40px rgba(11, 21, 31, 0.08)",
        soft: "0 4px 24px rgba(12, 104, 190, 0.12)",
      },
      backgroundImage: {
        "hero-fade":
          "linear-gradient(180deg, rgba(245,248,251,0.2) 0%, rgba(245,248,251,0.85) 55%, #F5F8FB 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
