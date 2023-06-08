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
          inverted: "var(--color-text-inverted)",
        },
      },
      backgroundColor: {
        fill: "var(--color-fill)",
        block: "var(--color-block)",
        accent: "var(--color-btn-accent)",
        accentHover: "var(--color-btn-accent-hover)",
        muted: "var(--color-btn-muted)",
        danger: "var(--color-btn-danger)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderColor: {
        base: "var(--color-text-base)",
      },
      boxShadow: {
        mainBlock: "0px 30px 90px 5px #1E1E1E;",
      },
    },
  },
  plugins: [],
};
