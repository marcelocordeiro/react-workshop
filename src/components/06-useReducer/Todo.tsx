import { useReducer, useState } from 'react';
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
  Typography,
  FormControlLabel,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number };

const reducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const Todo = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text });
      setText('');
    }
  };

  return (
    <Box>
      <Typography variant="h6">My Todo List</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          label="New Todo"
          variant="outlined"
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddTodo}>
          Add
        </Button>
      </Box>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() =>
                  dispatch({ type: 'REMOVE_TODO', payload: todo.id })
                }
              >
                <Delete />
              </IconButton>
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={todo.completed}
                  onChange={() =>
                    dispatch({ type: 'TOGGLE_TODO', payload: todo.id })
                  }
                />
              }
              label={
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        textDecoration: todo.completed
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      {todo.text}
                    </Typography>
                  }
                />
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Todo;
