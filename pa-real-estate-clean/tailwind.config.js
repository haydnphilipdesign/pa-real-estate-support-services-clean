/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'brand-blue': '#0066CC',
        'brand-blue-dark': '#0F1C2E',
        'brand-blue-light': '#E6F0FA',
        'brand-gold': '#D4AF37',
        'brand-gold-light': '#F7F3E3',
        'brand-navy': '#0F1C2E',
        'neutral-100': '#F5F7FA',
        'neutral-200': '#EEF2F6',
        'neutral-300': '#E4E9F0',
        'neutral-400': '#D1DAE6',
        'neutral-500': '#9EABC4',
        'neutral-600': '#6B7A95',
        'neutral-700': '#4A5568',
        'neutral-800': '#2D3748',
        'neutral-900': '#1A202C',
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in-out',
      },
    },
  },
  plugins: [],
}