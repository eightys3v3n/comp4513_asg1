import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import {useContext} from 'react';
import {UserContext} from './UserContextProvider.js';

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

  let src = `${process.env.PUBLIC_URL}/homepage.jpg`;

  return (
    <section className="page" id='Home-Page' style={{backgroundImage: `url(${src})`, alt: "homepage image"}}>
        <div className="flex-row">
          <form className="pure-form">
              <h1 id="home-title">Search Plays</h1>
            <div>
              <label style={{marginLeft:"50px", color:"white"}}>Title:  </label>
              <input id="title" onChange={e => {title=e.target.value}}/><br/><br/>
            </div>
            <div>
              <Link to="/BrowsePage"
                    className="margin">
                <Button variant="contained"
                        onClick={searchTitle}
                        className='pure-button'>
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
        </div>
    </section>
  );
}

export default HomePage;
