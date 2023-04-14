/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
theme: {
    extend: {
      colors: {
        'primary': '#667eea',
        'secondary': '#ed64a6',
        'background': '#f3f4f6',
        'text': '#1f2937',
        'dark-background': '#111827',
        'dark-text': '#d1d5db',
      },
      backgroundColor: (theme) => ({
        'body': theme('colors.dark-background'),
      }),
      textColor: (theme) => ({
        'body': theme('colors.dark-text'),
      }),
    },
  },
  plugins: [],
}
