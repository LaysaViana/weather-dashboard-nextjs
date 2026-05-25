import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import {
  useSearchHistory,
} from '@/hooks/useSearchHistory';

const mockCity = {
  id: 1,
  name: 'Goiânia',
  country: 'Brasil',
  latitude:
    -16.6864,
  longitude:
    -49.2643,
};

function TestComponent() {
  const {
    history,
    addCity,
    removeCity,
    clearHistory,
  } =
    useSearchHistory();

  return (
    <div>
      <span data-testid="count">
        {history.length}
      </span>

      <button
        onClick={() => {
          addCity(
            mockCity,
          );
        }}
      >
        add
      </button>

      <button
        onClick={() => {
          removeCity(
            1,
          );
        }}
      >
        remove
      </button>

      <button
        onClick={() => {
          clearHistory();
        }}
      >
        clear
      </button>
    </div>
  );
}

describe(
  'useSearchHistory',
  () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it(
      'should add a city to history',
      () => {
        render(
          <TestComponent />,
        );

        fireEvent.click(
          screen.getByText(
            'add',
          ),
        );

        expect(
          screen.getByTestId(
            'count',
          ),
        ).toHaveTextContent(
          '1',
        );
      },
    );

    it(
      'should remove a city from history',
      () => {
        render(
          <TestComponent />,
        );

        fireEvent.click(
          screen.getByText(
            'add',
          ),
        );

        fireEvent.click(
          screen.getByText(
            'remove',
          ),
        );

        expect(
          screen.getByTestId(
            'count',
          ),
        ).toHaveTextContent(
          '0',
        );
      },
    );

    it(
      'should clear history',
      () => {
        render(
          <TestComponent />,
        );

        fireEvent.click(
          screen.getByText(
            'add',
          ),
        );

        fireEvent.click(
          screen.getByText(
            'clear',
          ),
        );

        expect(
          screen.getByTestId(
            'count',
          ),
        ).toHaveTextContent(
          '0',
        );
      },
    );
  },
);