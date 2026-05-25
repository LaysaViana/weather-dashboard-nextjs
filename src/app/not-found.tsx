import Link from 'next/link';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

import { Box, Button, Typography } from '@mui/material';

import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <Box
      component="main"
      className={styles.container}
      sx={{
        backgroundColor: 'system.pageBackground',
      }}
    >
      <WbSunnyRoundedIcon
        aria-hidden="true"
        className={styles.icon}
        sx={{
          color: 'weather.sunny',
        }}
      />

      <Typography component="h1" variant="h2" color="text.primary">
        Página não encontrada
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        className={styles.description}
      >
        Parece que esta previsão mudou de rota. Volte para a página inicial do
        Meteora.
      </Typography>

      <Link href="/">
        <Button variant="contained" size="large">
          Voltar ao início
        </Button>
      </Link>
    </Box>
  );
}
