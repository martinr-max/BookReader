import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import './SingleBookPage.css';
    
export default function SingleBookPage() {

	const [loadedBook, setLoadedBook] = useState([]);
	const bookId = useParams().bookId;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseData = await axios.get('http://localhost:8000/api/bookBlog/book/' + bookId);
				const book = responseData.data;
				setLoadedBook(book);
			} catch (err) {
				console.log(err.message)
			}
		}
		fetchData();
	}, [bookId, setLoadedBook]);

	return (
    <React.Fragment>
    {loadedBook &&
    <div className="singleBook-bg">
      <Container className="singleBook-inside">
        <Typography component="h2" variant="h6">
          {loadedBook.title}
        </Typography>
        <Typography component="h2" variant="subtitle1">
          by {loadedBook.author}
        </Typography>
        <Typography className="book_desc" component="h5" variant="subtitle2">
          {loadedBook.description}
        </Typography>
        <footer>
          <Typography component="h2" variant="subtitle2">
            Pages: {loadedBook.pages}
          </Typography>
        </footer>
      </Container>
      <div className="singleBook-cover" style={{ backgroundImage: `url(${loadedBook.imageUrl})` }}></div>
    </div>}
    </React.Fragment>
		
	);

}