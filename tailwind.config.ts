import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#FDF7F5',
          100: '#F9ECE7',
          200: '#F3D4CB',
          300: '#E9B3A4',
          400: '#DC8873',
          500: '#C84B31', // Signature Kenyan Terracotta
          600: '#B53A22',
          700: '#942B16',
          800: '#752313',
          900: '#541B10',
          950: '#2E0C06',
        },
        sun: {
          50: '#FEFBF0',
          100: '#FDF5DC',
          200: '#FAE8B4',
          300: '#F5D785',
          400: '#EFC052',
          500: '#E5A93C', // Golden Acacia / African Sunlight
          600: '#C8871E',
          700: '#9F6317',
          800: '#7B4C16',
          900: '#593613',
        },
        ember: {
          50: '#FFF7F2',
          100: '#FFEFE5',
          200: '#FFDAC2',
          300: '#FFBF94',
          400: '#FB9355',
          500: '#D9531E', // African Ember / Athletic Vitality
          600: '#C03D0D',
          700: '#992E0B',
          800: '#79250C',
          900: '#591C0C',
        },
        rift: {
          50: '#F2F8F5',
          100: '#DEEFE7',
          200: '#BDDFD0',
          300: '#91C8B2',
          400: '#5FA98F',
          500: '#1F4E38', // Rift Valley Highland Green
          600: '#19412F',
          700: '#153627',
          800: '#112B20',
          900: '#0E2219',
          950: '#07130E',
        },
        savannah: {
          50: '#FCFBF8',
          100: '#FAF8F5', // Warm Ivory
          200: '#F3EFE6', // Savannah Sand
          300: '#E7DFD0',
          400: '#D6C9B3',
          500: '#BDB098',
          600: '#A1937A',
          700: '#837560',
          800: '#645847',
          900: '#473E32',
        },
        obsidian: {
          DEFAULT: '#111213',
          card: '#18191B',
          muted: '#232529',
          border: '#2E3238',
        },
        trust: {
          verified: {
            text: '#065F46',
            bg: '#ECFDF5',
            border: '#A7F3D0',
            dot: '#10B981',
          },
          updated: {
            text: '#075985',
            bg: '#F0F9FF',
            border: '#BAE6FD',
            dot: '#0284C7',
          },
          unverified: {
            text: '#92400E',
            bg: '#FFFBEB',
            border: '#FDE68A',
            dot: '#D97706',
          },
          unverifiable: {
            text: '#991B1B',
            bg: '#FEF2F2',
            border: '#FECACA',
            dot: '#DC2626',
          },
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['monospace'],
      },
      boxShadow: {
        'african-warm': '0 10px 30px -10px rgba(200, 75, 49, 0.15), 0 4px 12px -2px rgba(229, 169, 60, 0.1)',
        'african-elevated': '0 20px 40px -15px rgba(17, 18, 19, 0.08), 0 0 0 1px rgba(200, 75, 49, 0.08)',
        'trust-glow': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
