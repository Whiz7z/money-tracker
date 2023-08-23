/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          muted: "var(--color-text-muted)",
          dark: "var(--color-block)",
          danger: "var(--color-text-danger)",
          good: "var(--color-text-good)",
          inverted: "var(--color-text-inverted)",
          accent: "var(--color-btn-accent)",
          ordinary: "var(--color-text-ordinary)",
        },
      },
      fill: { accent: "var(--color-btn-accent)" },
      backgroundColor: {
        fill: "var(--color-fill)",
        modal: "var(--color-modal)",
        block: "var(--color-block)",
        good: "var(--color-btn-good)",
        semitransparent: "var(--color-semi-tranparent)",
        accent: "var(--color-btn-accent)",
        accentHover: "var(--color-btn-accent-hover)",
        muted: "var(--color-btn-muted)",
        danger: "var(--color-btn-danger)",
        input: "var(--color-btn-inputbg)",
        border: "var(--color-btn-border)",
        item: "var(--color-item-bg)",
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
        listItem: "auto 1fr auto",
        month: "50px 180px 50px",
        monthPhone: "30px 120px 30px",
        switch: "auto auto auto",
        calendarInput: "auto auto",
      },
      gridTemplateRows: {
        blockRowGrid: "80px 1fr 145px 60px 80px",
        blockTypesGrid: "80px min-content min-content",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderColor: {
        base: "var(--color-text-base)",
        accent: "var(--color-btn-accent)",
        ordinary: "var(--color-text-ordinary)",
        border: "var(--color-btn-border)",
      },
      boxShadow: {
        mainBlock: "0px 30px 90px 5px #1E1E1E;",
      },
    },
    screens: {
      tiny: "200px",
      phone: "300px",
      tablet: "460px",
      // => @media (min-width: 640px) { ... }

      laptop: "700px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
