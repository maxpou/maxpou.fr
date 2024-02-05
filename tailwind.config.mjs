import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3rem',
      '6xl': '3.5rem',
      '7xl': '4rem',
    },
    extend: {
      colors: {
        white: '#ffffff',
        mainYellow: '#ffdc4e',
        lightYellow: '#f9e892',
        blueGreyed: '#546c77',
        darkBlue: '#022a4b',
        lightBlue: '#eff6ff',
        beige: '#fff9d9',
        gray: {
          100: '#ECECED',
          200: '#CFCFD1',
          300: '#B2B3B5',
          400: '#78797E',
          500: '#3E4047',
          600: '#383A40',
          700: '#25262B',
          800: '#1C1D20',
          900: '#131315',
        },
      },
      typography: {
        DEFAULT: {
          css: [
            {
              fontSize: '1.1rem',
            },
          ],
        },
      },
    },
  },
  plugins: [typography],
}
