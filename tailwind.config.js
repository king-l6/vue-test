module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3b82f6',
          700: '#1d4ed8',
        },
        green: {
          600: '#16a34a',
        }
      },
    },
  },
  plugins: [],
}