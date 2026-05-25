import { Box, Link, Typography } from '@mui/material';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <Box
      component="footer"
      className={styles.footer}
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Dados meteorológicos por{' '}
        <Link
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="primary"
        >
          Open-Meteo
        </Link>
      </Typography>
    </Box>
  );
}
