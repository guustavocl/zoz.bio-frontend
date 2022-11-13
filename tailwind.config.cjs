/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        screen80: "80vh",
      },
      colors: {
        zblack: "#080808",
        primary: "#16161b",
        secondary: "#0a0a0a",
        tertiary: "#202029",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
