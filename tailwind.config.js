/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f3',
          100: '#fde6e7',
          200: '#fbd0d5',
          300: '#f7aab2',
          400: '#f27a8a',
          500: '#e63950',
          600: '#d42a42',
          700: '#b31d35',
          800: '#961b31',
          900: '#801a2e',
        },
      },
    },
  },
  plugins: [],
}
