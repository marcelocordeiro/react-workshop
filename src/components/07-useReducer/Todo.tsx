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

interface TodoI {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number };

const reducer = (state: TodoI[], action: Action): TodoI[] => {
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

  const handleDeleteTodo = (todo: TodoI) =>
    dispatch({ type: 'REMOVE_TODO', payload: todo.id });

  const handleCheckTodo = (todo: TodoI) =>
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });

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
                onClick={() => handleDeleteTodo(todo)}
              >
                <Delete />
              </IconButton>
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleCheckTodo(todo)}
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
