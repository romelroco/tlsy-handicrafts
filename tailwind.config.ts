import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2C1810",
        secondary: "#FFF8F0",
        accent: "#D4A574",
        craft: "#8B6F47",
        warm: "#E8D5C4",
        terracotta: "#C97064",
        sage: "#9CAF88",
        cream: "#FAF3E0",
        text: "#3E2723",
        highlight: "#D4AF37",
      },
      fontFamily: {
        serif: ["Georgia", "Playfair Display", "serif"],
        sans: ["Inter", "Poppins", "sans-serif"],
        hand: ["'Brush Script MT'", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
