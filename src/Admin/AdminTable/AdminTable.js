import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TablePagination } from '@material-ui/core';


export default function AdminTable({
    handleclickOpen,
    loadedBooks,
    handleChangePage,
    handleChangeRowsPerPage,
    page, 
    rowsPerPage
  }) {

  const headCells = [
      { id: 'title', label: 'Title' },
      { id: 'author', label: 'Author' },
      { id: 'imageUrl',  label: 'ImageUrl' },
      { id: 'description', label: 'Description' },
      { id: 'year', numeric: true,  label: 'Year'},
      { id: 'pages', numeric: true,  label: 'Pages'},
      { id: 'actions',  label: 'Actions'},
    ];

  return(
    <TableContainer component={Paper}>
      <h2>Books</h2>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((cell) => {
                return <TableCell key={cell.id}> {cell.label} </TableCell>
              })}
            </TableRow>
            </TableHead>
            <TableBody>
              { loadedBooks &&
              (rowsPerPage > 0
                ? loadedBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : loadedBooks
              ).map((row) => (
              <TableRow key={row.id}>
                <TableCell  name="title" component="th" >{row.title}</TableCell>
                <TableCell  name="author" align="right"><div> {row.author} </div></TableCell>
                <TableCell  name="imageUrl" align="right">{row.imageUrl}</TableCell>
                <TableCell  name="description" align="right" className="text2">{row.description}</TableCell>
                <TableCell  name="year" align="right">{row.year}</TableCell>
                <TableCell  name="pages" align="right">{row.pages}</TableCell>
                <TableCell align="left">
                    <Button href={"/admin/edit/" + row.bookId} >EDIT</Button>
                    <Button color="secondary"  onClick={(e) => handleclickOpen(row.bookId)} >DELETE</Button>
                </TableCell>
              </TableRow>
              )) }
            </TableBody>
            <TableRow className="pagination">
                <TablePagination
                rowsPerPageOptions={[3, 6, { label: 'All', value: -1 }]}
                count={loadedBooks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}/>
          </TableRow>
        </Table>
      </TableContainer>
  );
}