import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bg_svg: "url('/bg_super_test.svg')",
      },
      colors: {
        primaryOne: "#413C5F",
        primaryTwo: "#817CA5",
        secondaryOne: "#C0BCDF",
        secondaryTwo: "#8B85B1",
        secondaryThree: "#CECAEB",
        pending: "#C9C5E8",
        passed: "#87839F",
        active: "#5845DD",
        error: "#DA2121",
        disabled: "#A39FC1",
      },
    },
  },
  plugins: [],
};
export default config;
