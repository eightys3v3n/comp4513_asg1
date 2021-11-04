import React from 'react';
import Favorites from './Favorites.js';
import Filters from './Filters.js';
import Matches from './Matches.js';

function BrowsePage(props) {
  return (
    <div>
      <header>
        <h1>Browse</h1>
      </header>
      <Favorites addFavorite={props.addFavorite}
                 removeFavorite={props.removeFavorite}
                 favorites={props.favorites}
      />
      <Filters />
      <Matches />
    </div>
  );
}

export default BrowsePage;
