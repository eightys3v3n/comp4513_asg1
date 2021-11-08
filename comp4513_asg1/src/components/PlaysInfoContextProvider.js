import React, {createContext, useContext, useState, useEffect} from 'react';
import {PlaysContext} from './PlaysContextProvider.js';


export const PlayInfoContext = createContext([]);

function PlayInfoProvider({children}) {
  const LOCAL_STORAGE_KEY = 'playInfos';
  const plays = useContext(PlaysContext);
  const [playInfos, setPlayInfos] = useState([]);
  const API_URL = "https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=";
  

  useEffect(() => {
    let localPlayInfos = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (localPlayInfos != null) {
      try {
        localPlayInfos = JSON.parse(localPlayInfos);
        if (localPlayInfos.length > 0) {
          console.log(`Retrieved ${localPlayInfos.length} play's info from local storage`);
          setPlayInfos(localPlayInfos);
          return;
        }
      } catch (e) {
        console.warn("Failed to parse locally stored play info. Value is :");
        console.log(localPlayInfos);
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    saveLocalStorage();
  }, [plays]);

  
  function getPlayInfo(id) {
    for (let playInfo of playInfos) {
      if (playInfo &&
          playInfo.id !== undefined &&
          playInfo.id == id) {
        return playInfo;
      }
    }
    return {}
  }

  function addPlayInfo(playInfo) {
    console.log("Adding play info");
    console.log(playInfo);
    let newPlayInfos = [...playInfos, playInfo];
    setPlayInfos(newPlayInfos);
  }

  function fetchPlayInfo(id) {
    let play = plays.getByID(id);

    if (play === null) {
      console.warn(`No play for this ID, refusing to fetch from secondary API: ${id}`);
      return;
    }
    if (play.filename === undefined ||
        play.filename == "") {
      console.warn(`No known file name for this play, refusing to fetch from secondary API: ${play.id}`);
      return;
    }

    let url = `${API_URL}${id}`;

    console.log(`Fetching '${url}'`);
    
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        data.id = id;
        addPlayInfo(data);
        return data;
      });
  }

  function saveLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify());
  }

  return (
    <PlayInfoContext.Provider value={{playInfos, getPlayInfo, fetchPlayInfo}}>
      {children}
    </PlayInfoContext.Provider>
  );
}

export default PlayInfoProvider;
