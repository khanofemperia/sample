import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      stroke: {
        gray: "#6c6c6c",
      },
      fill: {
        gray: "#6c6c6c",
      },
      textColor: {
        gray: "#6c6c6c",
      },
      colors: {
        "custom-gold": "#af8100",
        "custom-amber": "#e89300",
        "custom-amber-dimmed": "#d38600",
        "custom-red": "#ee3b3b",
        "custom-red-dimmed": "#ec2323",
        "custom-green": "#009e00",
        "custom-blue": "#0a5ddc",
        "custom-blue-dimmed": "#084db5",
        "glass-black": "#00000033",
        black: "#262626",
        lightgray: "#f0f0f0",
        "lightgray-dimmed": "#e5e5e5",
      },
      borderColor: {
        DEFAULT: "#dcdfe4",
      },
      boxShadow: {
        DEFAULT: "0px 1.8px 4px rgba(0,0,0,0.2), 0px 0px 3px rgba(0,0,0,0.1)",
        "thick-bottom": "#21212140 0px 3px 2px 0px, #E5E5E5 0px 0px 1px 1px",
        dropdown: "#00000040 0px 4px 8px -2px, #00000014 0px 0px 0px 1px",
      },
      backgroundImage: {
        "diamond-upholstery": "url('/images/textures/diamond-upholstery.png')",
      },
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [],
};
export default config;
