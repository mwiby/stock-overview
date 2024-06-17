import { useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import ListStock from '../component/ListStock';
import { StockData } from '../types';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import '../index.css';

const fetchStockData = async (query: string): Promise<StockData[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const response = await fetch(`${apiUrl}/search?query=${query}&apikey=${apiKey}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HomeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showList, setShowList] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { data, error, isLoading, refetch }: UseQueryResult<StockData[], Error> = useQuery({
    queryKey: ['stockData', searchQuery],
    queryFn: () => fetchStockData(searchQuery),
    enabled: false
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setShowList(true);
      refetch();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowList(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(Number(event.target.value));
  };

  const itemsPerPageControl = (
    <FormControl variant="outlined" className="items-per-page-select">
      <Select
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Items per page' }}
      >
        <MenuItem value={5}>5 items</MenuItem>
        <MenuItem value={10}>10 items</MenuItem>
        <MenuItem value={15}>15 items</MenuItem>
      </Select>
    </FormControl>
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home-search-container">
      <div className="text-field-container">
        <TextField
          fullWidth
          label="Search for Stock..."
          variant="outlined"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchQuery && (
                  <IconButton onClick={handleClear} edge="end">
                    <ClearIcon />
                  </IconButton>
                )}
                {!searchQuery && <SearchIcon />} {/* Conditionally render SearchIcon */}
              </InputAdornment>
            )
          }}
        />
      </div>
      {showList && data && <ListStock data={data} itemsPerPage={itemsPerPage} itemsPerPageControl={itemsPerPageControl} />}
    </div>
  );
};

export default HomeSearch;