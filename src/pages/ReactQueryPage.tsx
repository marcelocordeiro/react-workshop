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
        React Query (`@tanstack/react-query`) treats server data as a cache
        rather than as component state: it handles caching, deduplication,
        retries, staleness and background refresh for you. Compare this to the
        `useEffect` example to see how much boilerplate disappears.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <UserListWithReactQuery />
    </Box>
  );
};

export default ReactQueryPage;
