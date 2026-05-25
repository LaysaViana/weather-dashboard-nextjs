import AirRoundedIcon from '@mui/icons-material/AirRounded';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import OpacityRoundedIcon from '@mui/icons-material/OpacityRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded';

import { Box, Typography } from '@mui/material';

import { Weather } from '@/types/weather.types';
import { getWeatherIcon } from '@/utils/weatherIcon';

import styles from './WeatherCard.module.css';

interface WeatherCardProps {
  weather: Weather;
}

type WeatherDetail = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

export default function WeatherCard({ weather }: WeatherCardProps) {
  const { icon: WeatherIcon, color } = getWeatherIcon(weather.weatherCode);

  const details: WeatherDetail[] = [
    {
      label: 'Sensação térmica',

      value: `${weather.apparentTemperature}°C`,

      icon: (
        <ThermostatRoundedIcon
          sx={{
            color: 'metrics.temperature',
          }}
        />
      ),
    },

    {
      label: 'Velocidade do vento',

      value: `${weather.windSpeed} km/h`,

      icon: (
        <AirRoundedIcon
          sx={{
            color: 'metrics.wind',
          }}
        />
      ),
    },

    {
      label: 'Condição climática',

      value: weather.condition,

      icon: (
        <CloudQueueRoundedIcon
          sx={{
            color,
          }}
        />
      ),
    },

    {
      label: 'Umidade do ar',

      value: `${weather.humidity}%`,

      icon: (
        <OpacityRoundedIcon
          sx={{
            color: 'metrics.humidity',
          }}
        />
      ),
    },

    {
      label: 'Latitude',

      value: weather.latitude.toFixed(4),

      icon: (
        <LocationOnOutlinedIcon
          sx={{
            color: 'metrics.location',
          }}
        />
      ),
    },

    {
      label: 'Longitude',

      value: weather.longitude.toFixed(4),

      icon: (
        <LocationOnOutlinedIcon
          sx={{
            color: 'metrics.location',
          }}
        />
      ),
    },
  ];

  return (
    <Box
      component="section"
      className={styles.container}
      aria-labelledby="weather-title"
      sx={{
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <Typography
            id="weather-title"
            component="h2"
            className={styles.cityName}
            color="text.primary"
          >
            {weather.cityName}
          </Typography>

          <Typography
            component="p"
            className={styles.country}
            sx={{
              color: 'system.countryText',
            }}
          >
            {weather.country}
          </Typography>

          <Typography
            component="p"
            className={styles.updated}
            color="text.secondary"
          >
            Atualizado agora
            <RefreshRoundedIcon
              sx={{
                ml: 1,

                fontSize: 16,
              }}
              aria-hidden="true"
            />
          </Typography>

          <div className={styles.weatherHero}>
            <WeatherIcon
              className={styles.weatherHeroIcon}
              style={{
                color,
              }}
              aria-hidden="true"
            />

            <div>
              <Typography
                component="p"
                variant="inherit"
                className={styles.temperature}
                color="text.primary"
              >
                {Math.round(weather.temperature)}
                °C
              </Typography>

              <Typography
                component="p"
                className={styles.condition}
                color="text.secondary"
              >
                {weather.condition}
              </Typography>
            </div>
          </div>

          <div className={styles.metricsCards}>
            <Box
              className={styles.metricCard}
              sx={{
                borderColor: 'divider',
              }}
            >
              <Typography className={styles.metricLabel} color="text.secondary">
                Temperatura máxima do dia
              </Typography>

              <Typography className={styles.metricValue} color="text.primary">
                {Math.round(weather.temperatureMax)}
                °C
              </Typography>
            </Box>

            <Box
              className={styles.metricCard}
              sx={{
                borderColor: 'divider',
              }}
            >
              <Typography className={styles.metricLabel} color="text.secondary">
                Temperatura mínima do dia
              </Typography>

              <Typography className={styles.metricValue} color="text.primary">
                {Math.round(weather.temperatureMin)}
                °C
              </Typography>
            </Box>
          </div>
        </div>

        <Box
          className={styles.rightSide}
          sx={{
            borderColor: 'divider',
          }}
        >
          {details.map((detail) => (
            <Box
              key={detail.label}
              className={styles.detailItem}
              sx={{
                borderColor: 'divider',
              }}
            >
              <Box
                className={styles.detailLabel}
                sx={{
                  color: 'system.detailText',
                }}
              >
                {detail.icon}

                {detail.label}
              </Box>

              <Typography
                component="span"
                className={styles.detailValue}
                color="text.primary"
              >
                {detail.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </div>
    </Box>
  );
}
