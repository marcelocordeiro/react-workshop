import { Button, Typography, Box } from '@mui/material';

const Counter = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button variant="contained">+</Button>
      <Typography>Count is ...</Typography>
      <Button variant="contained">-</Button>
    </Box>
  );
};

export default Counter;
