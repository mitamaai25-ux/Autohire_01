import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1F4959',
        secondary: '#5C7C89',
        dark: '#011425',
        surface: '#242424'
      },
      borderRadius: {
        '2xl': '1.25rem'
      },
      boxShadow: {
        soft: '0 12px 30px rgba(1, 20, 37, 0.12)'
      }
    }
  },
  plugins: []
} satisfies Config;
