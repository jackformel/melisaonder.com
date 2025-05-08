import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-playfair-display)', 'var(--font-geist-sans)', 'var(--font-inter)', 'sans-serif'],
      },
      // backgroundImage: { // Removed as likely unused
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      screens: {
        sm: "640px", // Default, but explicit for clarity
        md: "768px", // Default, but explicit for clarity
        lg: "1024px", // Default, but explicit for clarity
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  // darkMode: "class", // Removed as dark mode is not currently implemented
};
export default config; 