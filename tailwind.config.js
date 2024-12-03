/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        black: "900",
        bold: "700",
        regular: "400",
        light: "300",
      },
      fontSize: {
        "10xl": ["5rem", { lineHeight: "1.2" }], // h1
        "9xl": ["4.5rem", { lineHeight: "1.2" }], // h2
        "8xl": ["4rem", { lineHeight: "1.2" }], // h3
        "7xl": ["3.75rem", { lineHeight: "1.1" }], // h4
        "6xl": ["3rem", { lineHeight: "1.1" }], // h5
        "5xl": ["2.5rem", { lineHeight: "1.1" }], // h6
        // Subtitle styles
        "4xl": ["2.375rem", { lineHeight: "1.1" }], // subtitle-lg
        "3xl": ["2rem", { lineHeight: "1.1" }], // subtitle-md
        "2xl": ["1.75rem", { lineHeight: "1.1" }], // subtitle-sm
        xl: ["1.5rem", { lineHeight: "1.1" }], // subtitle-xs

        // Body text styles
        lg: ["1.25rem", { lineHeight: "1.1" }], // body-lg
        ml: ["1.125rem", { lineHeight: "1.1" }], // body-ml
        sm: ["1rem", { lineHeight: "1.1" }], // body-sm
        xs: ["0.875rem", { lineHeight: "1.1" }], // body-xs
        xxs: ["0.75rem", { lineHeight: "1.1" }], // caption
      },
    },
  },
  plugins: [],
};
