import { StockData } from '../types';

type ListStockProps = {
  data: StockData[];
};

const ListStock: React.FC<ListStockProps> = ({ data }) => {
  return (
    <div>
      <ul>
        {data.map((stock) => (
          <li key={stock.symbol}>
            {stock.name} ({stock.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListStock;