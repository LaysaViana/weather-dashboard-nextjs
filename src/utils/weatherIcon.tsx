import { IconType } from 'react-icons';

import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiRaindrops,
  WiSnow,
  WiSnowflakeCold,
  WiStormShowers,
  WiThunderstorm,
} from 'react-icons/wi';

import { WEATHER_ICON_COLORS } from '@/constants/weatherTheme';

interface WeatherIconData {
  icon: IconType;
  color: string;
}

export function getWeatherIcon(weatherCode: number): WeatherIconData {
  const weatherMap: Record<number, WeatherIconData> = {
    // céu limpo
    0: {
      icon: WiDaySunny,
      color: WEATHER_ICON_COLORS.sunny,
    },

    // predominantemente limpo
    1: {
      icon: WiDayCloudy,
      color: WEATHER_ICON_COLORS.partlyCloudy,
    },

    // parcialmente nublado
    2: {
      icon: WiDayCloudy,
      color: WEATHER_ICON_COLORS.partlyCloudy,
    },

    // nublado
    3: {
      icon: WiCloudy,
      color: WEATHER_ICON_COLORS.cloudy,
    },

    // neblina
    45: {
      icon: WiFog,
      color: WEATHER_ICON_COLORS.fog,
    },

    48: {
      icon: WiFog,
      color: WEATHER_ICON_COLORS.fog,
    },

    // garoa leve
    51: {
      icon: WiRaindrops,
      color: WEATHER_ICON_COLORS.drizzle,
    },

    // garoa moderada
    53: {
      icon: WiRaindrops,
      color: WEATHER_ICON_COLORS.drizzle,
    },

    // garoa intensa
    55: {
      icon: WiRaindrops,
      color: WEATHER_ICON_COLORS.freezingDrizzle,
    },

    // garoa congelante
    56: {
      icon: WiRain,
      color: WEATHER_ICON_COLORS.freezingDrizzle,
    },

    57: {
      icon: WiRain,
      color: WEATHER_ICON_COLORS.freezingDrizzle,
    },

    // chuva
    61: {
      icon: WiRain,
      color: WEATHER_ICON_COLORS.rain,
    },

    63: {
      icon: WiRain,
      color: WEATHER_ICON_COLORS.rain,
    },

    65: {
      icon: WiRain,
      color: WEATHER_ICON_COLORS.heavyRain,
    },

    // chuva congelante
    66: {
      icon: WiRain,
      color: WEATHER_ICON_COLORS.freezingRain,
    },

    67: {
      icon: WiRain,
      color: WEATHER_ICON_COLORS.freezingRain,
    },

    // neve
    71: {
      icon: WiSnow,
      color: WEATHER_ICON_COLORS.snow,
    },

    73: {
      icon: WiSnow,
      color: WEATHER_ICON_COLORS.snow,
    },

    75: {
      icon: WiSnow,
      color: WEATHER_ICON_COLORS.snow,
    },

    // flocos de neve
    77: {
      icon: WiSnowflakeCold,
      color: WEATHER_ICON_COLORS.snowGrains,
    },

    // pancadas de chuva
    80: {
      icon: WiStormShowers,
      color: WEATHER_ICON_COLORS.rain,
    },

    81: {
      icon: WiStormShowers,
      color: WEATHER_ICON_COLORS.heavyRain,
    },

    82: {
      icon: WiStormShowers,
      color: WEATHER_ICON_COLORS.heavyRain,
    },

    // pancadas de neve
    85: {
      icon: WiSnow,
      color: WEATHER_ICON_COLORS.snowShowers,
    },

    86: {
      icon: WiSnow,
      color: WEATHER_ICON_COLORS.snowShowers,
    },

    // tempestade
    95: {
      icon: WiThunderstorm,
      color: WEATHER_ICON_COLORS.thunderstorm,
    },

    // tempestade com granizo
    96: {
      icon: WiThunderstorm,
      color: WEATHER_ICON_COLORS.thunderstormHail,
    },

    99: {
      icon: WiThunderstorm,
      color: WEATHER_ICON_COLORS.thunderstormHail,
    },
  };

  return (
    weatherMap[weatherCode] ?? {
      icon: WiCloud,
      color: WEATHER_ICON_COLORS.default,
    }
  );
}
