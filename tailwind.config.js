/** @type {import('tailwindcss').Config} */

const Color = require('color');
const lighen = (clr, val) => Color(clr).lighten(val).rgb().string();
const darken = (clr, val) => Color(clr).darken(val).rgb().string();

const primary = "#0f0f0f";
const secondary = "#6d28d9";

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: '1rem',
      center: true
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: primary,
          lighter: lighen(primary, 0.2),
          darker: darken(primary, 0.2)
        },
        secondary: {
          DEFAULT: secondary,
          lighter: lighen(secondary, 0.2),
          darker: darken(secondary, 0.2)
        },
      },
    },
  },
  plugins: [],
}
