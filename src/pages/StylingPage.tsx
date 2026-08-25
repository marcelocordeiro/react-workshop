import { Box, Typography, Divider } from '@mui/material';
import StylingDemo from '../components/15-styling/StylingDemo';

const StylingPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        15. Styling
      </Typography>
      <Typography paragraph>
        There is no single way to style a React app, and most real codebases mix
        two or three. The three you will meet here are the `sx` prop, MUI's
        `styled()` helper, and the `styled-components` library. All three end up
        generating scoped CSS class names at runtime — you never write a global
        stylesheet by hand.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <StylingDemo />
    </Box>
  );
};

export default StylingPage;
