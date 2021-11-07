import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <section id='Header'>
        <ul>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/BrowsePage">Browse Page</Link></li>
            <li><Link to="/DetailsPage">Details Page</Link></li>
        </ul>
    </section>
  );
}

export default Header;