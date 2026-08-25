import { Typography, Divider, Box } from '@mui/material';
import Counter from '../components/04-useState/Counter';

const UseStatePage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        4. useState Hook
      </Typography>
      <Typography paragraph>
        The `useState` hook lets you add a state variable to your component. It
        returns the current state and a function to update it.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Counter />
    </Box>
  );
};

export default UseStatePage;
