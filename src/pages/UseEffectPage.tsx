import { Typography, Divider, Box } from '@mui/material';
import UserList from '../components/04-useEffect/UserList';

const UseEffectPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        4. useEffect Hook
      </Typography>
      <Typography paragraph>
        The `useEffect` hook lets you perform side effects, like fetching data.
        The empty dependency array `[]` makes it run only once on mount.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <UserList />
    </Box>
  );
};

export default UseEffectPage;
