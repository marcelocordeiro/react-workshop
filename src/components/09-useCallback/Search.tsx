import { TextField } from '@mui/material';
import { memo } from 'react';

const Search = ({ handleSearch }: { handleSearch: (text: string) => void }) => {
  console.log('Search rendered');
  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      onChange={(e) => handleSearch(e.target.value)}
      fullWidth
    />
  );
};

export default memo(Search);
