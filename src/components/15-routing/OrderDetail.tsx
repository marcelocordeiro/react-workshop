import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Button, Typography } from '@mui/material';
import { ORDERS } from './orders';

/**
 * `useParams` reads the dynamic segment declared in the route
 * (`orders/:orderId`). It is always `string | undefined` — the router cannot
 * know the URL is well-formed, so you validate, exactly like a path variable
 * arriving as a raw String on a controller method.
 */
const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = ORDERS.find((candidate) => candidate.id === orderId);

  if (!order) {
    return (
      <Box>
        <Alert severity="warning">No order found for id “{orderId}”.</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/routing/orders')}>
          Back to orders
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order #{order.id}
      </Typography>
      <Typography>Customer: {order.customer}</Typography>
      <Typography>Status: {order.status}</Typography>
      <Typography>Total: {order.total.toFixed(2)}</Typography>

      {/* `navigate(-1)` is browser-history "back", not a hardcoded route. */}
      <Button sx={{ mt: 2, mr: 1 }} onClick={() => navigate(-1)}>
        Go back
      </Button>
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => navigate('/routing/orders?status=pending')}
      >
        Jump to pending orders
      </Button>
    </Box>
  );
};

export default OrderDetail;
