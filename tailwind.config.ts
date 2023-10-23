import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/...'
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 0 10px rgba(0, 0, 0, 0.2)', // Definicja niestandardowego efektu cienia
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "regal-blue": "#243c5a",
        my: "#2196F3",
        navbar: "#F5F5F5",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans'],
      },

    },
  },
  plugins: [],
}
export default config
