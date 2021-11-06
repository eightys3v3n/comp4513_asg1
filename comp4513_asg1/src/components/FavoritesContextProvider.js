import React, {createContext, useState} from 'react';


export const FavoritesContext = createContext([]);

function FavoritesProvider({children}) {
  const [favorites, setFavorites] = useState(['alls_well_that_ends_well','antony_and_cleopatra']);

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
      delete newFavorites[newFavorites.indexOf(id)];
      setFavorites(newFavorites);
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
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
