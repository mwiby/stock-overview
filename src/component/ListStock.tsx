import React, { useEffect } from 'react';
import { StockData } from '../types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

type ListStockProps = {
  data: StockData[];
  itemsPerPage: number;
  page: number;
  onPageChange: (newPage: number) => void;
  itemsPerPageControl: React.ReactNode;
};

const ListStock: React.FC<ListStockProps> = ({ data, itemsPerPage, page, onPageChange, itemsPerPageControl }) => {
  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  useEffect(() => {
    onPageChange(page);
  }, [itemsPerPage, onPageChange, page]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Changes</TableCell>
              <TableCell>Changes %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.price}</TableCell>
                <TableCell>{stock.changes}</TableCell>
                <TableCell>{stock.changesPercentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[itemsPerPage]}
          component="div"
          count={data.length * itemsPerPage} // Assuming the API returns only the current page data
          rowsPerPage={itemsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </TableContainer>
      <div style={{ marginTop: '16px' }}>
        {itemsPerPageControl}
      </div>
    </div>
  );
};

export default ListStock;