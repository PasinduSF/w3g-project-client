/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        placeholder: "#00000040",
        text: "#575757",
        "Text-dark": "#25252F",
        "Text-light": "#77777E",
        "Text-disabled": "#CACACD",
      },
      fontFamily: {
        Lato: "Lato, sans-serif",
      },
    },
  },
  plugins: [],
};
