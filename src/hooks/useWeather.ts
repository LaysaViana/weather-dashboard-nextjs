'use client';

import { useEffect, useState } from 'react';

import { City } from '@/types/city.types';

import { Weather } from '@/types/weather.types';

import { searchWeather } from '@/services/weather.service';

interface UseWeatherReturn {
  weather: Weather | null;
  loading: boolean;
  error: string | null;
}

const WEATHER_ERROR_MESSAGE = 'Não foi possível carregar o clima.';

export function useWeather(city: City | null): UseWeatherReturn {
  const [weather, setWeather] = useState<Weather | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      return;
    }

    const currentCity = city;

    const controller = new AbortController();

    async function fetchWeather() {
      try {
        setLoading(true);

        setError(null);

        const data = await searchWeather({
          latitude: currentCity.latitude,

          longitude: currentCity.longitude,

          signal: controller.signal,
        });

        setWeather({
          ...data,

          cityName: currentCity.name,

          country: currentCity.country,
        });
      } catch (error) {
        const isAbortError =
          error instanceof DOMException && error.name === 'AbortError';

        if (isAbortError) {
          return;
        }

        setWeather(null);

        setError(WEATHER_ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    }

    void fetchWeather();

    return () => {
      controller.abort();
    };
  }, [city]);

  if (!city) {
    return {
      weather: null,
      loading: false,
      error: null,
    };
  }

  return {
    weather,
    loading,
    error,
  };
}
