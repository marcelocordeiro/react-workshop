import { Typography, Divider, Box } from '@mui/material';
import SimpleForm from '../components/08-react-hook-form/SimpleForm';

function ReactHookFormPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        8. Forms with React Hook Form
      </Typography>
      <Typography paragraph>
        `react-hook-form` is a powerful library for managing forms in React. It helps with validation, submission, and managing form state with minimal re-renders.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <SimpleForm />
    </Box>
  );
}

export default ReactHookFormPage;
