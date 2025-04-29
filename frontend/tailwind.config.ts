import type { Config } from 'tailwindcss';

const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './app/components/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#fbfefe',
          100: '#eef9f9',
          200: '#d9f2f2',
          300: '#bce9e9',
          400: '#96dcdc',
          500: '#68cdcd',
          600: '#3bb2b2',
          700: '#267373',
          800: '#184848',
          900: '#102f2f',
          950: '#0d2626',
        },
        'secondary': {
          50: '#fefdfb',
          100: '#fdf7ef',
          200: '#faeedb',
          300: '#f6e1c0',
          400: '#f0d09c',
          500: '#eabb71',
          600: '#e2a33d',
          700: '#bf811d',
          800: '#6d4a10',
          900: '#3d2909',
          950: '#2c1e07',
        },
        'tertiary': {
          50: '#fefdfd',
          100: '#fcf6f6',
          200: '#f8ebea',
          300: '#f3dbda',
          400: '#edc6c5',
          500: '#e5adac',
          600: '#db908e',
          700: '#d06d6c',
          800: '#802a29',
          900: '#3d1413',
          950: '#270d0c',
        },
        error: colors.red,
        success: colors.green,
        neutral: colors.gray,
        background: 'rgb(var(--background-rgb))',
        foreground: 'rgb(var(--foreground-rgb))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
