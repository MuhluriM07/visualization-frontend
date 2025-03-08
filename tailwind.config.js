/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'primary': "#3C5564",
      'SparkDigitalPink': "#C4338F",
      'lightGrey': "#F2F2F2",
      'white': "#ffffff",
      'darkGrey': "##7E939C",
      'xlLightGrey': "#F3F7FA",
      'primaryBlue': "#008FE0",
      'columbiaBlue': "#B7CEDB",
      'down-app': "rgba(255, 255, 255, 0.6)",
      "bgColor": "#E6F0F7"
    },
    extend: {
      backgroundImage: {
        'footer-top-radial-gradient': 'radial-gradient(88.02% 8796.47% at 50% 50%, rgba(50, 197, 255, 0.25) 0%, rgba(0, 143, 224, 0) 100%)',
        'footer-bottom-linear-gradient': 'linear-gradient(180deg, rgba(0, 143, 224, 0) 24.15%, rgba(0, 143, 224, 0.4) 155.13%)',
        'devices-bg-linear-gradient': 'linear-gradient(59.32deg, rgba(0, 143, 224, 0.5) 5.81%, rgba(96, 191, 241, 0.235) 23.73%, rgba(155, 221, 251, 0.5) 41.2%, rgba(220, 244, 255, 0.5) 59.86%), linear-gradient(0deg, #008FE0, #008FE0)',
        'device-cards-bg-linear-gradient': 'linear-gradient(311.43deg, rgba(230, 240, 248, 0.3) -10.91%, rgba(230, 242, 250, 0.15) 17.92%, rgba(155, 221, 251, 0.3) 87.24%)',
        'blue-gradient': 'linear-gradient(90deg, rgba(220, 244, 255, 0.3) 0%, rgba(0, 143, 224, 0.3) 51.04%, rgba(8, 45, 108, 0.3) 100%), #008FE0',
        'top-up-gradient': 'linear-gradient(79.41deg, rgba(0, 143, 224, 0.5) -3.64%, rgba(0, 143, 224, 0.5) 38.53%, rgba(220, 244, 255, 0.5) 98.3%)'
      },
      fontFamily: {
        'SparkDigitalBold': ['SparkDigital123-Bold', 'sans-serif'],
        'SparkDigitalRegular': ['SparkDigital123-Regular', 'sans-serif'],
        'SparkDigitalLight': ['SparkDigital123-Light', 'sans-serif']
      },
    },
  },
  plugins: [],
}
