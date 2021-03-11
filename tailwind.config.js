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
        gain: "#ed6a53",
        loss: "#26ae56",
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
  plugins: [],
};
