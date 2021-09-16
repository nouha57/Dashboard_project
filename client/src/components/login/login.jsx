import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Alert } from '@material-ui/lab';

import './login.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(4),
      width: '30ch',
    },
  },
  margin: {
    marginTop: theme.spacing(4),
    width: '15ch',
    fontSize: '24px',
    fontWeight: '700'
  },
  extendedIcon: {
    marginLeft: theme.spacing(2),
  },
  error:{
    width: '100%',
    marginTop: theme.spacing(2),
  }
}));

function Login(state) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState();

    async function handleLogin(e){
      e.preventDefault();
      await axios.post("http://localhost:8080/api/user/login", {username:name, password:password})
      .then( (response) => {
        if(response.data.message){
          setLoginStatus(response.data.message);
        } else{
          state.setUser(response.data[0].username);
        }
      }).catch(function(error) {
        console.log(error);
      });
  
    }
    
    const nameChange = (event) => {
      setName(event.target.value);
    };
    
    const passwordChange = (event) => {
      setPassword(event.target.value);
    };

    return (
        <div className='login-page'>
            <p class="nav-name">Log In </p>
            {
              loginStatus && <Alert severity="error" className={classes.error} >{loginStatus}</Alert>
            }
            
            <form className={`login-form ${classes.root}` } noValidate autoComplete="on">
                  {loginStatus ? 
                    <TextField
                      error
                      id="name-input"
                      label="User Name"
                      type="text"
                      autoComplete="current-name"
                      onChange={nameChange}
                    /> : 
                    <TextField
                    id="name-input"
                    label="User Name"
                    type="text"
                    autoComplete="current-name"
                    onChange={nameChange}
                    />
                  }
                    
                  {loginStatus ?
                    <TextField
                      error
                      id="password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      onChange={passwordChange}
                    /> :

                    <TextField
                      id="password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      onChange={passwordChange}
                    /> 
                  }
                    <Fab type='post' variant="extended" color="primary" aria-label="add" className={classes.margin} onClick={handleLogin}>
                      LOG IN
                      <KeyboardArrowRightIcon className={classes.extendedIcon} fontSize="large"/>
                    </Fab>
            </form>
        </div>
    )
}

export default Login
