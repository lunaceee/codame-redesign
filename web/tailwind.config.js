const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary100: "#FFADFA",
      primary200: "#FF85F7",
      primary300: "#FF5CF4",
      primary500: "#FF02ED",
      primary600: "#DC00DA",
      primary700: "#B800AB",
      primary800: "#8F0085",
      primary900: "#66005F",
      red: colors.red,
      secondary100: "#9AF1FE",
      secondary200: "#5DE8FD",
      secondary300: "#35E2FD",
      secondary500: "#03CEEE",
      secondary600: "#02C1DE",
      secondary700: "#02AFCA",
      secondary800: "#028CA2",
      secondary900: "#016979",
      gray: colors.gray,
      white: colors.white,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
