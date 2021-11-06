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

  function getPlayByID(id) {
    for (const play of plays) {
      if (play.id === id) {
        return play;
      }
    }
  }

  return (
    <PlaysContext.Provider value={plays, getPlayByID}>
      {children}
    </PlaysContext.Provider>
  );
}

export default PlaysProvider;
