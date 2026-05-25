'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Box, Stack } from '@mui/material';

import {
  appWrapperStyles,
  contentGridStyles,
  contentStackStyles,
  forecastWrapperStyles,
  layoutGridStyles,
  pageContainerStyles,
  resultsWrapperStyles,
  weatherWrapperStyles,
} from '@/app/home.styles';

import AppBootLoader from '@/components/AppBootLoader/AppBootLoader';
import EmptyState from '@/components/EmptyState/EmptyState';
import ErrorState from '@/components/ErrorState/ErrorState';
import Footer from '@/components/Footer/Footer';
import ForecastList from '@/components/ForecastList/ForecastList';
import LoadingState from '@/components/LoadingState/LoadingState';
import SearchInput from '@/components/SearchInput/SearchInput';
import SearchResults from '@/components/SearchResults/SearchResults';
import SearchSection from '@/components/SearchSection/SearchSection';
import Sidebar from '@/components/Sidebar/Sidebar';
import WeatherCard from '@/components/WeatherCard/WeatherCard';

import { INITIAL_RESULTS, SEARCH_DELAY } from '@/constants/search.constants';

import { useCitySearch } from '@/hooks/useCitySearch';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { useWeather } from '@/hooks/useWeather';

import { City } from '@/types/city.types';

export default function Home() {
  const [search, setSearch] = useState('');
  const [appReady, setAppReady] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [resultsCount, setResultsCount] = useState(INITIAL_RESULTS);

  const debouncedSearch = useDebounce(search, SEARCH_DELAY);

  const { cities, status, errorMessage } = useCitySearch(
    debouncedSearch,
    resultsCount,
  );

  const { history, addCity, removeCity, clearHistory } = useSearchHistory();

  const exactMatch = useMemo(() => {
    if (status !== 'success' || !debouncedSearch.trim()) {
      return null;
    }

    return (
      cities.find(
        (city) =>
          city.name.toLowerCase() === debouncedSearch.trim().toLowerCase(),
      ) ?? null
    );
  }, [cities, status, debouncedSearch]);

  const activeCity = selectedCity || exactMatch || null;

  const {
    weather,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather(activeCity);

  const selectedCityId = activeCity?.id;

  const isSearching = search.trim() !== '';

  const hasInvalidSearch =
    debouncedSearch.trim() !== '' && ['empty', 'error'].includes(status);

  const isHistoryView = !isSearching && !!selectedCity;

  const showInitialState = !isSearching && !selectedCity;

  const showLoading = status === 'loading';

  const showError = status === 'error';

  const showResults = isSearching && status === 'success';

  const showEmptyResults = isSearching && status === 'empty';

  const showWeather = !hasInvalidSearch && activeCity && weather;

  const showWeatherLoading = showLoading || weatherLoading;

  const hasWeatherPanel = !!activeCity && !hasInvalidSearch;

  const showWeatherError = !weatherLoading && !!weatherError;

  const showWeatherContent = !weatherLoading && !!showWeather;

  const contentGridColumns = useMemo(() => {
    if (!hasWeatherPanel) {
      return 'minmax(0, 1fr)';
    }

    if (isHistoryView) {
      return 'minmax(0, 1fr)';
    }

    return '340px minmax(0, 1fr)';
  }, [hasWeatherPanel, isHistoryView]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAppReady(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectCity = useCallback(
    (city: City, clearSearch = false) => {
      if (clearSearch) {
        setSearch('');
      }

      setResultsCount(INITIAL_RESULTS);

      setSelectedCity(city);

      addCity(city);
    },
    [addCity],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);

      setResultsCount(INITIAL_RESULTS);

      const trimmed = value.trim();

      if (!trimmed) {
        setSelectedCity(null);

        return;
      }

      const normalizedSearch = search.trim().toLowerCase();
      const normalizedValue = trimmed.toLowerCase();
      const isNewSearch = normalizedValue !== normalizedSearch;

      if (isNewSearch) {
        setSelectedCity(null);
      }
    },
    [search],
  );

  const handleLoadMore = useCallback(() => {
    setResultsCount((prev) => prev + 5);
  }, []);

  if (!appReady) {
    return (
      <Box
        sx={{
          ...pageContainerStyles,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AppBootLoader />
      </Box>
    );
  }

  return (
    <Box sx={pageContainerStyles}>
      <Box sx={appWrapperStyles}>
        <Box sx={layoutGridStyles}>
          <Sidebar
            history={history}
            selectedCityId={selectedCityId}
            onSelectCity={(city) => handleSelectCity(city, true)}
            onRemoveCity={removeCity}
            onClearHistory={clearHistory}
          />

          <Stack spacing={2.5} sx={contentStackStyles}>
            <SearchSection />

            <SearchInput
              value={search}
              onChange={handleSearchChange}
              loading={showLoading}
            />

            <Box sx={contentGridStyles(contentGridColumns)}>
              <Box sx={resultsWrapperStyles}>
                {showLoading && <LoadingState />}

                {showError && (
                  <ErrorState
                    message={errorMessage ?? 'Erro ao buscar cidades'}
                  />
                )}

                {showInitialState && <EmptyState fullWidth />}

                {showResults && (
                  <SearchResults
                    cities={cities}
                    selectedCityId={selectedCityId}
                    onSelectCity={handleSelectCity}
                    onLoadMore={handleLoadMore}
                  />
                )}

                {showEmptyResults && (
                  <SearchResults
                    cities={[]}
                    selectedCityId={selectedCityId}
                    onSelectCity={handleSelectCity}
                    onLoadMore={() => {}}
                  />
                )}
              </Box>

              {!hasInvalidSearch && activeCity && (
                <Box sx={weatherWrapperStyles}>
                  {showWeatherLoading && (
                    <Stack spacing={2}>
                      <LoadingState />
                      <LoadingState />
                    </Stack>
                  )}

                  {showWeatherError && <ErrorState message={weatherError} />}

                  {showWeatherContent && (
                    <>
                      <WeatherCard weather={weather} />

                      <Box sx={forecastWrapperStyles}>
                        <ForecastList forecast={weather.forecast} />
                      </Box>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </Stack>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}
