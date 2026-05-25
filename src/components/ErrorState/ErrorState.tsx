import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

import { Paper, Typography } from '@mui/material';

import styles from './ErrorState.module.css';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <Paper
      elevation={0}
      className={styles.container}
      sx={{
        borderColor: 'error.light',
        backgroundColor: 'background.paper',
      }}
    >
      <WarningAmberRoundedIcon
        aria-hidden="true"
        className={styles.icon}
        color="error"
      />

      <Typography component="h2" variant="h3" color="text.primary">
        Algo deu errado
      </Typography>

      <Typography
        component="p"
        variant="body1"
        color="text.secondary"
        className={styles.message}
      >
        {message}
      </Typography>
    </Paper>
  );
}
