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
        "wave-black": "#0a0a0a",
        "wave-charcoal": "#1a1a1a",
        "wave-dark": "#2d2d2d",
        "wave-gold": "#d4af37",
        "wave-gold-light": "#e5c158",
        "wave-white": "#f5f5f5",
        "wave-gray": "#808080",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      spacing: {
        "safe-area-top": "var(--safe-area-inset-top)",
        "safe-area-bottom": "var(--safe-area-inset-bottom)",
      },
    },
  },
  plugins: [],
};

export default config;
