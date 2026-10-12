import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-bricolage)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        canvas: "#F5F7F5",
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#EEF2EF",
          raised: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#182522",
          secondary: "#4F605A",
          muted: "#6B7A74",
        },
        border: {
          neutral: "#DCE4DE",
          strong: "#C4D0C8",
        },
        brand: {
          DEFAULT: "#1F6654",
          hover: "#174F41",
          soft: "#E5F1EB",
          ink: "#16483B",
        },
        status: {
          verified: "#047857",
          "verified-soft": "#ECFDF5",
          estimated: "#B45309",
          "estimated-soft": "#FFFBEB",
          conflicting: "#BE123C",
          "conflicting-soft": "#FFF1F2",
          unknown: "#475569",
          "unknown-soft": "#F1F5F9",
        },
      },
    },
  },
  plugins: [],
};

export default config;
