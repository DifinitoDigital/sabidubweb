/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#014751",
      },
      fontFamily: {
        'league-script': ['var(--font-league-script)', 'cursive'],
        'neonderthaw': ['var(--font-neonderthaw)', 'cursive'],
        'grey-qo': ['var(--font-grey-qo)', 'cursive'],
      },
    },
  },
  plugins: [],
};
