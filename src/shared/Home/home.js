import React, { useContext } from 'react';
import './Home.css'
import { Button, Typography, Container } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';


export default function Home() {

    const {userId} = useContext(AuthContext);

    return(
        <div className="homeBook-bg">
             <Container className="book-inside">
                <Typography component="h1" variant="h5">
                    Welcome to BookReader!
                </Typography>
                <Typography className="home_subtitle" component="h3" variant="subtitle1">
                    Find your next Book!
                </Typography>
                {!userId && <Button href="/user/login" size="small" variant="outlined" color="primary">start here!</Button> }
              </Container>
            <div className="book-cover"></div>
        </div>
    );
}