import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button variant="contained" onClick={() => setCount((prevCount) => prevCount + 1)}>
        +
      </Button>
      <Typography>Count is {count}</Typography>
      <Button variant="contained" onClick={() => setCount((prevCount) => prevCount - 1)}>
        -
      </Button>
    </Box>
  );
}

export default Counter;
