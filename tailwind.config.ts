import type { Config } from "tailwindcss";

// Colours are RGB triplets set per theme in globals.css; they are the only colours the site can use.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;
const ramp = (name: string) =>
  Object.fromEntries([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((s) => [s, v(`${name}-${s}`)]));
const brand = ramp("brand");
const gray = ramp("gray");
// Fold every default Tailwind hue into the palette so no off-palette class (data gradients, status dots) can leak in.
const HUES = ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];
const NEUTRALS = ["slate", "zinc", "neutral", "stone"];

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts}", // data files carry class names (e.g. skill category gradients)
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      white: v("white"),
      black: v("black"),
      "on-brand": v("on-brand"), // text on brand-filled surfaces
      brand,
      gray,
      ...Object.fromEntries(NEUTRALS.map((k) => [k, gray])),
      ...Object.fromEntries(HUES.map((k) => [k, brand])),
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgb(var(--brand-500) / 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
