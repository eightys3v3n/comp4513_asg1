import React from 'react';
import FavoritesContext from './FavoritesContextProvider.js';

function FavoriteIcon(props) {
  const {isFavorite, addFavorite, removeFavorite} = FavoritesContext(FavoritesContext).props.value;
  let src;
  
  if (isFavorite(props.id)) {
    src = `${process.env.PUBLIC_URL}/favorite-selected.svg`;
  } else {
    src = `${process.env.PUBLIC_URL}/favorite-unselected.svg`;
  }

  function clickHandler(e) {
    if (isFavorite(props.id)) {
      removeFavorite(props.id);
    } else {
      addFavorite(props.id);
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
