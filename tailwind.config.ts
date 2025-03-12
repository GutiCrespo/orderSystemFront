import type { Config } from "tailwindcss";
// import tailwindScrollbar from "tailwind-scrollbar";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#091A4C"
        },
        secondary: {
          DEFAULT: "#FC540C"
        },
        tertiary: {
          DEFAULT: "#0F45E7"
        },
        danger: {
          DEFAULT: "#FF3D40"
        },
        success: {
          DEFAULT: "#39B445 "
        },
        ink: {
          DEFAULT: "#374151",
          secondary: "#6b7280",
          white: "#fff",
          beige: "#f6f6f6",
          mid: "#d1d5db",
          light: "#9ca3af",
          gray: "#D9D9D9"
        }
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"]
      },
      screens: {
        xsm: "360px"
      }
    }
  },
  // plugins: [tailwindScrollbar]
};
export default config;
