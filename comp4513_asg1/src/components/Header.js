import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  let src = `${process.env.PUBLIC_URL}/paint-bucket.png`;

  return (
    <section id='Header'>
      <div className="pure-g grey">
        <div className="pure-u-5-24 ">
          <img className="logo" src={src}/>
        </div>
        <div className="pure-u-11-24 "></div>
        <div className="pure-u-6-24 ">
          <ul>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/BrowsePage">Browse Page</Link></li>
            <li><Link to="/DetailsPage">Details Page</Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Header;