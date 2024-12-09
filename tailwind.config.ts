import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        spring: '#318170',
        b: {
          20: '#27675A',
          40: '#1D4D43',
          52: '#183E36',
          60: '#14342D',
          66: '#112C26',
          80: '#0A1A16',
          90: '#050D0B',
          400: '#D5E1E2'
        },
        w: {
          20: '#5A9A8D',
          40: '#83B3A9',
          60: '#ADCDC6',
          80: '#D6E6E2',
          86: '#E2EDEB',
          90: '#EAF2F1',
          96: '#F7FAF9'
        },
        status: {
          created: 'rgba(54, 162, 222, 0.4)',
          processing: 'rgba(222, 215, 54, 0.40)',
          completed: 'rgba(108, 222, 54, 0.40)'
        },
        summer: '#F2C747',
        fall: '#983A4E',
        wow: '#47F2AA',
        stress: {
          'red-main': '#DE4A36',
          'red-back': '#FAE1DE',
          'yellow-main': '#DECD36',
          'yellow-back': '#FAF6DE'
        },
        white: {
          100: '#ffffff',
          80: 'rgba(255, 255, 255, 0.80)',
          60: 'rgba(255, 255, 255, 0.60)',
          40: 'rgba(255, 255, 255, 0.40)',
          20: 'rgba(255, 255, 255, 0.20)',
          8: 'rgba(255, 255, 255, 0.08)',
          3: 'rgba(255, 255, 255, 0.03)'
        },
        black: {
          100: '#000000',
          80: 'rgba(0, 0, 0, 0.80)',
          60: 'rgba(0, 0, 0, 0.60)',
          40: 'rgba(0, 0, 0, 0.40)',
          20: 'rgba(0, 0, 0, 0.20)',
          8: 'rgba(0, 0, 0, 0.08)',
          3: 'rgba(0, 0, 0, 0.03)'
        }
      },
      backgroundImage: {
        'skeleton-linear': 'linear-gradient(120deg, #e5e5e5 30%, #f0f0f0 38%, #f0f0f0 40%, #e5e5e5 48%)',
        'gradient-all': 'linear-gradient(159deg, rgba(133, 133, 133, 0.20) -7.71%, rgba(133, 133, 133, 0.00) 86.28%)',
        'gradient-processing': 'linear-gradient(159deg, rgba(222, 215, 54, 0.20) -7.71%, rgba(222, 215, 54, 0.00) 86.28%)',
        'gradient-completed': 'linear-gradient(159deg, rgba(108, 222, 54, 0.20) -7.71%, rgba(108, 222, 54, 0.00) 86.28%)',
        'gradient-buyer-new': 'linear-gradient(159deg, rgba(54, 222, 202, 0.20) -7.71%, rgba(54, 222, 202, 0.00) 86.28%)'
      },
      backgroundSize: {
        skeleton: '200% 100%'
      },
      backgroundColor: {
        tag: {
          green: '#CDFCCF',
          blue: '#CDF9FC',
          pink: '#E5CDFC',
          'light-pink': '#CDE8FC',
          yellow: '#FCF7CD',
          'light-yellow': '#FCE9CD',
          sundown: '#FCCDCD',
          'light-sundown': '#FAAAAA',
          gray: '#E3E3E3',
          'light-gray': 'rgba(0, 0, 0, 0.05)',
          transparent: 'transparent'
        }
      },
      animation: {
        skeleton: 'skeleton 1.5s infinite'
      },
      keyframes: {
        skeleton: {
          '0%': { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '-100% 0' }
        }
      },
      boxShadow: {
        50: '0px 8px 20px 0px rgba(0, 0, 0, 0.10)',
        100: '0px 0px 20px 0px rgba(0, 0, 0, 0.05)',
        200: '0px 0px 10px 0px rgba(0, 0, 0, 0.08)',
        300: '0px 0px 8px 0px rgba(0, 0, 0, 0.10)',
        400: '0px 0px 3px 0px rgba(0, 0, 0, 0.10)',
        700: '0px 2px 1px 0px rgba(10, 26, 22, 0.05)',
        800: '0px 1px 2px 0px rgba(0, 0, 0, 0.10)',
        input: '0px 0px 0px 4px rgba(226,237,235,0.75)',
        'input-error': '0px 0px 0px 4px #FAE1DE',
        'default-input': '0px 0px 3px 0px rgba(0,0,0,0.1)'
      },
      fontFamily: {
        'font-aeonik': 'Aeonik'
      }
    }
  },
  plugins: []
};

export default config;
