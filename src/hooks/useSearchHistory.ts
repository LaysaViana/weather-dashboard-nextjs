'use client';

import { useState } from 'react';

import { City } from '@/types/city.types';

const STORAGE_KEY = 'weather-history';

const MAX_HISTORY_ITEMS = 5;

function getInitialHistory(): City[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored ? JSON.parse(stored) : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);

    return [];
  }
}

function saveHistory(history: City[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function useSearchHistory() {
  const [history, setHistory] = useState<City[]>(getInitialHistory);

  function addCity(city: City) {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== city.id);

      const updated = [city, ...filtered].slice(0, MAX_HISTORY_ITEMS);

      saveHistory(updated);

      return updated;
    });
  }

  function removeCity(cityId: number) {
    setHistory((prev) => {
      const updated = prev.filter((city) => city.id !== cityId);

      saveHistory(updated);

      return updated;
    });
  }

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);

    setHistory([]);
  }

  return {
    history,

    addCity,
    removeCity,
    clearHistory,
  };
}
