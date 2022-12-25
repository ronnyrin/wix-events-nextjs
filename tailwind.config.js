/** @type {import('tailwindcss').Config} */
const widthExtension = {
  'full-content': '980px',
};

module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        ...widthExtension,
      },
      width: {
        ...widthExtension,
      },
      colors: {
        'yellow-100': '#ffc657',
        'blue-100': '#116dff'
      },
      gridTemplateColumns: {
        'auto-sm': 'repeat(auto-fill,minmax(120px,1fr))',
      },
      backgroundImage: {
        'site-background': "url('/site-background.jpeg')",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
