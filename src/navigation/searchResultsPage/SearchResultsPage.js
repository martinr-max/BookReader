import React from 'react';
import './SearchResultsPage.css'
import { Container} from '@material-ui/core';
import BookCard from '../../shared/Card/Card';

export default function SearchResultsPage(props) {
  
    const results = props.location.state.results;

    return (
    <React.Fragment>
        { results && results.length !== 0 ?
        <Container className="searchContainer">
          <h1> Your search results </h1>
          {results.map( book => {
             return <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author = {book.author}
              imageUrl={book.imageUrl}
              description={book.description}
              year ={book.year}
              pages = {book.pages}
               />
          })}
        </Container>: <h2 className="errorMessage">No book found</h2> }
    </React.Fragment>
    );
}
