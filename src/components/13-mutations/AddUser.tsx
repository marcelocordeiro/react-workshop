import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

interface User {
  id: number;
  name: string;
  email: string;
}

interface NewUser {
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(API_URL);
  return data;
};

const createUser = async (newUser: NewUser): Promise<User> => {
  const { data } = await axios.post<User>(API_URL, newUser);
  return data;
};

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // The cache instance. Mutations do not know about queries, so we tell the
  // cache explicitly which data is now stale.
  const queryClient = useQueryClient();

  const { data: users, isPending } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const {
    mutate: addUser,
    isPending: isSaving,
    isError,
    error,
    data: createdUser,
  } = useMutation<User, Error, NewUser>({
    mutationFn: createUser,
    onSuccess: () => {
      // "This query result is now out of date — refetch it."
      // Think of it as evicting a cache region after a write.
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setName('');
      setEmail('');
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    addUser({ name, email });
  };

  return (
    <Box sx={{ border: '1px solid lightgray', p: 2, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Create a user
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}
      >
        <TextField
          label="Name"
          size="small"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Email"
          size="small"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button type="submit" variant="contained" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Add user'}
        </Button>
      </Box>

      {isError && <Alert severity="error">{error.message}</Alert>}
      {createdUser && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Server accepted the user and assigned id {createdUser.id}. This demo
          API does not actually persist writes, so the list below stays the same
          — against a real backend the refetch would show the new row.
        </Alert>
      )}

      {isPending ? (
        <CircularProgress />
      ) : (
        <List dense>
          {users?.slice(0, 5).map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AddUser;
