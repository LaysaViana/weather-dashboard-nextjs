import { SxProps, Theme } from '@mui/material';

export const pageContainerStyles: SxProps<Theme> = {
  minHeight: '100vh',
  width: '100%',
  maxWidth: '100vw',
  overflowX: 'hidden',
  boxSizing: 'border-box',
  background: `
    radial-gradient(
      circle at top left,
      rgba(37, 99, 235, 0.08),
      transparent 22%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(56, 189, 248, 0.06),
      transparent 24%
    ),
    linear-gradient(
      180deg,
      #f8fafc 0%,
      #eef4ff 100%
    )
  `,

  px: {
    xs: 1.5,
    sm: 2,
    md: 3,
  },

  py: 2,
};

export const appWrapperStyles: SxProps<Theme> = {
  width: '100%',
  minWidth: 0,
  maxWidth: '1440px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

export const layoutGridStyles: SxProps<Theme> = {
  display: 'grid',
  width: '100%',
  minWidth: 0,

  gridTemplateColumns: {
    xs: 'minmax(0, 1fr)',

    lg: '220px minmax(0, 1fr)',
  },

  gap: {
    xs: 2,
    md: 3.5,
  },

  flex: 1,
};

export const contentStackStyles: SxProps<Theme> = {
  width: '100%',
  minWidth: 0,
};

export const resultsWrapperStyles: SxProps<Theme> = {
  width: '100%',
  minWidth: 0,
};

export const weatherWrapperStyles: SxProps<Theme> = {
  minWidth: 0,
};

export const forecastWrapperStyles: SxProps<Theme> = {
  mt: 2,
};

export const contentGridStyles = (gridColumns: string) => ({
  display: 'grid',
  width: '100%',
  minWidth: 0,
  overflow: 'hidden',
  gridTemplateColumns: {
    xs: '1fr',
    xl: gridColumns,
  },

  gap: 2,
  alignItems: 'start',
});
