/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

// function withOpacityValue(variable) {
//   return ({ opacityValue }) => {
//     if (opacityValue === undefined) {
//       return `rgb(var(${variable}))`;
//     }
//     return `rgb(var(${variable}) / ${opacityValue})`;
//   };
// }

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primaryColor: '#21b6b7',
        textColor: '#f0f0f0',
        textColorSec: '#b3c5cd',
        bgColor: '#252329',
        bgColorDark: '#3c393f',
        bgColorLight: '#120f13',
        dark: '#222222',
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
