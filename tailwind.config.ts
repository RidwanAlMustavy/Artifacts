import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0F0F0F",
          50: "#F8F7F4",
          100: "#EEECEA",
          200: "#D4D0CB",
          300: "#A8A29E",
          400: "#78716C",
          500: "#57534E",
          600: "#44403C",
          700: "#292524",
          800: "#1C1917",
          900: "#0F0F0F",
        },
        indigo: {
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
        },
        amber: {
          400: "#FCD34D",
          500: "#F59E0B",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "Inter, system-ui, sans-serif",
            "h1,h2,h3,h4": { fontFamily: "Fraunces, Georgia, serif" },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
