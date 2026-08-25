import { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { useDebouncedValue } from './useDebouncedValue';
import { useToggle } from './useToggle';

const CITIES = [
  'Berlin',
  'Bogota',
  'Bangkok',
  'Buenos Aires',
  'Cairo',
  'Lisbon',
  'Madrid',
  'Singapore',
  'Taipei',
  'Warsaw',
];

const CustomHooksDemo = () => {
  const [query, setQuery] = useState('');

  // `query` updates on every keystroke; `debouncedQuery` lags behind on
  // purpose. In a real screen this is the value you would send to the API.
  const debouncedQuery = useDebouncedValue(query, 500);

  const [isDetailsOpen, toggleDetails] = useToggle(false);

  const matches = CITIES.filter((city) =>
    city.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  return (
    <Box sx={{ border: '1px solid lightgray', p: 2, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        useDebouncedValue
      </Typography>
      <TextField
        label="Filter cities"
        size="small"
        fullWidth
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
        Typed: <b>{query || '(empty)'}</b> — Debounced:{' '}
        <b>{debouncedQuery || '(empty)'}</b>
      </Typography>
      <List dense>
        {matches.map((city) => (
          <ListItem key={city}>
            <ListItemText primary={city} />
          </ListItem>
        ))}
        {matches.length === 0 && (
          <ListItem>
            <ListItemText primary="No matches" />
          </ListItem>
        )}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        useToggle
      </Typography>
      <Button variant="contained" onClick={toggleDetails}>
        {isDetailsOpen ? 'Hide' : 'Show'} details
      </Button>
      <Collapse in={isDetailsOpen}>
        <Typography sx={{ mt: 2 }}>
          Both hooks are plain functions. They hold state per component
          instance, exactly like two objects of the same class hold their own
          fields.
        </Typography>
      </Collapse>
    </Box>
  );
};

export default CustomHooksDemo;
