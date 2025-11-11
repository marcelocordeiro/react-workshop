import { Typography, Divider, Box } from '@mui/material';
import UseMemoDemo from '../components/07-useMemo/UseMemoDemo';
// import UseMemoDemo from '../components/07-useMemo/UseMemoDemoFixed';

const UseMemoPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        7. useMemo Hook
      </Typography>
      <Typography paragraph>
        `useMemo` is used to memoize a calculated value. It re-runs the
        calculation only when one of its dependencies has changed, preventing
        expensive calculations on every render.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <UseMemoDemo />
    </Box>
  );
};

export default UseMemoPage;
