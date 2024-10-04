import scrollbar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'
import lineClamp from '@tailwindcss/line-clamp'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E1B29', //!main #100429 //#423F71
        header: '#141218', //!main #0B0205  //#292841
        body: '#0C0B10', //!main #000 //#1C1B29
      },
      screens: {
        mobile: {
          max: '500px',
        },
        vs: {
          min: '501px',
          max: '640px',
        },
      },
      transitionProperty: {
        margin: 'margin',
        opacity: 'opacity',
        transform: 'transform',
      },
    },
  },
  plugins: [lineClamp, scrollbar],
}
export default config
