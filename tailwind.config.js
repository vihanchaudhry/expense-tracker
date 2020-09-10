module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx,css}',
    './components/**/*.{js,ts,jsx,tsx,css}',
    './styles/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
