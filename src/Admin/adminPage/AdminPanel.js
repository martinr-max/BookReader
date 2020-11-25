import React, { useEffect, useState } from 'react';
import './AdminPanel.css'
import axios from 'axios';
import AdminTable from '../AdminTable/AdminTable';
import DeleteBookDialog from '../deleteBook/DeleteBookModal';
import CircularIndeterminate from '../../shared/progressCircle/ProgressCircle';
import Alert from '@material-ui/lab/Alert';


export default function AdminPanel() {

    const [loadedBooks, setLoadedBooks] = useState([]);
    const [bookIndex, setBookIndex] = useState();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleclickOpen = (index) => {
     let bookId = index;
      setBookIndex(bookId);
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    
    useEffect( () => {
      setIsLoading(true); 
      const fetchBooks = async () => {
        try {
          const responseData = await axios.get('http://localhost:8000/api/bookBlog/books/');
          const books = responseData.data;
          const bookArray = []
          for(const key in books) {
            bookArray.push({
              id: key,
              bookId: books[key].id,
              title: books[key].title,
              author: books[key].author,
              imageUrl: books[key].imageUrl,
              description: books[key].description,
              year: books[key].year,
              pages: books[key].pages
            })
          } 
          setLoadedBooks(bookArray);
          setIsLoading(false);   

        }
        catch(err) {
          setError(err.response.data.message)
        }
      }

      fetchBooks();
       
    }, []);

    const handleDeleteBook = async () => {
        setOpen(false);
        try {
          await axios.delete("http://localhost:8000/api/admin/books/delete/" + bookIndex);
          setLoadedBooks(prevBooks => prevBooks.filter(book => book.bookId !== bookIndex));

        }
        catch(err) {
          setError(err.response.data.message)
        }
      
      }


    return (
        <React.Fragment>
          { error &&  <Alert severity="error"> { error } </Alert> }
              {!error &&  isLoading && <CircularIndeterminate size="7rem" color="primary" />}
              {loadedBooks && 
            <AdminTable
             loadedBooks={loadedBooks}
             handleclickOpen={handleclickOpen}
             handleChangePage={handleChangePage}
             handleChangeRowsPerPage={handleChangeRowsPerPage}
             page={page}
             rowsPerPage={rowsPerPage}
              /> }
              <DeleteBookDialog 
              open={open}
              handleDeleteBook={handleDeleteBook}
              handleClose={handleClose}
              bookid={bookIndex} />
        </React.Fragment>
      );
    
}

