import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import './UserBookList.css';
import UserBooklistItem from '../userBooklistItem/UserBooklistItem';
import CircularIndeterminate from '../../shared/progressCircle/ProgressCircle';
import Alert from '@material-ui/lab/Alert';


export default function UserBookList(props) {

  const [loadedBook, setLoadedBook] = useState([]);
  const [bookIndex, setBookIndex] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const userId = useParams()
    .userId;

  const handleclickOpen = (index) => {
    let bookId = index;
    setBookIndex(bookId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    setIsloading(true);
    const getUseBooks = async () => {
      try {
        const responseData = await axios.get('http://localhost:8000/api/bookBlog/booklist/' + userId)
        let userBooks = responseData.data;
        setLoadedBook(userBooks);
        setIsloading(false);
      } catch (err) {
        setError(err.response.data.message);
      }
    }
    getUseBooks();

  }, [userId]);

  const handleDeleteUserBook = (id) => {
    id = bookIndex;
    setOpen(false);
    fetch('http://localhost:8000/api/bookBlog/booklist/delete/' + userId, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      })
      .then(response => {
        return response.json();

      })
      .then((deletedBook) => {
        let deletedBookId = deletedBook.id;
        let userData = JSON.parse(localStorage.getItem('userData'));
        let newBookList = userData.userBookList;
        for (let i = 0; i < newBookList.length; i++) {
          if (newBookList[i] === deletedBookId) {
            newBookList.splice(i, 1);
          }
        }
        let newArray = loadedBook.filter(book => book.id !== deletedBookId);
        setLoadedBook(newArray);
        localStorage.setItem('userData', JSON.stringify(userData));
      })
      .catch(err => console.log(err));
  }

  return (
    <React.Fragment>
       { error &&  <Alert severity="error"> { error } </Alert> }
        {isLoading && !error && <CircularIndeterminate color="primary" size="7rem" />}
        <Container>
       	  <h3 className="booklist_title">Your Booklist</h3>
       	    <ul className="userBookList">
        	{ loadedBook.length !== 0 ?    
              	  loadedBook && loadedBook.map(book => {
                  return <UserBooklistItem
                    	key = {book.id}
                    	id = {book.id}
                    	title={book.title}
                    	author={book.author}
                    	imageUrl= {book.imageUrl}
                    	open={open}
                    	handleclickOpen={handleclickOpen}
                    	handleClose={handleClose}
                    	bookIndex={bookIndex}
                    	handleDeleteUserBook={handleDeleteUserBook}
            	  />}) : <p className="listIsEmpty"> Your list is empty. Maybe add some book?</p>}
            </ul>
         </Container>
     </React.Fragment>
  );
}
