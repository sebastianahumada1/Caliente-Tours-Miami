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
      colors: {
        primary: "#ff00ff",
        secondary: "#00ffff",
        "background-light": "#f9fafb",
        "background-dark": "#0a0a1a",
        "deep-midnight": "#0a0a1a",
        "indigo-under": "#12122b",
        surface: "#161633",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
