import { Box, Typography, Divider } from '@mui/material';
import AddUser from '../components/13-mutations/AddUser';

const MutationsPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        13. Mutations & Cache Invalidation
      </Typography>
      <Typography paragraph>
        `useQuery` is for reads. `useMutation` is for writes (POST / PUT /
        DELETE). React Query will not guess what a write invalidated, so after a
        successful mutation you tell the cache which queries are now stale with
        `queryClient.invalidateQueries`. This read/write split is the pattern
        you will touch most often in a real dashboard.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <AddUser />
    </Box>
  );
};

export default MutationsPage;
