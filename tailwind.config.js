module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
      colors: {
        primary: "#0E406E",

        Primary: "#E21553",
        primary80: " #00029B",

        secondary: "#00B4D8",
        secondary60: "#CAF0F8",
        secondary80: " #90E0EF",
        whiteZero: "#FFFFFF",

        blackZero: "000000",
        blackPrimary: "#212529",
        blackSecondary: "#313131",

        grayPrimary: "#757575",
        grayPrimaryLight: "#979797",
        graySecondary: "#D2D2D2",
        graySecondaryBlue: "#B1AAB1",
        grayThird: "#EDEDED",
        grayThirdLight: " #EDEDED",

        bluePrimary: "#0E406E",
        blueSecondary: "#2258A6",
        blueThird: "#2D58C4",
        blueThirdLight: "#1464E6",

        blueLigth: "#00ACEE",
        blueLight20: "#8CDFFF",
        blueDarkBlue: " #1B1464",

        yellowFlagBJ: "#FFBE00",

        redFlagBJ: "#EB0000",
        redLight: "#D7382E",

        greenFlagBJ: "#006828",
        greenDark: "#0E6258",

        indigoPrimary: "#573A72",
        indigoSecondary: "#A33663",

        nohotRed: "#d72631",
        "nohot-indigo": "#d72631",
        "nohot-yellow": "#f3ca20",
        "nohot-red-dark": "#b20238",
        "nohot-orange-dark": "#c66b3d",
        "nohot-gray-light": "#e5e5dc",
        "nohot-blue-light": "#1868ae",
        "nohot-black-light": "#201e20",
        "nohot-bluegreen-light": "#097770",
      },
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
      },
      height: {
        128: "43rem",
      },
      fontSize: {
        'small': '8px',
    },
    },
  },
  variants: {
    extend: {
      lineClamp: ["responsive", "hover"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
