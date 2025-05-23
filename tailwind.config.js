module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red:   'var(--brand-red)',
          navy:  'var(--brand-navy)',
          tan:   'var(--brand-tan)',
        }
      }
    }
  },
  plugins: [],
};
