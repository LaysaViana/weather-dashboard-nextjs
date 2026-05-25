import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';

import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;

  loading?: boolean;

  onChange: (value: string) => void;
}

export default function SearchInput({
  value,
  loading = false,
  onChange,
}: SearchInputProps) {
  const showEndAdornment = value.length > 0;

  return (
    <Paper
      elevation={0}
      className={styles.container}
      sx={{
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <TextField
        fullWidth
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Buscar cidade"
        label="Buscar cidade"
        placeholder="Digite o nome da cidade..."
        variant="outlined"
        className={styles.inputRoot}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon
                  sx={{
                    color: 'text.secondary',
                  }}
                />
              </InputAdornment>
            ),

            endAdornment: showEndAdornment ? (
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress
                    size={20}
                    thickness={5}
                    aria-label="Carregando cidades"
                  />
                ) : (
                  <IconButton
                    aria-label="Limpar busca"
                    onClick={() => onChange('')}
                    size="small"
                  >
                    <CloseRoundedIcon
                      sx={{
                        color: 'text.secondary',

                        '&:hover': {
                          color: 'error.main',
                        },
                      }}
                    />
                  </IconButton>
                )}
              </InputAdornment>
            ) : undefined,
          },
        }}
      />
    </Paper>
  );
}
