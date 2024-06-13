import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const fetchStockData = async () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const response = await fetch(`https://financialmodelingprep.com/api/v3/search?query=AAPL&apikey=${apiKey}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HomeSearch = () => {
  const { data, error, isLoading } = useQuery(['stockData'], fetchStockData);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>Home Search view</p>
      <button onClick={() => navigate('/list', { state: { data } })}>
        View Stock List
      </button>
    </div>
  );
};

export default HomeSearch;