import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function LogoutComponent(props) {

  let history = useHistory();
  function doLogout() {
    props.userObj.logOutUserLocally();
    history.push("/login");
  }
  
  return (
      <Button variant="contained"
              style={{color:'white'}}
              className='gradient' 
              onClick={doLogout}>
      Logout</Button>
  );
}

export default LogoutComponent;
