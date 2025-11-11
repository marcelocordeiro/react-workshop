import { useContext } from 'react';
import { IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from './theme-context';

const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      Current Mode: {mode}
      <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
};

export default ThemeSwitcher;
