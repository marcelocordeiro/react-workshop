import { Typography, Divider, Box } from '@mui/material';
import Todo from '../components/06-useReducer/Todo';
// import Todo from '../components/06-useReducer/TodoBase';
// import Todo from '../components/06-useReducer/TodoWithState';

const UseReducerPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        6. useReducer Hook
      </Typography>
      <Typography paragraph>
        `useReducer` is an alternative to `useState` for managing more complex
        state logic. It's great for state that has multiple sub-values or when
        the next state depends on the previous one.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Todo />
    </Box>
  );
};

export default UseReducerPage;
