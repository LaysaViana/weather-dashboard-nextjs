import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import { Button, IconButton, Paper, Typography } from '@mui/material';

import { City } from '@/types/city.types';

import { handleKeyboardSelect } from '@/utils/keyboard';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  cities: City[];

  onLoadMore: () => void;

  onSelectCity?: (city: City) => void;

  selectedCityId?: number;
}

export default function SearchResults({
  cities,
  onLoadMore,
  onSelectCity,
  selectedCityId,
}: SearchResultsProps) {
  const hasResults = cities.length > 0;

  return (
    <div className={styles.container} aria-live="polite">
      <div className={styles.header}>
        <Typography
          component="h2"
          className={styles.title}
          color="text.primary"
        >
          Resultados encontrados:
        </Typography>

        <Typography
          component="span"
          className={styles.count}
          color="text.secondary"
        >
          ({cities.length})
        </Typography>
      </div>

      {!hasResults && (
        <Paper
          elevation={0}
          className={styles.emptyState}
          sx={{
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            width: '100%',
            minHeight: 320,
            display: 'flex',
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
            Nenhuma cidade encontrada
          </Typography>

          <Typography
            component="p"
            className={styles.emptyText}
            color="text.secondary"
          >
            Não encontramos resultados para sua busca. Tente pesquisar usando
            outro nome ou termo.
          </Typography>
        </Paper>
      )}

      {hasResults && (
        <>
          <div
            className={`${styles.resultsList} ${
              cities.length > 5 ? styles.scrollable : ''
            }`}
          >
            {cities.map((city) => (
              <Paper
                key={city.id}
                elevation={0}
                role="button"
                tabIndex={0}
                aria-label={`Selecionar ${city.name}`}
                aria-pressed={selectedCityId === city.id}
                onClick={() => onSelectCity?.(city)}
                onKeyDown={(event) =>
                  handleKeyboardSelect(event, () => onSelectCity?.(city))
                }
                className={`${styles.card} ${
                  selectedCityId === city.id ? styles.selectedCard : ''
                }`}
                sx={{
                  borderColor:
                    selectedCityId === city.id ? 'primary.main' : 'divider',

                  backgroundColor:
                    selectedCityId === city.id
                      ? 'system.selection'
                      : 'background.paper',

                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cityInfo}>
                    <Typography
                      component="h3"
                      className={styles.cityName}
                      color="text.primary"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {city.name}
                    </Typography>

                    <Typography
                      component="p"
                      className={styles.country}
                      color="text.secondary"
                    >
                      {city.country}
                    </Typography>

                    <Typography
                      component="p"
                      className={styles.coordinates}
                      color="text.secondary"
                    >
                      <LocationOnOutlinedIcon
                        sx={{
                          color: 'primary.main',

                          fontSize: 14,

                          mr: 0.5,
                        }}
                      />
                      {city.latitude.toFixed(4)}, {city.longitude.toFixed(4)}
                    </Typography>
                  </div>

                  <IconButton
                    aria-label={`Selecionar ${city.name}`}
                    className={styles.selectButton}
                    onClick={() => onSelectCity?.(city)}
                  >
                    <ChevronRightRoundedIcon
                      sx={{
                        color: 'text.secondary',
                      }}
                    />
                  </IconButton>
                </div>
              </Paper>
            ))}
          </div>

          {cities.length >= 5 && (
            <Button
              onClick={onLoadMore}
              endIcon={<KeyboardArrowDownRoundedIcon />}
              className={styles.loadMoreButton}
            >
              Ver mais resultados
            </Button>
          )}
        </>
      )}
    </div>
  );
}
