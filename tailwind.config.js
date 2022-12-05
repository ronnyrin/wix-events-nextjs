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
        turquoise: '#57BBBF',
      },
      gridTemplateColumns: {
        'auto-sm': 'repeat(auto-fill,minmax(120px,1fr))',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
