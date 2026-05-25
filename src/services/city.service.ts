import { City } from '@/types/city.types';

interface SearchCitiesParams {
  query: string;

  signal?: AbortSignal;

  count?: number;
}

export async function searchCities({
  query,
  signal,
  count = 5,
}: SearchCitiesParams): Promise<City[]> {
  const response = await fetch(
    `/api/cities?query=${encodeURIComponent(query)}&count=${count}`,
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar cidades');
  }

  return response.json();
}
