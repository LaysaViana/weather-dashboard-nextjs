import { fireEvent, render, screen } from '@testing-library/react';

import SearchResults from '@/components/SearchResults/SearchResults';

const mockCities = [
  {
    id: 1,
    name: 'Goiânia',
    country: 'Brasil',
    latitude: -16.6864,
    longitude: -49.2643,
  },

  {
    id: 2,
    name: 'São Paulo',
    country: 'Brasil',
    latitude: -23.5505,
    longitude: -46.6333,
  },

  {
    id: 3,
    name: 'Rio de Janeiro',
    country: 'Brasil',
    latitude: -22.9068,
    longitude: -43.1729,
  },

  {
    id: 4,
    name: 'Curitiba',
    country: 'Brasil',
    latitude: -25.4284,
    longitude: -49.2733,
  },

  {
    id: 5,
    name: 'Brasília',
    country: 'Brasil',
    latitude: -15.7801,
    longitude: -47.9292,
  },
];

describe('SearchResults', () => {
  it('should render cities', () => {
    render(<SearchResults cities={mockCities} onLoadMore={jest.fn()} />);

    expect(screen.getByText('Goiânia')).toBeInTheDocument();

    expect(screen.getByText('São Paulo')).toBeInTheDocument();
  });

  it('should call onSelectCity when clicking card', () => {
    const onSelectCity = jest.fn();

    render(
      <SearchResults
        cities={mockCities}
        onLoadMore={jest.fn()}
        onSelectCity={onSelectCity}
      />,
    );

    fireEvent.click(
      screen.getAllByRole('button', {
        name: /Selecionar Goiânia/i,
      })[0],
    );

    expect(onSelectCity).toHaveBeenCalledTimes(1);

    expect(onSelectCity).toHaveBeenCalledWith(mockCities[0]);
  });

  it('should call onLoadMore', () => {
    const onLoadMore = jest.fn();

    render(<SearchResults cities={mockCities} onLoadMore={onLoadMore} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /Ver mais resultados/i,
      }),
    );

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should show empty state', () => {
    render(<SearchResults cities={[]} onLoadMore={jest.fn()} />);

    expect(screen.getByText('Nenhuma cidade encontrada')).toBeInTheDocument();
  });

  it('should not show load more button when cities are less than 5', () => {
    render(
      <SearchResults cities={mockCities.slice(0, 3)} onLoadMore={jest.fn()} />,
    );

    expect(
      screen.queryByRole('button', {
        name: /Ver mais resultados/i,
      }),
    ).not.toBeInTheDocument();
  });
});
