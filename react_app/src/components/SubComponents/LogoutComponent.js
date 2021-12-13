import React from 'react';
import {Link} from 'react-router-dom';
import FavoriteIcon from '../FavoriteIcon.js';
import Button from '@mui/material/Button';

function LogoutComponent(props) {
  let name = props.user.firstname + " " + props.user.lastname;

  function doLogout() {
    console.log("LOGOUT NEEDS TO BE COMPLETED HERE")
  }
  
  return (
    <div>
      <h1>Welcome back, {name}!</h1>
      <Button variant="contained"
              style={{color:'white'}}
              className='gradient' 
              onClick={doLogout()}>
      Logout</Button>
    </div>
  );
}

export default LogoutComponent;
