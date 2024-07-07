/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#040A26",
      },
      backgroundImage: {
        gradient:
          "radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.15) 0px, transparent 0%), radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.15) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.15) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.15) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.15) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.15) 0px, transparent 50%), radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 0.15) 0px, transparent 50%)",
      },
      zIndex: {
        3: 3,
      },
      filter: {
        "blur-saturate": "blur(100px) saturate(150%)",
      },
      opacity: {
        15: 0.15,
      },
    },
  },

  plugins: [forms],
};
