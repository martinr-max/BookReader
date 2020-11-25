import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import { useForm } from "react-hook-form";
import Alert from '@material-ui/lab/Alert';
import CircularIndeterminate from '../../shared/progressCircle/ProgressCircle';

const SignupForm = () => {

	const history = useHistory();
	const [error, setError] = useState("");
	const [isLoading, setIsloading] = useState(false);
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		const newUser = {
			name: data.name,
			email: data.email,
			password: data.password,
			roles: ["user"]
		}
		try {
			setIsloading(true);
			await axios.post('http://localhost:8000/api/user/signup', newUser);
			history.push(`/user/login`);
		} catch (err) {
			setError(err.responseData.data.message)

		}
	}

	return (
		<React.Fragment>
             { error &&  <Alert severity="error"> { error } </Alert> }
             {isLoading && !error && <CircularIndeterminate size="7rem" color="primary" />}
            <div>
                <Container>
                    <form  className="signupForm" onSubmit={handleSubmit(onSubmit)} >
                        <h1>Sign up</h1>
                        <TextField
                        id="input"
                        label="Name"
                        name="name"
                        defaultValue=""
                        inputRef={register({ required: true, minLength: 2 })}
                        />
                        <TextField 
                        id="input"
                        label="E-mail"
                        type="email"
                        name="email"
                        defaultValue=""
                        inputRef={register({ required: true, minLength: 5 })}
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
                        className="signupButton"
                        color="primary"
                        variant="contained"
                        type="submit" >
                         SIGN UP 
                        </Button>
                    </form>
                </Container>
            </div>
        </React.Fragment>
	);
}

export default withRouter(SignupForm);