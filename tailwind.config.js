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
        // Customize it on globals.css :root
        primaryColor: '#21b6b7',
        textColor: '#124a63',
        textColorSec: '#b3c5cd',
        bgColor: '#f9f9f9',
        bgColorDark: '#eef3f6',
        bgColorLight: '#ffffff',
        dark: '#222222',
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
