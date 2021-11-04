import {createContext, useState} from 'react';


export const FavoritesContext = createContext();

function FavoritesContextProvider(props) {
  const [favorites, setFavorites] = useState([]);
  
  return (
    <FavoritesContext.Provider value={{favorites, setFavorites}}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;

//  const [favorites, setFavorites] = useState([]);
  
//  function addFavorite(id) {
//    console.log(`Adding favorite ${id}`);
//  }

//  function removeFavorite(id) {
//    console.log(`Removing favorite ${id}`);
//  }

