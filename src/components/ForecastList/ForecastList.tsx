'use client';

import { useState } from 'react';

import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';

import { Box, Button, Typography } from '@mui/material';

import { ForecastDay } from '@/types/weather.types';
import { getWeatherIcon } from '@/utils/weatherIcon';

import styles from './ForecastList.module.css';

interface ForecastListProps {
  forecast?: ForecastDay[];
}

export default function ForecastList({ forecast = [] }: ForecastListProps) {
  const [showNextWeek, setShowNextWeek] = useState(false);

  const currentWeek = forecast.slice(0, 7);

  const nextWeek = forecast.slice(7, 14);

  const visibleForecast = showNextWeek
    ? [...currentWeek, ...nextWeek]
    : currentWeek;

  return (
    <Box
      component="section"
      className={styles.container}
      aria-labelledby="forecast-title"
      sx={{
        backgroundColor: 'background.paper',

        borderColor: 'divider',
      }}
    >
      <Box
        className={styles.header}
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },

          alignItems: {
            xs: 'stretch',
            sm: 'center',
          },
        }}
      >
        <Typography
          id="forecast-title"
          component="h2"
          variant="h3"
          color="text.primary"
        >
          Previsão diária
        </Typography>

        {nextWeek.length > 0 && (
          <Button
            variant="outlined"
            className={styles.detailsButton}
            startIcon={
              <DateRangeRoundedIcon
                sx={{
                  color: 'primary.main',
                }}
              />
            }
            onClick={() => setShowNextWeek((prev) => !prev)}
            aria-expanded={showNextWeek}
            aria-label={
              showNextWeek ? 'Ocultar próxima semana' : 'Ver próxima semana'
            }
            sx={{
              width: {
                xs: '100%',
                sm: 'auto',
              },

              maxWidth: '100%',

              alignSelf: {
                xs: 'stretch',
                sm: 'flex-end',
              },

              overflow: 'hidden',

              whiteSpace: 'nowrap',

              textOverflow: 'ellipsis',
            }}
          >
            {showNextWeek ? 'Ocultar próxima semana' : 'Ver próxima semana'}
          </Button>
        )}
      </Box>

      <div
        className={styles.forecastGrid}
        role="list"
        aria-label="Previsão do tempo"
      >
        {visibleForecast.map((item, index) => {
          const { icon: WeatherIcon, color } = getWeatherIcon(item.weatherCode);

          return (
            <Box
              component="article"
              key={`${item.date}-${index}`}
              role="listitem"
              className={`${styles.forecastCard} ${
                index === 0 ? styles.active : ''
              }`}
              sx={{
                flexBasis: {
                  xs: 82,
                  sm: 92,
                  md: 106,
                },

                minWidth: {
                  xs: 82,
                  sm: 92,
                  md: 106,
                },

                minHeight: {
                  xs: 164,
                  sm: 180,
                  md: 196,
                },

                borderColor: index === 0 ? 'primary.main' : 'divider',

                backgroundColor:
                  index === 0
                    ? 'system.selectedBackground'
                    : 'background.paper',
              }}
              aria-label={`Previsão de ${
                item.day
              }, temperatura máxima ${Math.round(
                item.temperatureMax,
              )} graus e mínima ${Math.round(item.temperatureMin)} graus`}
            >
              <div className={styles.topContent}>
                <Typography
                  variant="body1"
                  className={styles.day}
                  color="text.primary"
                >
                  {item.day}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {item.date}
                </Typography>
              </div>

              <div className={styles.iconWrapper}>
                <WeatherIcon
                  className={styles.weatherIcon}
                  style={{
                    color,
                  }}
                  aria-hidden="true"
                />
              </div>

              <div className={styles.bottomContent}>
                <Typography className={styles.maxTemp} color="text.primary">
                  {Math.round(item.temperatureMax)}
                  °C
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {Math.round(item.temperatureMin)}
                  °C
                </Typography>
              </div>
            </Box>
          );
        })}
      </div>
    </Box>
  );
}
