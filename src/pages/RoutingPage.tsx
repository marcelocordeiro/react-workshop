import { Link as RouterLink, Outlet } from 'react-router-dom';
import { Box, Divider, Link, Typography } from '@mui/material';

const RoutingPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        15. Routing
      </Typography>
      <Typography paragraph>
        The router maps a URL to a component tree. Routes nest, and each parent
        renders its matched child through `&lt;Outlet /&gt;` — the same idea as
        a layout template with a content placeholder. Everything below this
        divider is a nested route.
      </Typography>
      <Typography paragraph>
        <Link component={RouterLink} to="/routing/orders">
          Order list
        </Link>
        {' · '}
        <Link component={RouterLink} to="/routing/orders/1002">
          Deep link to order 1002
        </Link>
        {' · '}
        <Link component={RouterLink} to="/routing/orders/9999">
          A URL that does not resolve
        </Link>
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Outlet />
    </Box>
  );
};

export default RoutingPage;
