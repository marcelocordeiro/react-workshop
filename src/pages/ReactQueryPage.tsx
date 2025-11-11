import { Typography, Divider, Box } from '@mui/material';
// import UserListWithReactQuery from '../components/09-react-query/UserListWithReactQueryInitial';
import UserListWithReactQuery from '../components/09-react-query/UserListWithReactQuery';

const ReactQueryPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        9. React Query for Data Fetching
      </Typography>
      <Typography paragraph>
        `react-query` simplifies data fetching, caching, and synchronization.
        Compare this to the `useEffect` example to see how much boilerplate is
        removed.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <UserListWithReactQuery />
    </Box>
  );
};

export default ReactQueryPage;
