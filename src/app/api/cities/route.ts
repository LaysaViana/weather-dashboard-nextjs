import { NextRequest, NextResponse } from 'next/server';

import { API_URLS } from '@/constants/api.constants';

const MIN_QUERY_LENGTH = 2;

const DEFAULT_COUNT = 5;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query');

  const count =
    request.nextUrl.searchParams.get('count') ?? DEFAULT_COUNT.toString();

  const trimmedQuery = query?.trim();

  if (!trimmedQuery || trimmedQuery.length < MIN_QUERY_LENGTH) {
    return NextResponse.json([]);
  }

  try {
    const response = await fetch(
      `${API_URLS.openMeteo.geocoding}/search?name=${encodeURIComponent(
        trimmedQuery,
      )}&count=${count}&language=pt&format=json`,
      {
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }

    const data = await response.json();

    return NextResponse.json(data.results ?? []);
  } catch {
    return NextResponse.json(
      {
        message: 'Erro ao buscar cidades',
      },
      {
        status: 500,
      },
    );
  }
}
