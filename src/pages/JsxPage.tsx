import { Typography, Divider, Box } from '@mui/material';
import Welcome from '../components/01-JSX/Welcome';

function JsxPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        1. JSX
      </Typography>
      <Typography paragraph>
        JSX is a syntax extension for JavaScript that looks like HTML. It allows you to write UI structures in a familiar way. You can embed any JavaScript expression within curly braces `{}`.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Welcome />
    </Box>
  );
}

export default JsxPage;
