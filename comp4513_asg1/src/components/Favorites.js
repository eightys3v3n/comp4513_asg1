import React, {useContext} from 'react';
import FavoriteItem from './FavoriteItem.js';
import {FavoritesContext} from './FavoritesContextProvider.js';
import {PlaysContext} from './PlaysContextProvider.js';

function Favorites(props) {
  const favorites = useContext(FavoritesContext);
  const plays = useContext(PlaysContext);
  
  return (
    <section id="favorites" className="padding">
      <h2>Favorites</h2>
      <div className="list">{
          favorites.favorites.map(f => {
            let play = plays.getByID(f);
            
            if ( play && Object.keys(play).length !== 0 && Object.getPrototypeOf(plays) === Object.prototype) {
              return (
                <FavoriteItem key={play.id}
                              play={play}
                              removeFavorite={favorites.removeFavorite}
                />
              );
            }
            
            return null; // map expects a return otherwise it warns.
          })
      }</div>
    </section>
  );
}

export default Favorites;
