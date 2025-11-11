import { Typography, Divider, Box } from '@mui/material';

import ThemeSwitcher from '../components/05-useContext/ThemeSwitcher';

const ThemeSwitcherPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        5.2 Theme Switcher Example
      </Typography>
      <Typography paragraph>
        `useContext` allows you to subscribe to a context and consume its value
        without prop drilling. Here, we use it to toggle the theme.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <ThemeSwitcher />
    </Box>
  );
};

export default ThemeSwitcherPage;
