import LocationCityIcon from '@mui/icons-material/LocationCity';

import { Paper, Typography } from '@mui/material';

import styles from './EmptyState.module.css';

interface EmptyStateProps {
  fullWidth?: boolean;
}

export default function EmptyState({ fullWidth = false }: EmptyStateProps) {
  return (
    <Paper
      elevation={0}
      className={styles.container}
      sx={{
        width: fullWidth ? '100%' : undefined,

        borderColor: 'divider',

        backgroundColor: 'background.paper',
      }}
    >
      <LocationCityIcon
        aria-hidden="true"
        className={styles.icon}
        sx={{
          color: 'text.secondary',
        }}
      />

      <Typography component="h2" variant="h3" color="text.primary">
        Nenhuma cidade selecionada
      </Typography>

      <Typography
        component="p"
        variant="body1"
        color="text.secondary"
        className={styles.description}
      >
        Pesquise uma cidade para visualizar informações climáticas.
      </Typography>
    </Paper>
  );
}
