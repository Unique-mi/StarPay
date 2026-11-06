import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        starpay: {
          navy: "#173653",
          green: "#078f68",
          deepGreen: "#006a54",
          ink: "#111827",
          muted: "#8a8f98",
        },
      },
      boxShadow: {
        frame: "0 18px 60px rgba(15, 36, 54, 0.07)",
        field: "inset 0 1px 2px rgba(15, 23, 42, 0.025)",
      },
    },
  },
  plugins: [],
};

export default config;
