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
          danger: "var(--color-text-danger)",
          good: "var(--color-text-good)",
          inverted: "var(--color-text-inverted)",
          accent: "var(--color-btn-accent)",
        },
      },
      fill: { accent: "var(--color-btn-accent)" },
      backgroundColor: {
        fill: "var(--color-fill)",
        block: "var(--color-block)",
        accent: "var(--color-btn-accent)",
        accentHover: "var(--color-btn-accent-hover)",
        muted: "var(--color-btn-muted)",
        danger: "var(--color-btn-danger)",
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
        listItem: "150px 1fr auto",
        month: "auto 1fr auto",
        switch: "auto auto auto",
      },
      gridTemplateRows: {
        blockRowGrid: "80px 1fr 145px 60px 80px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderColor: {
        base: "var(--color-text-base)",
        accent: "var(--color-btn-accent)",
      },
      boxShadow: {
        mainBlock: "0px 30px 90px 5px #1E1E1E;",
      },
    },
  },
  plugins: [],
};
