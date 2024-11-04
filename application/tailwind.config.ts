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
        josefin: ['var(--font-josefin-sans)'],
        shantell: ['var(--font-shantell-sans)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: "rgb(217,217,217)",
        sage: "rgb(209,218,175)",
        darkSage: "rgb(187,200,135)",
        lightBlue: "rgb(198,226,255)"
      },
      spacing: {
        'larger': '7rem', 
      },
      height: {
        'h-nav': '80px',
      }
    },
  },
  plugins: [],
};
export default config;
