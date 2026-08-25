import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useCartStore } from './cartStore';

const CATALOGUE = [
  { id: 'a', label: 'Keyboard' },
  { id: 'b', label: 'Monitor' },
  { id: 'c', label: 'Desk lamp' },
];

/**
 * Note what is NOT here: no provider, and no props threaded between these
 * two components. They are siblings that share state by both subscribing to
 * the same store.
 */
const AddToCart = () => {
  // Selector form: this component only reads `add`, so it re-renders only
  // when `add` changes — which is never. Zustand actions are stable.
  const add = useCartStore((state) => state.add);

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {CATALOGUE.map((item) => (
        <Button key={item.id} variant="contained" onClick={() => add(item)}>
          Add {item.label}
        </Button>
      ))}
    </Box>
  );
};

const CartBadge = () => {
  // A DERIVED selector. This component re-renders only when the computed
  // total changes — adding and removing items that keep the count the same
  // would not re-render it.
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return <Typography variant="h6">Cart: {totalItems} item(s)</Typography>;
};

const CartContents = () => {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  if (items.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        The cart is empty.
      </Typography>
    );
  }

  return (
    <>
      <List dense>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label={`remove ${item.label}`}
                onClick={() => remove(item.id)}
              >
                <Delete />
              </IconButton>
            }
          >
            <ListItemText primary={`${item.label} × ${item.quantity}`} />
          </ListItem>
        ))}
      </List>
      <Button variant="outlined" onClick={clear}>
        Clear cart
      </Button>
    </>
  );
};

const ZustandDemo = () => (
  <Box sx={{ border: '1px solid lightgray', p: 2, borderRadius: 1 }}>
    <CartBadge />
    <Divider sx={{ my: 2 }} />
    <AddToCart />
    <CartContents />
    <Typography variant="body2" sx={{ mt: 3 }} color="text.secondary">
      Reload the page — the cart survives, because the store uses the{' '}
      <code>persist</code> middleware. Nothing in these three components knows
      that.
    </Typography>
  </Box>
);

export default ZustandDemo;
