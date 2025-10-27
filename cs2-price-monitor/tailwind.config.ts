import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#0EA5E9', 600: '#0284C7' },
        up: '#16a34a',
        down: '#dc2626',
        bg: '#0b1020',
        card: '#0f172a'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem'
      }
    }
  },
  plugins: []
};

export default config;
