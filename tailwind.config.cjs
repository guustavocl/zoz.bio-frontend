/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#010101",
        secondary: "#080808",
        tertiary: "#0c0f16",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
