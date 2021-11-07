import React from 'react';
import { Link } from 'react-router-dom';

function HomePage(props) {
  let title;
  
  function searchTitle(e) {
    props.setTitle(title);
  }

  function searchAllTitles(e) {
    props.setTitle("");
  }

  return (
    <section id='Home-Page'>
      <form className="pure-form">
          <h1>Search Plays</h1>
        <div>
          <label>Title</label>
          <input id="title" onChange={e => {title=e.target.value}} />
        </div>
        <div>
          <Link to="/BrowsePage"><button onClick={searchTitle}
                                         className='pure-button'>
                                 Show Matching Plays</button></Link>
          <Link to="/BrowsePage"><button className='pure-button'
                                         onClick={searchAllTitles}>
                                 Show All Plays</button></Link>
        </div>
      </form>
    </section>
  );
}

export default HomePage;
