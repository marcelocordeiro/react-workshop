import { Box, Typography, Divider } from '@mui/material';
import CustomHooksDemo from '../components/12-custom-hooks/CustomHooksDemo';

const CustomHooksPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        12. Custom Hooks
      </Typography>
      <Typography paragraph>
        A custom hook is a plain function that calls other hooks and whose name
        starts with `use`. It is how you extract stateful logic out of a
        component so it can be reused and tested on its own — the frontend
        equivalent of pulling logic out of a controller into a service.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <CustomHooksDemo />
    </Box>
  );
};

export default CustomHooksPage;
