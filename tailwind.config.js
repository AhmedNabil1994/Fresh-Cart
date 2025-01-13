/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],

  theme: {
    // set your own classes and remove tailwind classes
    extend: {
      // set your own classes and keep tailwind classes
    },
  },
  plugins: [
    // read the docs
    require("flowbite/plugin"),
  ],
};
