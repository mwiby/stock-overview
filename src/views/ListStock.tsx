import { useLocation } from 'react-router-dom';
import { StockData } from '../types';

const ListStock = () => {
  const location = useLocation();
  const { data } = location.state || { data: [] };

  return (
    <div>
      <p>List of Stocks</p>
      <ul>
        {data.map((stock: StockData) => (
          <li key={stock.symbol}>
            {stock.name} ({stock.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListStock;