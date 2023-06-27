/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        space: ['Space Grotesk'],
        mono: ['Space Mono'],
      },
    }
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography'),]
};
