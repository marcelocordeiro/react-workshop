import { useState } from 'react';
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

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim()) {
      setTodos([...todos, { id: Date.now(), text, completed: false }]);
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
                onClick={() => {
                  setTodos(todos.filter((t) => t.id !== todo.id));
                }}
              >
                <Delete />
              </IconButton>
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={todo.completed}
                  onChange={() => {
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id
                          ? { ...t, completed: !t.completed }
                          : t,
                      ),
                    );
                  }}
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
