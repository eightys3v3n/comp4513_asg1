import React from 'react';
import Favorites from './Favorites.js';
import Filters from './Filters.js';
import Matches from './Matches.js';
import Header from './Header.js';

function BrowsePage(props) {
  return (
    <div>
      <Header/>
      <header>
        <h1>Browse</h1>
      </header>
      <div className="pure-g">
        <div classNAme="pure-u-1-5">
          <Favorites addFavorite={props.addFavorite}
                removeFavorite={props.removeFavorite}
                favorites={props.favorites}/>
        </div>
        <div className="pure-u-2-5">
          <Filters />
        </div>
        <div className="pure-u-2-5">
          <Matches />
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;
