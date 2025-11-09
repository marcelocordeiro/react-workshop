import { Typography, Divider, Box } from '@mui/material';
import Greeting from '../components/02-Props/Greeting';

function PropsPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        2. Props
      </Typography>
      <Typography paragraph>
        Props (short for properties) are how you pass data from a parent component to a child component. They are read-only.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Greeting name="Ana">
        <p>This is a message passed as a child.</p>
      </Greeting>
      <Greeting name="Marcelo">
        <button>Click me!</button>
      </Greeting>
    </Box>
  );
}

export default PropsPage;
