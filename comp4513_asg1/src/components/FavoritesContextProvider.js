import React, {createContext, useState} from 'react';


export const FavoritesContext = createContext();

function FavoritesProvider(props) {
  const [favorites, setFavorites] = useState([]);
  
  function addFavorite(id) {
    if (!favorites.includes(id)) {
      let newFavorites = [...favorites, id];
      setFavorites(newFavorites);
      console.log(`Adding favorite ${id}`);
    } else {
      console.log(`Not adding duplicate favorite: ${id}`);
    }
  }

  function removeFavorite(id) {
    if (favorites.includes(id)) {
      let newFavorites = [...favorites];
      if (favorites.includes(id)) {
        delete newFavorites[newFavorites.indexOf(id)];
        console.log(`Removing favorite ${id}`);
        setFavorites(newFavorites);
      }
    }
  }

  function isFavorite(id) {
    for (let f of favorites) {
      if (f === id) {
        return true;
      }
    }
    return false;
  }
  
  return (
    <FavoritesContext.Provider value={{favorites, addFavorite, removeFavorite, isFavorite}}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
