import { Typography, Divider, Box } from '@mui/material';
import UserListWithReactQuery from '../components/07-react-query/UserListWithReactQuery';

function ReactQueryPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        7. React Query for Data Fetching
      </Typography>
      <Typography paragraph>
        `react-query` simplifies data fetching, caching, and synchronization. Compare this to the `useEffect` example to see how much boilerplate is removed.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <UserListWithReactQuery />
    </Box>
  );
}

export default ReactQueryPage;
