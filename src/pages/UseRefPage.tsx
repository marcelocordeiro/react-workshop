import { Box, Typography, Divider } from '@mui/material';
import UseRefDemo from '../components/11-useRef/UseRefDemo';

const UseRefPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        11. useRef Hook
      </Typography>
      <Typography paragraph>
        `useRef` returns a mutable box whose `.current` survives re-renders.
        Changing it does <b>not</b> trigger a render — that is the whole point.
        Use it to hold a DOM element, or to keep bookkeeping values (timer ids,
        subscriptions, the previous value of something) out of state.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <UseRefDemo />
    </Box>
  );
};

export default UseRefPage;
