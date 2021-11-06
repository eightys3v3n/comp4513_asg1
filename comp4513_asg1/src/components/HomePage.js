import React from 'react';
import { Link } from 'react-router-dom';

function HomePage(props) {
  return (
    <section id='Home-Page'>
      <form>
          <h1>Search Plays</h1>
        <div>
          <label>Title</label>
          <input id="title" />
        </div>
        <div>
          <input type="button" value="Show Matching Plays" />
          <input type="button" value="Show All Plays" />
        </div>
      </form>
    </section>
  );
}

export default HomePage;
