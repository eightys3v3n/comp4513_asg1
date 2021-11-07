import React, {createContext, useState, useEffect} from 'react';


export const PlaysContext = createContext([]);

function PlaysProvider({children}) {
  const [plays, setPlays] = useState([]);
  let url = "https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/list.php";
  
  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setPlays(data);
        console.log("Retrieved data");
        console.log(data);
      })
  }, []);

  function getByID(id) {
    for (const play of plays) {
      if (play.id === id) {
        return play;
      }
    }
    return null;
  }

  function getGenres() {
    let genres = new Set();

    for (let p of plays) {
      genres.add(p.genre);
    }

    genres = Array.from(genres);
    
    return genres;
  }

  return (
    <PlaysContext.Provider value={{plays, getByID, getGenres}}>
      {children}
    </PlaysContext.Provider>
  );
}

export default PlaysProvider;
