import { Weather } from '@/types/weather.types';

interface SearchWeatherParams {
  latitude: number;

  longitude: number;

  signal?: AbortSignal;
}

interface OpenMeteoForecastResponse {
  current: {
    temperature_2m: number;

    apparent_temperature: number;

    relative_humidity_2m: number;

    wind_speed_10m: number;

    weather_code: number;
  };

  daily: {
    time: string[];

    weather_code: number[];

    temperature_2m_max: number[];

    temperature_2m_min: number[];
  };
}

const WEATHER_CODE_MAP: Record<number, string> = {
  0: 'Céu limpo',

  1: 'Predominantemente limpo',
  2: 'Parcialmente nublado',
  3: 'Nublado',

  45: 'Neblina',
  48: 'Neblina congelante',

  51: 'Garoa leve',
  53: 'Garoa moderada',
  55: 'Garoa intensa',

  56: 'Garoa congelante leve',
  57: 'Garoa congelante intensa',

  61: 'Chuva leve',
  63: 'Chuva moderada',
  65: 'Chuva forte',

  66: 'Chuva congelante leve',
  67: 'Chuva congelante forte',

  71: 'Neve leve',
  73: 'Neve moderada',
  75: 'Neve intensa',

  77: 'Granizo de neve',

  80: 'Pancadas de chuva leves',
  81: 'Pancadas moderadas',
  82: 'Pancadas fortes',

  85: 'Pancadas leves de neve',
  86: 'Pancadas fortes de neve',

  95: 'Tempestade',

  96: 'Tempestade com granizo leve',
  99: 'Tempestade com granizo forte',
};

const LOCALE = 'pt-BR';

const UNKNOWN_CONDITION = 'Indefinido';

export async function searchWeather({
  latitude,
  longitude,
  signal,
}: SearchWeatherParams): Promise<Omit<Weather, 'cityName' | 'country'>> {
  const response = await fetch(
    `/api/weather?latitude=${latitude}&longitude=${longitude}`,
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar clima');
  }

  const data: OpenMeteoForecastResponse = await response.json();

  const formatter = new Intl.DateTimeFormat(LOCALE, {
    weekday: 'short',
  });

  const forecast = data.daily.time.map((rawDate, index) => {
    const [year, month, day] = rawDate.split('-').map(Number);

    const date = new Date(year, month - 1, day);

    return {
      day: index === 0 ? 'Hoje' : formatter.format(date).replace('.', ''),

      date: date.toLocaleDateString(LOCALE, {
        day: '2-digit',

        month: '2-digit',
      }),

      weatherCode: data.daily.weather_code[index],

      temperatureMax: data.daily.temperature_2m_max[index],

      temperatureMin: data.daily.temperature_2m_min[index],
    };
  });

  const currentWeatherCode = data.current.weather_code;

  return {
    temperature: data.current.temperature_2m,

    apparentTemperature: data.current.apparent_temperature,

    humidity: data.current.relative_humidity_2m,

    windSpeed: data.current.wind_speed_10m,

    weatherCode: currentWeatherCode,

    condition: WEATHER_CODE_MAP[currentWeatherCode] ?? UNKNOWN_CONDITION,

    temperatureMax: data.daily.temperature_2m_max[0],

    temperatureMin: data.daily.temperature_2m_min[0],

    latitude,
    longitude,

    forecast,
  };
}
