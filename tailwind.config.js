/** @type {import('tailwindcss').Config} */
export default {
  content: ["app", "components"].map(s => `./src/${s}/**/*.{ts,tsx}`),
  theme: {
    extend: {},
  },
  plugins: [],
}

