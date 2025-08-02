/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b35',
        'primary-hover': '#e55a2b',
        secondary: '#00ff88',
        accent: '#00ccff',
        danger: '#ff4757',
        success: '#00cc66',
        dark: {
          900: '#1a1a1a',
          800: '#141e1e',
          700: '#000000'
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif']
      },
      animation: {
        'neon-flow': 'neonFlow 6s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite'
      },
      keyframes: {
        neonFlow: {
          '0%': { left: '-100%', opacity: '0' },
          '8%': { left: '-50%', opacity: '0.3' },
          '15%': { left: '-20%', opacity: '1.8' },
          '25%': { left: '20%', opacity: '1' },
          '35%': { left: '80%', opacity: '1' },
          '45%': { left: '120%', opacity: '0.8' },
          '50%': { left: '150%', opacity: '0' },
          '100%': { left: '150%', opacity: '0' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}