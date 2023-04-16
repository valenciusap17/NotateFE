/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,json}",
    "./src/components/**/*.{js,ts,jsx,tsx,json}",
    "./src/app/**/*.{js,ts,jsx,tsx,json}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        poppinsBold: "PoppinsBold",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
};
