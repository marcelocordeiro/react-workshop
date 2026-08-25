import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { ORDERS } from './orders';

/**
 * Two routing ideas in one screen:
 *   - `<Link>` navigates without a full page reload.
 *   - `useSearchParams` keeps filter state in the URL, so the filtered view
 *     is shareable and survives a refresh. Treat the URL as state you get
 *     for free.
 */
const OrderList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') ?? 'all';

  const visibleOrders =
    status === 'all'
      ? ORDERS
      : ORDERS.filter((order) => order.status === status);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Orders
      </Typography>

      <ToggleButtonGroup
        size="small"
        exclusive
        value={status}
        onChange={(_event, nextStatus: string | null) => {
          if (!nextStatus) return;
          // Replaces the query string — the component re-renders because the
          // URL changed, not because we called a setState.
          setSearchParams(nextStatus === 'all' ? {} : { status: nextStatus });
        }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="delivered">Delivered</ToggleButton>
        <ToggleButton value="pending">Pending</ToggleButton>
      </ToggleButtonGroup>

      <List>
        {visibleOrders.map((order) => (
          <ListItem key={order.id} disableGutters>
            <ListItemText
              primary={
                <Link component={RouterLink} to={`/routing/orders/${order.id}`}>
                  Order #{order.id} — {order.customer}
                </Link>
              }
              secondary={`${order.status} · ${order.total.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OrderList;
