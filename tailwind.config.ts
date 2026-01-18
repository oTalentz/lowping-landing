import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'border': 'border 4s linear infinite',
        'goUpDown': 'goUpDown 2s ease-in-out infinite',
        'goUpDown-slow': 'goUpDown 3s ease-in-out infinite',
        'goUpDown-medium': 'goUpDown 2.5s ease-in-out infinite',
        'goUpDown-fast': 'goUpDown 1.5s ease-in-out infinite',
        'goUpDown-delay': 'goUpDown 2s ease-in-out infinite 0.5s',
        'goUpDown-reverse': 'goUpDown 2s ease-in-out infinite reverse',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        border: {
          to: { '--border-angle': '360deg' },
        },
        goUpDown: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      screens: {
        'xs': '480px',
      }
    },
  },
  plugins: [],
} satisfies Config;

export default config;
