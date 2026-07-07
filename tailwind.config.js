module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        garamond: ["Cormorant Garamond", "serif"],
        lato: ["Lato", "sans-serif"],
        clash: ["Clash Display", "sans-serif"],
        general: ["General Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          50: '#f0f7f2',
          100: '#dcefe2',
          200: '#b9dfc5',
          300: '#8fc7a3',
          400: '#5ea77a',
          500: '#3d8b5c',
          600: '#0E5D30',
          700: '#0a4a26',
          800: '#0a3d22',
          900: '#08331c',
        },
        brand: {
          bg: '#F8F7F4',
          surface: '#FFFFFF',
          alt: '#F3F1EC',
          border: '#E8E4DD',
          gold: '#A8916B',
          cream: '#F5F0E8',
          dark: '#2F4858',
          muted: '#8A8A8A',
          secondary: '#5F5F5F',
        },
        accent: {
          primary: '#0E5D30',
          secondary: '#6E8A7A',
          hover: '#0A4A26',
        }
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '600' }],
        'section': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'card': ['clamp(1.2rem, 2.5vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03)',
        'elevated': '0 4px 16px rgba(0, 0, 0, 0.05)',
        'modal': '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}