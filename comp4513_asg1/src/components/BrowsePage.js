import React from 'react';
import Favorites from './Favorites.js';
import Filters from './Filters.js';
import Matches from './Matches.js';
import Header from './Header.js';

function BrowsePage(props) {
  return (
    <div>
      <header>
        <h1>Browse</h1>
      </header>
      <div className="pure-g margin" >
        <div className="pure-u-23-24 grey">
          <Header/>
        </div>
        <div className="pure-u-4-24 grey">

          <Favorites addFavorite={props.addFavorite}
                removeFavorite={props.removeFavorite}
                favorites={props.favorites}/>
        </div>
        <div className="pure-u-9-24 grey">
          <Filters />
        </div>
        <div className="pure-u-9-24 grey">

          <Matches />
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;
