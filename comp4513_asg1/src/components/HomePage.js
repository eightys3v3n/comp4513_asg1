import React from 'react';
import { Link } from 'react-router-dom';

function HomePage(props) {
  let title;
  
  function f(e) {
    props.title(title);
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
          <Link to="/BrowsePage"><button onClick={f} className='pure-button'>Show Matching Plays</button></Link>
          <Link to="/BrowsePage"><button className='pure-button'>Show All Plays</button></Link>
        </div>
      </form>
    </section>
  );
}

export default HomePage;
