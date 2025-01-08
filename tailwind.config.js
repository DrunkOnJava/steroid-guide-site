/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
            color: "rgb(55 65 81)",
            h1: {
              fontWeight: "800",
              color: "rgb(17 24 39)",
            },
            h2: {
              fontWeight: "700",
              color: "rgb(17 24 39)",
            },
            h3: {
              fontWeight: "600",
              color: "rgb(17 24 39)",
            },
            strong: {
              color: "rgb(17 24 39)",
            },
            a: {
              color: "rgb(37 99 235)",
              "&:hover": {
                color: "rgb(29 78 216)",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
