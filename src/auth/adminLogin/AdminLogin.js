import React, { useState, useCallback, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import './AdminLogin.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import CircularIndeterminate from '../../shared/progressCircle/ProgressCircle';

export default function AdminLogin() {

	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");
	const [isLoading, setIsloading] = useState(false);

	const history = useHistory();
	const auth = useContext(AuthContext);

	const onSubmit = async (data) => {
		let user = data;
		try {
			setIsloading(true);
			const responseData = await axios.post('http://localhost:8000/api/admin/login', user);
			const userId = responseData.data.id;
			//const token = responseData.data.accessToken;
			const role = responseData.data.roles;
			auth.login(userId, role[0].id);
			history.push('/admin/adminpanel');
		} catch (err) {
			setError(err.response.data.message);
		}

	}

	return (
		<React.Fragment>
      { error &&  <Alert severity="error"> { error } </Alert> }
      {isLoading && !error && <CircularIndeterminate size="7rem" color="primary" />}
        <Container> 
          <form  className="LoginForm" onSubmit={handleSubmit(onSubmit)} >
            <h1>Admin Login</h1>
            <TextField 
             id="input"
             label="E-mail"
             type="email"
             name="email"
             defaultValue=""
             inputRef={register({ required: true, minLength: 6 })}
            />
            <TextField
             id="input"
             label="Password"
             type="password"
             name="password"
             defaultValue=""
             inputRef={register({ required: true, minLength: 6 })}
            />
          <Button
            className="loginButton"
            color="primary"
            variant="contained"
            type="submit" >
                 LOG IN
            </Button>   
          </form>
        </Container>
      </React.Fragment>
	);
}