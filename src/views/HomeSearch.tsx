import { useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import ListStock from '../component/ListStock';
import { StockData } from '../types';

const fetchStockData = async (): Promise<StockData[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing');
  }

  const response = await fetch(`${apiUrl}search?query=Apple&apikey=${apiKey}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HomeSearch = () => {
  const [showList, setShowList] = useState(false);
  const { data, error, isLoading }: UseQueryResult<StockData[], Error> = useQuery({
    queryKey: ['stockData'],
    queryFn: fetchStockData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>Home Search view</p>
      <button onClick={() => setShowList(true)}>View Stock List</button>
      {showList && data && <ListStock data={data} />}
    </div>
  );
};

export default HomeSearch;