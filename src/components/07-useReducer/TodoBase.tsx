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

interface TodoI {
  id: number;
  text: string;
  completed: boolean;
}

const Todo = () => {
  const [todos] = useState<TodoI[]>([]);
  const [text, setText] = useState('');

  const handleAddTodo = () => {};
  const handleDeleteTodo = () => {};
  const handleCheckTodo = () => {};

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
                onClick={handleDeleteTodo}
              >
                <Delete />
              </IconButton>
            }
          >
            <FormControlLabel
              control={
                <Checkbox checked={todo.completed} onChange={handleCheckTodo} />
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
