import React, { useState } from 'react';
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
  itemsPerPageControl: React.ReactNode;
};

const ListStock: React.FC<ListStockProps> = ({ data, itemsPerPage, itemsPerPageControl }) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.symbol}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
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