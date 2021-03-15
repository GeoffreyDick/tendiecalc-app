const tailwindForms = require("@tailwindcss/forms");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    fontFamily: {
      monospace: ["Inconsolata", "monospace"],
    },
    extend: {
      colors: {
        dark: "#161615",
        darkish: "#2a2a29",
        primary: "#daa144",
        loss: "#ed6a53",
        gain: "#26ae56",
        even: "#959580",
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ["focus-within"],
      ringColor: ["focus-within"],
      ringOpacity: ["focus-within"],
    },
  },
  plugins: [tailwindForms],
};
