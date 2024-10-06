import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Adjust path according to your folder structure
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        "hero-front": "url('/assets/front.svg')",
        "hero-Back": "url('/assets/back.svg')",
        "hero-login": "url('/assets/cover_iamge_web.webp')",
        "hero-login-mobile": "url('/assets/cover_image_mobile.webp')",
      },

      screens: {
        // "max-taplet-rotate": { max: "1180px" },
        sm: "640px",
        md: "768px",
        lg: "1024px",
        mini: "1200px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1900px",
      },
      colors: {
        THEME_PRIMARY_COLOR: "#005fb0",
        THEME_ON_PRIMARY_COLOR: "#ffffff",
        THEME_SECONDARY_COLOR: "#555f71",
        THEME_ON_SECONDARY_COLOR: "#ffffff",
        THEME_TERTIARY_COLOR: "#6e5676",
        THEME_ON_TERTIARY_COLOR: "#ffffff",
        THEME_ERROR_COLOR: "#ba1a1a",
        THEME_ON_ERROR_COLOR: "#ffffff",
        THEME_BACKGROUND_COLOR: "#fdfcff",
        THEME_ON_BACKGROUND_COLOR: "#1a1c1e",
        THEME_ON_BACKGROUND_COLOR67: "#1a1c1eaa",
        THEME_ON_BACKGROUND_COLOR13: "#1a1c1e20",
        THEME_OUTLINE_COLOR: "#74777f",
      },
    },
  },
  plugins: [],
};
export default config;
