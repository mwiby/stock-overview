import { useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import ListStock from '../component/ListStock';
import { StockData } from '../types';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const fetchStockData = async (query: string): Promise<StockData[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const response = await fetch(`${apiUrl}search?query=${query}&apikey=${apiKey}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HomeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showList, setShowList] = useState(false);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <TextField
        label="Search for Stock..."
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchQuery && (
                <IconButton onClick={handleClear} edge="end">
                  <ClearIcon />
                </IconButton>
              )}
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      {showList && data && <ListStock data={data} />}
    </div>
  );
};

export default HomeSearch;