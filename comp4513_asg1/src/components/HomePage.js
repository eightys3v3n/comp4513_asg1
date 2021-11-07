import React from 'react';
import { Link } from 'react-router-dom';

function HomePage(props) {
  return (
    <section id='Home-Page'>
      <form className="pure-form">
          <h1>Search Plays</h1>
        <div>
          <label>Title</label>
          <input id="title" />
        </div>
        <div>
          <Link to="/BrowsePage"><button>Show Matching Plays</button></Link>
          <Link to="/BrowsePage"><button>Show All Plays</button></Link>
        </div>
      </form>
    </section>
  );
}

export default HomePage;
