import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

export const SimpleContextExample = () => {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <Box sx={{ border: '1px solid lightgray', p: 2, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Parent Component
      </Typography>
      <ChildToggle setIsToggle={setIsToggle} />
      <ChildDisplay isToggle={isToggle} />
    </Box>
  );
};

interface ChildToggleProps {
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChildToggle = ({ setIsToggle }: ChildToggleProps) => {
  return (
    <Box sx={{ my: 1 }}>
      <Button variant="contained" onClick={() => setIsToggle((prev) => !prev)}>
        Toggle State
      </Button>
    </Box>
  );
};

interface ChildDisplayProps {
  isToggle: boolean;
}

const ChildDisplay = ({ isToggle }: ChildDisplayProps) => {
  return (
    <Box sx={{ my: 1 }}>
      <Typography>Current State: {isToggle ? 'ON' : 'OFF'}</Typography>
    </Box>
  );
};
