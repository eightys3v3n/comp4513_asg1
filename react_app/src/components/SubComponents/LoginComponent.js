import React from 'react';
import {Link} from 'react-router-dom';
import FavoriteIcon from '../FavoriteIcon.js';
import Button from '@mui/material/Button';

function LoginComponent(props) {

  function doLogout() {
    console.log("LOGIN NEEDS TO BE COMPLETED HERE")
  }
  
  return (
    <div>
        <h1>Please login here: </h1>
      <Link style={{color:"black"}} to="/login">
        <Button variant="contained"
                style={{color:'white'}}
                className='gradient' 
                onClick={doLogout()}>
        Login</Button>
      </Link>
    </div>
  );
}

export default LoginComponent;
