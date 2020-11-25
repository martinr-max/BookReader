import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withRouter, useHistory, Link } from 'react-router-dom';
import './Login.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import CircularIndeterminate from '../../shared/progressCircle/ProgressCircle';
import Alert from '@material-ui/lab/Alert';


const LoginForm = () => {

  const {
    register,
    handleSubmit
  } = useForm();
	
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const history = useHistory();
  const auth = useContext(AuthContext);

  const onSubmit = async (data) => {
    let user = data;
    try {
      setIsloading(true);
      const responseData = await axios.post('http://localhost:8000/api/user/login', user);
      if (responseData) {
        const userId = responseData.data.id;
        const role = responseData.data.roles;
        const booklist = responseData.data.booklist;
        auth.login(userId, role[0], booklist)
        history.push({
          pathname: '/' + userId + '/booklist',
          state: {
            message: "logged it"
          }
        });
      }

    } catch (err) {
      setError(err.response.data.message);
    }

  };

  return (
    <React.Fragment>
        { error &&  <Alert severity="error"> { error } </Alert> }
        {isLoading && !error && <CircularIndeterminate size="7rem" color="primary" />}
        <Container> 
          <form  className="LoginForm" onSubmit={handleSubmit(onSubmit)} >
            <h1>Login</h1>
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
            <Link to="/admin/adminlogin">Admin?</Link>
          </form>
        </Container>
        </React.Fragment>
  );
}

export default withRouter(LoginForm);
