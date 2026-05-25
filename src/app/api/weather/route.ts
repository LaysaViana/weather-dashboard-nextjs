import { NextRequest, NextResponse } from 'next/server';

import { API_URLS } from '@/constants/api.constants';

const FORECAST_DAYS = 14;

export async function GET(request: NextRequest) {
  const latitude = request.nextUrl.searchParams.get('latitude');

  const longitude = request.nextUrl.searchParams.get('longitude');

  if (!latitude || !longitude) {
    return NextResponse.json(
      {
        message: 'Latitude e longitude são obrigatórios.',
      },
      {
        status: 400,
      },
    );
  }

  try {
    const searchParams = new URLSearchParams({
      latitude,

      longitude,

      current: [
        'temperature_2m',
        'apparent_temperature',
        'relative_humidity_2m',
        'wind_speed_10m',
        'weather_code',
      ].join(','),

      daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'].join(
        ',',
      ),

      timezone: 'auto',

      forecast_days: FORECAST_DAYS.toString(),
    });

    const response = await fetch(
      `${API_URLS.openMeteo.weather}/forecast?${searchParams.toString()}`,
      {
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather');
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        message: 'Erro ao buscar clima.',
      },
      {
        status: 500,
      },
    );
  }
}
