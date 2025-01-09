/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#f0f7ff",
          100: "#e0efff",
          200: "#b9dfff",
          300: "#7cc5ff",
          400: "#36a7ff",
          500: "#0090ff",
          600: "#0070f3",
          700: "#0058cc",
          800: "#0046a6",
          900: "#003380",
        },
      },
      spacing: {
        18: "4.5rem",
        112: "28rem",
        120: "30rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
            color: "rgb(55 65 81)",
            fontSize: "1.075rem",
            lineHeight: "1.75",
          },
        },
        dark: {
          css: {
            color: "rgb(209 213 219)",
            '[class~="lead"]': {
              color: "rgb(209 213 219)",
            },
            a: {
              color: "rgb(59 130 246)",
              "&:hover": {
                color: "rgb(96 165 250)",
              },
            },
            strong: {
              color: "rgb(255 255 255)",
            },
            "ol > li::marker": {
              color: "rgb(156 163 175)",
            },
            "ul > li::marker": {
              color: "rgb(156 163 175)",
            },
            hr: {
              borderColor: "rgb(75 85 99)",
            },
            blockquote: {
              color: "rgb(209 213 219)",
              borderLeftColor: "rgb(75 85 99)",
            },
            h1: {
              color: "rgb(255 255 255)",
            },
            h2: {
              color: "rgb(255 255 255)",
            },
            h3: {
              color: "rgb(255 255 255)",
            },
            h4: {
              color: "rgb(255 255 255)",
            },
            "figure figcaption": {
              color: "rgb(156 163 175)",
            },
            code: {
              color: "rgb(255 255 255)",
              backgroundColor: "rgb(31 41 55)",
            },
            "a code": {
              color: "rgb(255 255 255)",
            },
            pre: {
              color: "rgb(209 213 219)",
              backgroundColor: "rgb(31 41 55)",
            },
            "pre code": {
              color: "rgb(209 213 219)",
              backgroundColor: "transparent",
            },
            "pre code::before": {
              content: '""',
            },
            "pre code::after": {
              content: '""',
            },
            thead: {
              color: "rgb(255 255 255)",
              borderBottomColor: "rgb(75 85 99)",
            },
            "tbody tr": {
              borderBottomColor: "rgb(75 85 99)",
            },
            p: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            h1: {
              fontWeight: "800",
              color: "rgb(17 24 39)",
              fontSize: "2.25em",
              marginTop: "0",
              marginBottom: "0.8em",
              lineHeight: "1.1111111",
            },
            h2: {
              fontWeight: "700",
              color: "rgb(17 24 39)",
              fontSize: "1.75em",
              marginTop: "2em",
              marginBottom: "1em",
              lineHeight: "1.3333333",
            },
            h3: {
              fontWeight: "600",
              color: "rgb(17 24 39)",
              fontSize: "1.375em",
              marginTop: "1.6em",
              marginBottom: "0.6em",
              lineHeight: "1.6",
            },
            strong: {
              color: "rgb(17 24 39)",
              fontWeight: "600",
            },
            a: {
              color: "rgb(37 99 235)",
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                color: "rgb(29 78 216)",
                textDecoration: "underline",
              },
            },
            pre: {
              backgroundColor: "rgb(243 244 246)",
              borderRadius: "0.5rem",
              padding: "1rem",
              overflowX: "auto",
            },
            code: {
              color: "rgb(37 99 235)",
              backgroundColor: "rgb(239 246 255)",
              borderRadius: "0.25rem",
              padding: "0.2em 0.4em",
              fontSize: "0.875em",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            ul: {
              listStyleType: "disc",
              marginTop: "1.25em",
              marginBottom: "1.25em",
              paddingLeft: "1.625em",
            },
            ol: {
              listStyleType: "decimal",
              marginTop: "1.25em",
              marginBottom: "1.25em",
              paddingLeft: "1.625em",
            },
            li: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },
            blockquote: {
              fontWeight: "500",
              fontStyle: "italic",
              color: "rgb(55 65 81)",
              borderLeftWidth: "0.25rem",
              borderLeftColor: "rgb(229 231 235)",
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: "1.6em",
              marginBottom: "1.6em",
              paddingLeft: "1em",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
