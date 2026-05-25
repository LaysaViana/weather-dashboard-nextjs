'use client';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { Box, Button, IconButton, Paper, Typography } from '@mui/material';

import { City } from '@/types/city.types';

import { handleKeyboardSelect } from '@/utils/keyboard';
import styles from './SearchHistory.module.css';

interface SearchHistoryProps {
  history?: City[];
  selectedCityId?: number;
  onSelectCity: (city: City) => void;
  onRemoveCity: (cityId: number) => void;
  onClearHistory: () => void;
}

export default function SearchHistory({
  history = [],
  selectedCityId,
  onSelectCity,
  onRemoveCity,
  onClearHistory,
}: SearchHistoryProps) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,

          flexWrap: 'wrap',

          gap: 1,
        }}
      >
        <Typography
          component="h2"
          className={styles.sectionTitle}
          color="text.primary"
        >
          Últimas pesquisas:
        </Typography>

        <Typography
          component="span"
          className={styles.historyCount}
          color="text.secondary"
        >
          ({history.length})
        </Typography>
      </Box>

      <div className={styles.historyList}>
        {history.length === 0 ? (
          <Box
            className={styles.emptyHistory}
            sx={{
              borderColor: 'divider',
              backgroundColor: 'background.default',
            }}
          >
            <LocationOnOutlinedIcon
              sx={{
                color: 'primary.main',
              }}
              className={styles.emptyIcon}
              aria-hidden="true"
            />

            <Typography
              component="h3"
              className={styles.emptyTitle}
              color="text.primary"
            >
              Sem histórico de pesquisa
            </Typography>

            <Typography
              component="p"
              className={styles.emptyText}
              color="text.secondary"
            >
              As cidades pesquisadas aparecerão aqui para acesso rápido.
            </Typography>
          </Box>
        ) : (
          history.map((city) => (
            <Paper
              key={city.id}
              elevation={0}
              className={`${styles.historyItem} ${
                selectedCityId === city.id ? styles.selectedItem : ''
              }`}
              onClick={() => onSelectCity(city)}
              role="button"
              tabIndex={0}
              aria-label={`Selecionar ${city.name}`}
              aria-pressed={selectedCityId === city.id}
              onKeyDown={(event) =>
                handleKeyboardSelect(event, () => onSelectCity(city))
              }
              sx={{
                borderColor:
                  selectedCityId === city.id ? 'primary.main' : 'divider',

                backgroundColor:
                  selectedCityId === city.id
                    ? 'action.selected'
                    : 'background.paper',

                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',

                  justifyContent: 'space-between',

                  alignItems: 'center',

                  width: '100%',

                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',

                    alignItems: 'center',

                    gap: 1.5,

                    minWidth: 0,
                  }}
                >
                  <LocationOnOutlinedIcon
                    sx={{
                      color: 'primary.main',

                      fontSize: 18,

                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />

                  <Typography
                    component="p"
                    className={styles.cityText}
                    color="text.primary"
                  >
                    <strong className={styles.cityName}>{city.name}</strong>

                    {city.admin1 ? `, ${city.admin1}` : ''}

                    {city.country ? `, ${city.country}` : ''}
                  </Typography>
                </Box>

                <IconButton
                  aria-label={`Remover ${city.name} do histórico`}
                  onClick={(event) => {
                    event.stopPropagation();

                    onRemoveCity(city.id);
                  }}
                  size="small"
                >
                  <CloseRoundedIcon
                    className={styles.closeIcon}
                    sx={{
                      color: 'text.secondary',

                      '&:hover': {
                        color: 'error.main',
                      },
                    }}
                  />
                </IconButton>
              </Box>
            </Paper>
          ))
        )}
      </div>

      {history.length > 0 && (
        <Button
          fullWidth
          variant="outlined"
          startIcon={<DeleteOutlineRoundedIcon />}
          className={styles.clearButton}
          onClick={onClearHistory}
          sx={{
            borderColor: 'divider',
          }}
        >
          Limpar histórico
        </Button>
      )}
    </Box>
  );
}
