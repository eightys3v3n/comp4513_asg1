import React, {useContext} from 'react';
import FavoriteItem from './FavoriteItem.js';
import {FavoritesContext} from './FavoritesContextProvider.js';
import {PlaysContext} from './PlaysContextProvider.js';

function Favorites(props) {
  const favorites = useContext(FavoritesContext);
  const plays = useContext(PlaysContext);
  
  function playByID(id) {
    for (let p=0; p<plays.plays.length; p++) {
      if (plays.plays[p].id === id) {
        return plays.plays[p];
      }
    }

    return null;
  }
  
  return (
    <section id="favorites" className="padding">
      <h2>Favorites</h2>
      <div className="list">{
          favorites.favorites.map(f => {
            let play = playByID(f);

            if (play !== null) {
              return (
                <FavoriteItem key={play.id}
                              play={play}
                              removeFavorite={favorites.removeFavorite}
                />
              );
            } else {
              console.warn(`Couldn't find the info for favorite id ${f}`);
            }
          })
      }</div>
    </section>
  );
}

export default Favorites;
