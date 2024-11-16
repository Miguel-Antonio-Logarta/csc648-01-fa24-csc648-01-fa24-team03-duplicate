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
        sage: "rgb(209,218,175)",
        darkSage: "rgb(187,200,135)",
        lightBlue: "rgb(198,226,255)",
        // Same colors as above, but with more specfic names
        "gray": "#D9D9D9",
        "tea-green": "#D1DAAF",
        "tea-green-hover": "#C6D19B",
        "olivine": "#BBC887",
        "columbia-blue": "#C6E2FF",
        "jordy-blue": "#85c0ff",
        "cherry-blossom-pink": "#F4A4B1",
        "pink-hover": "#FAC6CF",
        "lavender-blush": "#FFE7EC",
        "umber": "#715E50"
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
