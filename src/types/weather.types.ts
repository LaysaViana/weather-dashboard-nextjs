export interface ForecastDay {
  day: string;
  date: string;

  weatherCode: number;

  temperatureMax: number;
  temperatureMin: number;
}

export interface Weather {
  cityName: string;
  country: string;

  temperature: number;
  temperatureMax: number;
  temperatureMin: number;

  windSpeed: number;
  condition: string;

  weatherCode: number;

  latitude: number;
  longitude: number;

  humidity: number;
  apparentTemperature: number;

  forecast: ForecastDay[];
}
