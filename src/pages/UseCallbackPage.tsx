import { Typography, Divider, Box } from '@mui/material';
// import UseCallbackDemo from '../components/08-useCallback/UseCallbackDemo';
import UseCallbackDemo from '../components/08-useCallback/UseCallbackDemoFixed';

const UseCallbackPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        8. useCallback Hook
      </Typography>
      <Typography paragraph>
        `useCallback` memoizes a function definition. When you pass callbacks to
        optimized child components that rely on reference equality to prevent
        unnecessary renders (e.g., `React.memo`), you can use `useCallback` to
        prevent the child from re-rendering.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <UseCallbackDemo />
    </Box>
  );
};

export default UseCallbackPage;
