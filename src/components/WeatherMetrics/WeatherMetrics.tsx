import { Typography } from '@mui/material';
import styles from './WeatherMetrics.module.css';

interface WeatherMetricsProps {
  max: number;
  min: number;
  windSpeed: number;
}

export default function WeatherMetrics({
  max,
  min,
  windSpeed,
}: WeatherMetricsProps) {
  const metrics = [
    {
      label: 'Temperatura máxima',
      value: `${max}°`,
    },
    {
      label: 'Temperatura mínima',
      value: `${min}°`,
    },
    {
      label: 'Velocidade do vento',
      value: `${windSpeed} km/h`,
    },
  ];

  return (
    <div className={styles.grid}>
      {metrics.map((metric) => (
        <div key={metric.label} className={styles.metricCard}>
          <Typography component="p" className={styles.label}>
            {metric.label}
          </Typography>

          <Typography component="p" className={styles.value}>
            {metric.value}
          </Typography>
        </div>
      ))}
    </div>
  );
}
