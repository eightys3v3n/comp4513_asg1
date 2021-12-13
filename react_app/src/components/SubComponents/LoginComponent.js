import React from 'react';
import {Link} from 'react-router-dom';
import FavoriteIcon from '../FavoriteIcon.js';
import Button from '@mui/material/Button';

function LoginComponent(props) {

  function doLogin() {
    console.log("LOGIN NEEDS TO BE COMPLETED HERE")
  }
  
  return (
    <Link style={{color:"black"}} to="/login">
    <Button variant="contained"
            style={{color:'white'}}
            className='gradient' 
            onClick={doLogin}>
    Login</Button>
    </Link>
  );
}

export default LoginComponent;
