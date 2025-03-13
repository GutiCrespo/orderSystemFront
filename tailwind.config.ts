import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}" 
  ],
  theme: {
    extend: {
      colors: {
          primary: "#050505",
          bg: "#FFFFFF",
          redsup: "#EA4E43",
          orangesup: "#FAA700",
          bluesup: "#0A85D1",
          gray: "#F6F5F4",
        },
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      screens: {
        xsm: "360px"
      }
    }
  }
};

export default config;
