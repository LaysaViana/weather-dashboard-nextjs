export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

export interface CitySearchResponse {
  results?: City[];
}

export type SearchStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';
