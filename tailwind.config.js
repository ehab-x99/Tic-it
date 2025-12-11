/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cyberpunk color palette
        cyber: {
          pink: '#ff0080',
          blue: '#00ffff',
          green: '#00ff41',
          purple: '#bf00ff',
          orange: '#ff6600',
          yellow: '#ffff00',
          cyan: '#00ccff',
          magenta: '#ff00cc',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        neon: {
          pink: '#ff0080',
          blue: '#00ffff',
          green: '#00ff41',
          purple: '#bf00ff',
          orange: '#ff6600',
          yellow: '#ffff00',
          cyan: '#00ccff',
          magenta: '#ff00cc',
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'futura': ['Exo 2', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 1.5s linear infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor'
          },
          '100%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
          },
        },
        'pulse-neon': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1) drop-shadow(0 0 5px currentColor)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'brightness(1.2) drop-shadow(0 0 10px currentColor)',
          },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '75%': { opacity: '0.9' },
          '25%': { opacity: '0.7' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
        'neon-lg': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
        'cyber': '0 4px 14px 0 rgba(255, 0, 128, 0.39)',
        'cyber-lg': '0 6px 20px rgba(255, 0, 128, 0.4)',
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(-45deg, #ff0080, #00ffff, #bf00ff, #00ff41)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
