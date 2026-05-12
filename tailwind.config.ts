import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        accent: {
          cyan: "#06b6d4",
          violet: "#7c3aed",
          emerald: "#10b981",
          amber: "#f59e0b",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-dark":
          "radial-gradient(at 40% 20%, hsla(228,100%,74%,0.05) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.05) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,0.03) 0px, transparent 50%)",
        "mesh-light":
          "radial-gradient(at 40% 20%, hsla(228,100%,74%,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.08) 0px, transparent 50%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "gradient-x": "gradientX 4s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.2)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.12)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.4)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "bounce-sm": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
