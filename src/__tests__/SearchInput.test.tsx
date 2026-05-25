import { fireEvent, render, screen } from '@testing-library/react';

import SearchInput from '@/components/SearchInput/SearchInput';

describe('SearchInput', () => {
  it('should render input value', () => {
    render(<SearchInput value="Goiânia" onChange={jest.fn()} />);

    expect(screen.getByDisplayValue('Goiânia')).toBeInTheDocument();
  });

  it('should call onChange when typing', () => {
    const onChange = jest.fn();

    render(<SearchInput value="" onChange={onChange} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, {
      target: {
        value: 'Goiânia',
      },
    });

    expect(onChange).toHaveBeenCalledWith('Goiânia');
  });

  it('should clear input', () => {
    const onChange = jest.fn();

    render(<SearchInput value="Goiânia" onChange={onChange} />);

    fireEvent.click(screen.getByLabelText('Limpar busca'));

    expect(onChange).toHaveBeenCalledWith('');
  });

  it('should render loading state', () => {
    render(<SearchInput value="Goiânia" loading onChange={jest.fn()} />);

    expect(screen.getByLabelText('Carregando cidades')).toBeInTheDocument();
  });
});
