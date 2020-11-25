import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../../shared/Card/Card';
import './GeneralBooklist.css';
import CircularIndeterminate from '../../shared/progressCircle/ProgressCircle';
import { Container } from '@material-ui/core';


export default React.memo(function GeneralBookList() {

	const [loadedBook, setLoadedBook] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const responseData = await axios.get('http://localhost:8000/api/bookBlog/books/');
				const books = responseData.data;
				setLoadedBook(books);
				setIsLoading(false);
			} catch (err) {
				setError(err.response.data.message);
			}
		}
		fetchData();
	}, []);

	return (
	  <React.Fragment>
	    {isLoading && !error &&
	    <CircularIndeterminate size="7rem" color="primary" />}
	        <Container className="all_books_container">
		        <h2> All Books</h2>
		        <ul className="bookList">
			    {loadedBook && loadedBook.map(book => {
			    return <BookCard
                		key={book.id}
                		id={book.id}
                		title={book.title}
                		author={book.author}
                		pages={book.pages}
                		description={book.description}
                		imageUrl={book.imageUrl}
                		year={book.year} />
				})}
		       	</ul>
	        </Container>
           </React.Fragment>
	);
})
