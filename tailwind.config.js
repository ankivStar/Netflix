/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.custom-scrollbar::-webkit-scrollbar': {
          display: 'none', // Hide scrollbar for Chrome, Safari, and Opera
        },
        '.custom-scrollbar': {
          '-ms-overflow-style': 'none', // Hide scrollbar for Internet Explorer and Edge
          'scrollbar-width': 'none',    // Hide scrollbar for Firefox
        },
        '.custom-scrollbar::-webkit-scrollbar, .custom-scrollbar': {
          '-webkit-appearance': 'none', // Hide scrollbar for Chrome, Safari, and Opera
          'scrollbar-width': 'none',     // Hide scrollbar for Firefox
        }
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
}

