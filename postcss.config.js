// postcss.config.js (ESM)
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // <-- use this, not "tailwindcss"
    autoprefixer: {},
  },
};
