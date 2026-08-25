import { createContext, useState, useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface GlobalStateContextType {
  isToggle: boolean;
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalStateContext = createContext<GlobalStateContextType | null>(
  null,
);

export const SimpleContextExample = () => {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ isToggle, setIsToggle }}>
      <Box sx={{ border: '1px solid lightgray', p: 2, borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Parent Component
        </Typography>
        <ChildToggle />
        <ChildDisplay />
      </Box>
    </GlobalStateContext.Provider>
  );
};

const ChildToggle = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      'ChildToggle must be used within a GlobalStateContext.Provider',
    );
  }
  const { setIsToggle } = context;
  return (
    <Box sx={{ my: 1 }}>
      <Button variant="contained" onClick={() => setIsToggle((prev) => !prev)}>
        Toggle State
      </Button>
    </Box>
  );
};

const ChildDisplay = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      'ChildDisplay must be used within a GlobalStateContext.Provider',
    );
  }
  const { isToggle } = context;

  return (
    <Box sx={{ my: 1 }}>
      <Typography>Current State: {isToggle ? 'ON' : 'OFF'}</Typography>
    </Box>
  );
};
