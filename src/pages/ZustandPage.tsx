import { Box, Typography, Divider } from '@mui/material';
import ZustandDemo from '../components/17-zustand/ZustandDemo';

const ZustandPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        17. Global State with Zustand
      </Typography>
      <Typography paragraph>
        `useContext` (chapter 5) shares state by wrapping the tree in a
        provider. A store library like Zustand keeps state <b>outside</b> the
        React tree instead: there is no provider, components subscribe to the
        exact slice they read, and the store can be used from non-React code.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <ZustandDemo />
    </Box>
  );
};

export default ZustandPage;
