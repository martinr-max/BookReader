import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'
import './AddBook.css'
import CircularIndeterminate from '../../shared/progressCircle/ProgressCircle';


export default function AddBook() {

    const [values, setValues] = useState({
        title: "",
        author: "",
        imageUrl: '',
        year: '',
        pages: '',
        description: ""
      });
    const [error, setError] = useState("");
    const [isLoading, setIsloading] = useState(false);

    const history = useHistory();

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({
          ...values,
          [event.target.name]: event.target.value
      }));
     }
     
     const handleSubmit = async (event) => {
        event.preventDefault();
        const book = {
          title: values.title,
          author: values.author,
          imageUrl: values.imageUrl,
          year: values.year,
          pages: values.pages,
          description: values.description
        } 
        setValues(book);
        try {
          await  axios.post(`http://localhost:8000/api/admin/`, book);
          history.push('/admin/adminpanel');
        }
        catch(err) {
          setError(err.response.data.message);
        }
    }; 
 
    return(
      <React.Fragment>
        { error &&  <Alert severity="error"> { error } </Alert> }
        {isLoading && !error && <CircularIndeterminate size="7rem" color="primary" />}     
        <Container>
         <form  className="bookForm" onSubmit={handleSubmit} >
            <h2>Add a New Book</h2>
            <TextField 
            id="input"
            label="title"
            type="text"
            name="title"
            required
            onChange={handleChange} />
            <TextField
            id="input"
            label="author"
            type="text"
            name="author"
            required
            onChange={handleChange} />
            <TextField
            id="input"
            label="imageUrl"
            type="text"
            name="imageUrl"
            required
            onChange={handleChange} />
            <TextField
            id="input"
            label="year"
            type="number"
            name="year"
            required
            onChange={handleChange} />
            <TextField
            id="input"
            label="pages"
            type="number"
            name="pages"
            required
            onChange={handleChange} />
            <TextField
            id="textarea"
            label="description"
            type="text"
            name="description"
            multiline
            rows={3}
            rowsMax={3}
            onChange={handleChange} />
            <Button
            className="addBookButton"
            color="primary"
            size="large"
            variant="contained"
            type="submit" >
                 ADD BOOK
            </Button> 
        </form>
      </Container>
    </React.Fragment>
  )
}
