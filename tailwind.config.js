/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        futura_pt: ['"Futura PT"'],
        tahu: ["Tahu"],
      },
      colors: {
        floral_white: "#fffcf0",
        sea_serpent: "#5bc6ce",
        celestial_blue: "#4599d4",
        chinese_blue: "#454ea1",
        bone: "#dbd3c8",
        gargoyle_gas: "#ffd148",
      },
    },
  },
  plugins: [],
};
