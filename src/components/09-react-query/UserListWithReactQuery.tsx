import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useQuery } from 'react-query';

interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUsers = async () => {
  const { data } = await axios.get<User[]>(
    'https://jsonplaceholder.typicode.com/users',
  );
  return data;
};

const UserList = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<User[], Error>(['users'], () => fetchUsers());

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <List>
      {users?.map((user) => (
        <ListItem key={user.id}>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
