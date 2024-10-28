const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#111111',
          secondary: '#1B1B1B',
          tertiary: '#303030',
        },
        border: {
          primary: '#303030',
        },
        content: {
          primary: '#FFFFFF',
          body: '#E2E2E2',
          heading: '#C6C6C6',
          muted: '#5E5E5E',
          placeholder: '#777777',
          inverse: '#111111',
        },
        accent: {
          brand: '#C4F120',
          hover: '#A8D30D',
          red: '#E61E32',
        },
      },
    },
  },
  plugins: [],
};
