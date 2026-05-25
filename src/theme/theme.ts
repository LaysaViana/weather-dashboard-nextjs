import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
    },

    secondary: {
      main: '#38BDF8',
    },

    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    },

    divider: '#E2E8F0',

    weather: {
      sunny: '#F59E0B',
      partlyCloudy: '#60A5FA',
      cloudy: '#64748B',
      fog: '#94A3B8',
      drizzle: '#38BDF8',
      freezingDrizzle: '#0EA5E9',
      rain: '#2563EB',
      heavyRain: '#1D4ED8',
      freezingRain: '#1E40AF',
      snow: '#7DD3FC',
      snowGrains: '#BAE6FD',
      snowShowers: '#38BDF8',
      thunderstorm: '#334155',
      thunderstormHail: '#1E293B',
    },

    metrics: {
      temperature: '#F59E0B',
      wind: '#38BDF8',
      humidity: '#2563EB',
      location: '#2563EB',
    },

    system: {
      warning: '#F59E0B',
      neutral: '#64748B',
      pageBackground: '#F4F7FB',
      countryText: '#334155',
      detailText: '#475569',
      selectedBackground: '#EFF6FF',
    },
  },

  typography: {
    fontFamily: 'var(--font-geist-sans)',

    h1: {
      fontSize: '2.5rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
    },

    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },

    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },

    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },

    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.5,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 16,
  },
});
