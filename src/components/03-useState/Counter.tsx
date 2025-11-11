import { Button, Typography, Box } from '@mui/material';
import { useState } from 'react';

// const Counter = () => {
//   let count = 0;
//   console.log('Initial count', count);

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//       <Button
//         variant="contained"
//         onClick={() => {
//           count = count + 1;
//           console.log('+', count);
//         }}
//       >
//         +
//       </Button>
//       <Typography>Count is {count}</Typography>
//       <Button
//         variant="contained"
//         onClick={() => {
//           count = count - 1;
//           console.log('-', count);
//         }}
//       >
//         -
//       </Button>
//     </Box>
//   );
// };

const Counter = () => {
  const [count, setCount] = useState(0);
  console.log('count', count);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button
        variant="contained"
        onClick={() => setCount((prevCount) => prevCount + 1)}
      >
        +
      </Button>
      <Typography>Count is {count}</Typography>
      <Button
        variant="contained"
        onClick={() => setCount((prevCount) => prevCount - 1)}
      >
        -
      </Button>
    </Box>
  );
};

export default Counter;
