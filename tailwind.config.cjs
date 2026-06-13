/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },  
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(circle at 50% 0%, #1a1035 0%, #050816 50%, #050816 100%)",
      },
    },
  },
  plugins: [],
}

