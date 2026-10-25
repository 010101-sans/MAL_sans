/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables switching between light and dark mode
  theme: {
    extend: {
      colors: {
        mal: {
          /* We will map these to CSS variables in index.css for smooth theme toggling */
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          border: 'var(--color-border)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          accent: '#3b82f6', // Modern MAL Blue
          accentHover: '#2563eb'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
      }
    },
  },
  plugins: [],
}