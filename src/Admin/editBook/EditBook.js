import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./EditBook.css";
import CircularIndeterminate from '../../shared/progressCircle/ProgressCircle';

export default function EditBook() {

    const [loadedBook, setLoadedBook] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsloading] = useState(false);

    const bookId = useParams().bookId;
    const history = useHistory();

    useEffect(() => {
        setIsloading(true);
        const fetchBook = async() => {
            try {
                const responseData = await axios.get(`http://localhost:8000/api/bookBlog/book/${bookId}`);
                const book = responseData.data;
                setLoadedBook(book); 
                setIsloading(false);  
            }
            catch(err) {
                setError(err.response.data.message);
            }
        }
        fetchBook();
                
    }, [bookId]);

    const handleChange = (event) => {
            event.persist();
            setLoadedBook(loadedBook => ({
                ...loadedBook,
                [event.target.name]: event.target.value
            }));
     };

    const submitEditedBook = async (event) => {
        event.preventDefault();
        const updatedBook = {
            title: loadedBook.title,
            author: loadedBook.author,
            imageUrl: loadedBook.imageUrl,
            year: loadedBook.year,
            pages: loadedBook.pages,
            description: loadedBook.description
          } 
          setLoadedBook(updatedBook);
          setIsloading(true);

          try {
            await axios.patch(`http://localhost:8000/api/admin/books/edit/${bookId}`, updatedBook);
            history.push('/admin/adminpanel');
            setIsloading(false);

          }
          catch(err) {
              setError(err.response.data.message)
          }
    };

    return(
        <React.Fragment>
        {isLoading && !error && <CircularIndeterminate size="7rem" color="primary" />}

        <form  className="editForm" onSubmit={submitEditedBook} >
        <h2>Edit Book</h2>

        <TextField 
        id="input"
        type="text"
        name="title"
        onChange={handleChange}
        value={loadedBook.title || ''}
        required
        />
        <TextField
        id="input"
        type="text"
        name="author"
        onChange={handleChange}
        value={loadedBook.author || ''}
        required
         />
        <TextField
        id="input"
        type="text"
        name="imageUrl"
        onChange={handleChange}
        value={loadedBook.imageUrl || ''}
        required
         />
        <TextField
        id="input"
        type="number"
        name="year"
        onChange={handleChange}
        value={loadedBook.year || ''}
        required
        />
        <TextField
        id="input"
        type="number"
        name="pages"
        value={loadedBook.pages || ''}
        onChange={handleChange}
        required
         />
        <TextField
        id="textarea"
        type="text"
        name="description"
        onChange={handleChange}
        value={loadedBook.description || ''}
        multiline
        rows={4}
        rowsMax={5}
        />

      <Button
        className="editBookButton"
        color="primary"
        size="large"
        variant="contained"
        type="submit" >
             EDIT BOOK
        </Button> 
    </form>
    </React.Fragment>
    );
}
