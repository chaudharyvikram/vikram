/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#121212",
        primary: {
          DEFAULT: "#8B5CF6", // Violet-500
          glow: "#7C3AED",    // Violet-600
        },
        secondary: {
          DEFAULT: "#06B6D4", // Cyan-500
        },
        accent: {
          DEFAULT: "#F59E0B", // Amber-500
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}
