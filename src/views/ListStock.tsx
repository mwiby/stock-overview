import { useLocation } from 'react-router-dom';

const ListStock = () => {
  const location = useLocation();
  const { data } = location.state || { data: [] };

  return (
    <div>
      <p>List of Stocks</p>
      <ul>
        {data.map((stock: any) => (
          <li key={stock.symbol}>
            {stock.name} ({stock.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListStock;