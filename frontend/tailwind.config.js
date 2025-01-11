/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'], // Override default sans-serif
        space_grotesk: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        // Primary Colors
        primary: {
          100: '#F0EEFF', // Lightest
          200: '#E2DDFF',
          300: '#8B6EFF',
          400: '#6B4DE6', // Main Brand Color
          500: '#5438B8', // Darker shade
          600: '#472F9D',
          700: '#3A2682',
        },
      },
    },
  },
  daisyui: {
    themes: ['light'],
  },
  plugins: [require('daisyui')],
};
