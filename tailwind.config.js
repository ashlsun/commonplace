/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
  "./pages/**.{js,ts,jsx,tsx}",
  "./components/**.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      typography: ({ theme }) => ({
        ink: {
          css: {
            maxWidth: '100%',
            '--tw-prose-counters': theme('colors.black'),
            '--tw-prose-bullets': theme('colors.black'),
            '--tw-prose-hr': theme('colors.black'),
          }
        }
      }),
      colors: {
        emerald: colors.emerald,
        lime: colors.lime,
        teal: colors.teal,
        
      },
      animation: {
        marquee: 'marquee 65s linear infinite',
        marquee2: 'marquee2 65s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],

}
