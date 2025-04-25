/** @type {import('tailwindcss').Config} */
const flowbiteReact = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbiteReact.content(),
  ],

  theme: {
    // set your own classes and remove tailwind classes
    fontFamily: {
      poppins: ["Poppins", "serif"],
      inter: ["Inter", "sans-serif"],
    },
    extend: {
      // set your own classes and keep tailwind classes
      screens: {
        "min-414": "414px",
      },
      colors: {
        secondary: "#DB4444",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [require("flowbite/plugin"), flowbiteReact.plugin()],
  darkMode: "class",
};
