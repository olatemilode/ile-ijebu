import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF6EA",
        gold: {
          DEFAULT: "#C9A227",
          soft: "#E4C765",
          deep: "#9A7A1A",
        },
        cocoa: {
          DEFAULT: "#3B2416",
          deep: "#241408",
        },
        aro: {
          red: "#7A1F2B",
          green: "#0E4D3C",
        },
        ink: "#111008",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "weave": "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 8px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
