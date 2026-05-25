import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';

import { Box, CircularProgress, Typography } from '@mui/material';

import styles from './AppBootLoader.module.css';

export default function AppBootLoader() {
  return (
    <Box
      role="status"
      aria-live="polite"
      className={styles.container}
      sx={{
        backgroundColor: 'system.pageBackground',
      }}
    >
      <div className={styles.brand}>
        <CloudQueueRoundedIcon
          aria-hidden="true"
          className={styles.logo}
          sx={{
            color: 'primary.main',
          }}
        />

        <Typography
          component="h1"
          variant="h2"
          className={styles.title}
          color="text.primary"
        >
          Meteora
        </Typography>
      </div>

      <CircularProgress size={42} thickness={4} color="primary" />

      <Typography
        component="p"
        variant="body2"
        className={styles.description}
        color="text.secondary"
      >
        Preparando sua experiência meteorológica...
      </Typography>
    </Box>
  );
}
