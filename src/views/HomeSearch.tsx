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
import CircularProgress from '@mui/material/CircularProgress';
import '../index.css';

const fetchSearchResults = async (query: string, itemsPerPage: number, page: number): Promise<StockData[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const response = await fetch(`${apiUrl}/search?query=${query}&limit=${itemsPerPage}&offset=${page * itemsPerPage}&apikey=${apiKey}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const searchResults = await response.json();
  const symbols = searchResults.map((stock: StockData) => stock.symbol);
  const detailedResponse = await fetch(`${apiUrl}/quote/${symbols.join(',')}?apikey=${apiKey}`);
  if (!detailedResponse.ok) {
    throw new Error('Network response was not ok');
  }
  return detailedResponse.json();
};

const HomeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showList, setShowList] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const { data, error, isLoading, refetch }: UseQueryResult<StockData[], Error> = useQuery({
    queryKey: ['stockData', searchQuery, itemsPerPage, page],
    queryFn: () => fetchSearchResults(searchQuery, itemsPerPage, page),
    enabled: false
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && searchQuery.trim() !== '') {
      setShowList(true);
      setPage(0); // Reset to the first page on a new search
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
    setPage(0); // Reset to the first page when items per page change
    refetch();
  };

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
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      )}
      {showList && data && (
        <ListStock
          data={data}
          itemsPerPage={itemsPerPage}
          page={page}
          onPageChange={setPage}
          itemsPerPageControl={
            <FormControl variant="outlined" className="items-per-page-select" style={{ minWidth: 120 }}>
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
          }
        />
      )}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default HomeSearch;