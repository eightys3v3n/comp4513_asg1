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
          <button type="submit" class="pure-button pure-button-primary" value="Show Matching Plays" />
          <button type="submit" class="pure-button pure-button-primary" value="Show All Plays" />
        </div>
      </form>
    </section>
  );
}

export default HomePage;
