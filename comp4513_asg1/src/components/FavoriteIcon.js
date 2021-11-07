import React, {useContext} from 'react';
import {FavoritesContext} from './FavoritesContextProvider.js';

function FavoriteIcon(props) {
  const favorites = useContext(FavoritesContext);
  let src;
  
  if (favorites.isFavorite(props.id)) {
    src = `${process.env.PUBLIC_URL}/favorite-selected.svg`;
  } else {
    src = `${process.env.PUBLIC_URL}/favorite-unselected.svg`;
  }

  function clickHandler(e) {
    if (favorites.isFavorite(props.id)) {
      favorites.removeFavorite(props.id);
    } else {
      favorites.addFavorite(props.id);
    }
  }
  
  return (
    <img className="pure-img"
         src={src}
         alt="Favorited"
         onClick={clickHandler}
    />
  );
}

export default FavoriteIcon;
