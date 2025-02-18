import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PageSelect(props) {
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const limit = queryParams.get("limit") || "10"

  const { totalItem, currentPage, startItem, endItem } = props
  const [page, setPage] = React.useState(Number(currentPage));
  const [rowsPerPage, setRowsPerPage] = React.useState(Number(limit));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    navigate(`/adminpanel/dashboard/?page=${newPage}&limit=${rowsPerPage}`)
    console.log("handleChangePage telah berjalan", newPage, rowsPerPage);
    
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    navigate(`/adminpanel/dashboard/?page=0&limit=${newRowsPerPage}`);
    console.log("handleChangeRowsPerPage telah berjalan");
  };

  return (
    <TablePagination
      component="div"
      count={totalItem}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}
