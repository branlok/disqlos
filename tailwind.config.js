module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    minHeight: {
      40: "10em",
    },
    extend: {
      animation: { "min-bounce": "min-bounce 1s infinite;" },
      keyframes: {
        "min-bounce": {
          "0%, 100%": {
            transform: " translateY(-10%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      colors: {
        "base-gray": "#E9E8EB",
        "pale-red": {
          1: "#BD6B6B",
        },
        "custom-pink": {
          300: "#F9F6FF",
          400: "#F9F6FF",
          500: "#F3F1F5",
          550: "#ECE9F1",
          600: "#E5DEEC",
          900: "#755D8D",
          950: "#221C38",
          1000: "#221C38",
          1100: "#7F7DCB",
          1200: "#4F4958",
        },
        cb: {
          1: "#0F0F16",
          2: "#191821",
          3: "#292831",
          4: "#3D3C46",
          8: "#795d8c",
          9: "#432B99",
          10: "#4522C3",
        },
        special: {
          teal: "#1aedae",
        },
        "custom-gray": {
          500: "#F5F1F1",
        },
      },
      fontFamily: {
        body: ["Roboto"],
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ["dark"],
      animation: ["hover"],
      width: ["hover"],
      height: ["hover"],
      backgroundColor: ["active"],
      margin: ["last", "first"],
    },
  },
  plugins: [],
};
