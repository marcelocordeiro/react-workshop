import { Typography, Divider, Box } from '@mui/material';
import { SimpleContextExample } from '../components/05-useContext/SimpleContextExample';
// import { SimpleContextExample } from '../components/05-useContext/SimpleContextInitialExample';

const SimpleContextPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        5.1 Simple useContext Example
      </Typography>
      <Typography paragraph>
        This is a simpler example demonstrating how `useContext` works. The
        parent component provides a global state, and child components can
        update and display it without prop drilling.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <SimpleContextExample />
    </Box>
  );
};

export default SimpleContextPage;
