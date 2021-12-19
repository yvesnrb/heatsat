module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      foreground: '#000000',
      background: '#ffffff',
      accent: {
        1: '#fafafa',
        2: '#eaeaea',
        3: '#999999',
        4: '#888888',
        5: '#666666',
        6: '#444444',
        7: '#333333',
        8: '#111111',
      },
      error: {
        lighter: '#f7d4d6',
        light: '#ff1a1a',
        default: '#ee0000',
        dark: '#c50000',
      },
      success: {
        lighter: '#d3e5ff',
        light: '#3291ff',
        default: '#0070f3',
        dark: '#0761d1',
      },
      warning: {
        lighter: '#ffefcf',
        light: '#f7b955',
        default: '#f5a623',
        dark: '#ab570a',
      },
      violet: {
        lighter: '#d8ccf1',
        light: '#8a63d2',
        default: '#7928ca',
        dark: '#4c2889',
      },
      cyan: {
        lighter: '#aaffec',
        light: '#79ffe1',
        default: '#50e3c2',
        dark: '#29bc9b',
      },
      highlight: {
        purple: '#f81ce5',
        magenta: '#eb367f',
        pink: '#ff0080',
        yellow: '#fff500',
      },
    },
  },
  plugins: [],
}
