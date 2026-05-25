'use client';

import { useEffect, useState } from 'react';

import { searchCities } from '@/services/city.service';

import { City, SearchStatus } from '@/types/city.types';

interface UseCitySearchReturn {
  cities: City[];

  status: SearchStatus;

  errorMessage: string | null;
}

const MIN_QUERY_LENGTH = 2;

export function useCitySearch(query: string, count = 5): UseCitySearchReturn {
  const [cities, setCities] = useState<City[]>([]);
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    const controller = new AbortController();

    async function fetchCities() {
      if (trimmedQuery.length < MIN_QUERY_LENGTH) {
        setCities([]);

        setStatus('idle');

        setErrorMessage(null);

        return;
      }

      try {
        setStatus('loading');

        setErrorMessage(null);

        const result = await searchCities({
          query: trimmedQuery,

          signal: controller.signal,

          count,
        });

        if (result.length === 0) {
          setCities([]);
          setStatus('empty');
          return;
        }

        setCities(result);

        setStatus('success');
      } catch (error) {
        const isAbortError =
          error instanceof DOMException && error.name === 'AbortError';

        if (isAbortError) {
          return;
        }

        setCities([]);

        setStatus('error');

        setErrorMessage('API indisponível. Tente novamente.');
      }
    }

    void fetchCities();

    return () => {
      controller.abort();
    };
  }, [query, count]);

  return {
    cities,
    status,
    errorMessage,
  };
}
