/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Strict monochrome system
        cx: {
          950: '#000000', // Pitch black
          900: '#09090b', // Off black
          850: '#121215', // Dark card
          800: '#18181b', // Surface dark
          700: '#27272a', // Border dark
          600: '#3f3f46', // Muted dark
          500: '#71717a', // Mid gray
          400: '#a1a1aa', // Muted text
          300: '#d4d4d8', // Border light
          200: '#e4e4e7', // Surface light
          100: '#f4f4f5', // Card light
          50:  '#fafafa', // Off white
          0:   '#ffffff', // Pure white
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cx-subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'cx-card': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'cx-card-dark': '0 4px 25px -2px rgba(0, 0, 0, 0.7), 0 2px 8px -1px rgba(0, 0, 0, 0.5)',
        'cx-glow': '0 0 20px rgba(255, 255, 255, 0.15)',
        'cx-glow-black': '0 0 20px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'cx-sm': '4px',
        'cx-md': '8px',
        'cx-lg': '12px',
        'cx-xl': '16px',
        'cx-2xl': '24px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
