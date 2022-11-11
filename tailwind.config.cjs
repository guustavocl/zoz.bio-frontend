/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1f1f23",
        secondary: "#080808",
        tertiary: "#18181b",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
