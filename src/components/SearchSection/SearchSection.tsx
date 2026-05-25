import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/material/Typography';

import styles from './SearchSection.module.css';

export default function SearchSection() {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <SearchRoundedIcon
          className={styles.icon}
          sx={{
            color: 'primary.main',
          }}
        />

        <Typography
          component="h1"
          className={styles.title}
          color="text.primary"
        >
          Buscar cidade
        </Typography>
      </div>

      <Typography
        component="p"
        className={styles.subtitle}
        color="text.secondary"
      >
        Pesquise uma cidade para consultar a previsão do tempo.
      </Typography>
    </div>
  );
}
