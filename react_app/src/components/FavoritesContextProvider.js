import React, {createContext, useEffect, useState} from 'react';


export const FavoritesContext = createContext();

function FavoritesProvider(props) {
  const [favorites, setFavorites] = useState([]);
  const LOCAL_STORAGE_KEY = 'favs';
 
  useEffect(() => {
    let localFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
    
    if (localFavorites != null) {
      let favs = JSON.parse(localFavorites);
      if (favs.length > 0) {
        console.log(`Retrieved ${favs.length} favorites from local storage`);
        console.log({favs});
        
        // let newFavorites = [];
        // for (const fav of localFavorites) {
        //   newFavorites = [...localFavorites, fav];
        // }
        setFavorites(favs);

      }
    }
  }, []);
  
  function addFavorite(id) {
    if (!favorites.includes(id)) {
      let newFavorites = [...favorites, id];
      setFavorites(newFavorites);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));

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
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
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
