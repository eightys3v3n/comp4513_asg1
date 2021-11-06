import React from 'react';


function HomePage(props) {
  return (
    <section id='Home-Page'>
      <form class="pure-form">
          <h1>Search Plays</h1>
        <div>
          <label>Title</label>
          <input id="title" />
        </div>
        <div>
          <button type="submit" className="pure-button pure-button-primary">Show Matching Plays</button>
          <button type="submit" className="pure-button pure-button-primary">Show All Plays</button>
        </div>
      </form>
    </section>
  );
}

export default HomePage;
