import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';

import { Box, Typography } from '@mui/material';

import SearchHistory from '../SearchHistory/SearchHistory';

import { City } from '@/types/city.types';

import styles from './Sidebar.module.css';

interface SidebarProps {
  history: City[];
  selectedCityId?: number;
  onSelectCity: (city: City) => void;
  onRemoveCity: (cityId: number) => void;
  onClearHistory: () => void;
}

export default function Sidebar({
  history,
  selectedCityId,
  onSelectCity,
  onRemoveCity,
  onClearHistory,
}: SidebarProps) {
  return (
    <Box
      component="aside"
      className={styles.sidebar}
      aria-label="Barra lateral"
      sx={{
        borderColor: 'divider',
      }}
    >
      <Box>
        <div className={styles.logoWrapper}>
          <CloudQueueRoundedIcon
            sx={{
              fontSize: 48,
              color: 'primary.main',
            }}
            aria-hidden="true"
          />

          <Typography
            component="h1"
            className={styles.logoText}
            color="text.primary"
          >
            Meteora
          </Typography>
        </div>

        <SearchHistory
          history={history}
          selectedCityId={selectedCityId}
          onSelectCity={onSelectCity}
          onRemoveCity={onRemoveCity}
          onClearHistory={onClearHistory}
        />
      </Box>
    </Box>
  );
}
