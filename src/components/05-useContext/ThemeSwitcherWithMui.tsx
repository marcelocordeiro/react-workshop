import { IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useColorScheme } from '@mui/material/styles';

const ThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      Current Mode: {mode}
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        color="inherit"
      >
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
};

export default ThemeSwitcher;
