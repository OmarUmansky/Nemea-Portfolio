/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'firefly-glow': 'firefly-glow 2s ease-in-out infinite',
        'night-flutter': 'night-flutter 3s ease-in-out infinite',
        'moonlight-pulse': 'moonlight-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'firefly-glow': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'night-flutter': {
          '0%, 100%': { transform: 'rotate(0deg) translateY(0px)' },
          '25%': { transform: 'rotate(5deg) translateY(-2px)' },
          '75%': { transform: 'rotate(-5deg) translateY(2px)' },
        },
        'moonlight-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
} 