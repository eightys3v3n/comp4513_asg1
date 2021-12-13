import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import {useContext} from 'react';
import {UserContext} from './UserContextProvider.js';
import LogoutComponent from './SubComponents/LogoutComponent.js';
import LoginComponent from './SubComponents/LoginComponent.js';

function HomePage(props) {
  let title;
  const userObj = useContext(UserContext);

  let history = useHistory();

  function searchTitle(e) {
    props.setTitle(title);
  }

  function searchAllTitles(e) {
    props.setTitle("");
  }

  function renderLoginOrLogout() {
    console.log(userObj);
    if (userObj.isLoggedIn() ) {
    let name = userObj.userObj.details.firstname + " " + userObj.userObj.details.lastname;
      return (
        <form className="pure-form">
          <h1 id="home-title">Welcome, {name}!</h1>
          <div>
            <label style={{marginLeft:"50px", color:"white"}}>Title:  </label>
            <input id="title" onChange={e => {title=e.target.value}}/><br/><br/>
          </div>
          <div>
            <LogoutComponent userObj={userObj}/>
            <Link to="/BrowsePage"
                  className="margin">
              <Button variant="contained"
                      style={{color:'white'}}
                      onClick={searchTitle}
                      className='gradient'>
              Show Matching Plays</Button>
            </Link>
            <Link to="/BrowsePage"
                  className="margin">
              <Button variant="contained"
                      style={{color:'white'}}
                      className='gradient'
                      onClick={searchAllTitles}>
              Show All Plays</Button>
            </Link>
          </div>
      </form>
      );
    } else {
      return (
        <section className="pure-form">
          <div>
            <h1 id="home-title">Welcome, visitor!</h1>
          </div>
          <div>
            <LoginComponent />
          </div>
        </section>
      );
    }
  }

  let src = `${process.env.PUBLIC_URL}/homepage.jpg`;

  return (
    <section className="page" id='Home-Page' style={{backgroundImage: `url(${src})`, alt: "homepage image"}}>
        <div className="flex-row">
          {renderLoginOrLogout()}
        </div>
    </section>
  );
}

export default HomePage;
