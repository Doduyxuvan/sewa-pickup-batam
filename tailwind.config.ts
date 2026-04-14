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
        primary: '#FF5722',
        'primary-dark': '#E64A19',
        'primary-light': '#FF8A65',
        surface: '#0F0F1A',
        card: '#16213E',
        secondary: '#1A1A2E',
      },
    },
  },
  plugins: [],
};
export default config;
