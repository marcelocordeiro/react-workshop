import { useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const ARRAY_SIZE = 29_999_999;

const initialItems = Array.from({ length: ARRAY_SIZE }, (_, i) => ({
  id: i,
  isSelected: i === ARRAY_SIZE - 1,
}));

const UseMemoDemo = () => {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems);

  const selectedItem = useMemo(
    () => items.find((item) => item.isSelected),
    [items],
  );

  return (
    <Box sx={{ border: '1px solid lightgray', p: 2, borderRadius: 1 }}>
      <Typography variant="h5" gutterBottom>
        Count: {count}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Selected Item: {selectedItem?.id}
      </Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </Box>
  );
};
export default UseMemoDemo;
