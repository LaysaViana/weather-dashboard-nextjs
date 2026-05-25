import { Box, Paper, Skeleton, Stack } from '@mui/material';

import styles from './LoadingState.module.css';

export default function LoadingState() {
  return (
    <Paper
      elevation={0}
      className={styles.container}
      role="status"
      aria-live="polite"
      aria-label="Carregando informações climáticas"
      sx={{
        borderColor: 'divider',

        backgroundColor: 'background.paper',
      }}
    >
      <Box className={styles.header}>
        <div>
          <Skeleton variant="text" width={180} height={40} aria-hidden="true" />

          <Skeleton variant="text" width={120} height={24} aria-hidden="true" />
        </div>
      </Box>

      <Box className={styles.hero}>
        <Skeleton
          variant="circular"
          width={72}
          height={72}
          aria-hidden="true"
        />

        <div className={styles.heroContent}>
          <Skeleton variant="text" width={140} height={72} aria-hidden="true" />

          <Skeleton variant="text" width={110} height={28} aria-hidden="true" />
        </div>
      </Box>

      <Box className={styles.metrics}>
        <Skeleton
          variant="rounded"
          className={styles.metricCard}
          aria-hidden="true"
        />

        <Skeleton
          variant="rounded"
          className={styles.metricCard}
          aria-hidden="true"
        />
      </Box>

      <Stack spacing={2}>
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            height={56}
            aria-hidden="true"
          />
        ))}
      </Stack>
    </Paper>
  );
}
