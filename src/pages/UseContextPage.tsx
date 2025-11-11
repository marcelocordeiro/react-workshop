import { Outlet } from 'react-router-dom';
import { Box, Typography, Divider } from '@mui/material';

const UseContextPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        5. useContext Hook
      </Typography>
      <Typography paragraph>
        The `useContext` hook allows you to share state across your component
        tree without manually passing props down at every level. Below are two
        examples demonstrating its usage.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Outlet />
    </Box>
  );
};

export default UseContextPage;
