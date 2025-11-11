import { Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import Search from './Search';

const allUsers = [
  'Marcelo',
  'Nisha',
  'Eugene',
  'Pasha',
  'Nasir',
  'Eunhee',
  'Pradnya',
  'Pranav',
];

const shuffle = (array: string[]) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const UseCallbackDemo = () => {
  const [users, setUsers] = useState(allUsers);
  console.log('users', users);

  const handleSearch = (text: string) => {
    const filteredUsers = allUsers.filter((user) =>
      user.toLowerCase().includes(text.toLowerCase()),
    );
    setUsers(filteredUsers);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Search handleSearch={handleSearch} />
        <Button variant="contained" onClick={() => setUsers(shuffle(allUsers))}>
          Shuffle
        </Button>
      </Box>
      <List>
        {users.map((user) => (
          <ListItem key={user}>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UseCallbackDemo;
