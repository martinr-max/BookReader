import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Card.css';


export default function BookCard(props) {

    const auth = useContext(AuthContext);
    const history = useHistory();
    let userData = JSON.parse(localStorage.getItem('userData'));
    let userBookList = userData.userBookList;

    const addToList = id => async (event) => {
        event.preventDefault();
        try {
             const responseData = await  axios.post('http://localhost:8000/api/bookBlog/booklist/'
              + auth.userId, {
                id: id,
                userId: auth.userId
             });
             const addedBookId = responseData.data.id;
             userBookList.push(addedBookId);
             localStorage.setItem('userData', JSON.stringify(userData))
             history.push('/' + auth.userId + '/booklist/');  
        }
        catch(err) {
            console.log(err);
        }
    }

    return(
        <Card className="bookItem_root">
            <div className="imageDiv">
                <img src={props.imageUrl}></img>
            </div>
            <CardContent className="content">
                <div>
                    <Typography component="h6" variant="h6">
                        <Link to={/book/ + props.id }> {props.title} ({props.year}) </Link>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        by {props.author}
                    </Typography>
                    <hr />
                    <Typography align="justify" className="description" variant="body2" component="p">
                        {props.description}
                    </Typography>
                </div>
                <div>
                    <footer>
                        <Typography className="pages" variant="subtitle2" color="textSecondary">
                            Pages: <strong> {props.pages} </strong>
                        </Typography>
                        <div className="spacer"></div>
                        <CardActions style={{marginTop: "9px"}} className="cardActions">
                            { auth.role === 1 &&
                            userBookList.includes(props.id) ?
                            <Button type="submit" variant="outlined" disabled={true} color="primary" size="small">
                                book is added
                            </Button> : <Button type="submit" onClick={addToList(props.id)} variant="outlined" color="primary" size="small">
                                Add book to list
                            </Button>}
                        </CardActions>
                    </footer>
                </div>
            </CardContent>
        </Card>
    );
}