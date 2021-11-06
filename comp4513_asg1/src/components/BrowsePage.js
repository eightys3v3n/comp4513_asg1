import React from 'react';
import Favorites from './Favorites.js';
import Filters from './Filters.js';
import Matches from './Matches.js';
import Header from './Header.js';

function BrowsePage(props) {
  return (
    <div>
      <Header/>
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
