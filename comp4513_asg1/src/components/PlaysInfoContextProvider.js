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
    
    if (localPlayInfos !== null &&
        localPlayInfos !== undefined) {
      try {
        localPlayInfos = JSON.parse(localPlayInfos);
        console.log(localPlayInfos);
        if (localPlayInfos.length > 0) {
          console.log(`Retrieved ${localPlayInfos.length} play's info from local storage`);
          setPlayInfos(localPlayInfos);
          return;
        } else {
          console.log("Retrieved no play's info from local storage");
        }
      } catch (e) {
        console.warn("Failed to parse locally stored play info. Value is following");
        console.log(localPlayInfos);
        saveLocalStorage();
      }
    } else {
      console.log("Retrieved no play's info from local storage");
    }
    // this effect should Not update when saveLocalStorage is called or when the return changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveLocalStorage();
    // this effect should Not update when saveLocalStorage is called or when the return changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playInfos]);

  
  function getPlayInfo(id) {
    console.log(`Getting local copy of play info for play '${id}'`);
    for (let playInfo of playInfos) {
      if (playInfo &&
          playInfo.id !== undefined &&
          playInfo.id === id) {
        return playInfo;
      }
    }
    return {}
  }

  function addPlayInfo(playInfo) {
    let newPlayInfos = [...playInfos, playInfo];
    setPlayInfos(newPlayInfos);
  }

  function fetchPlayInfo(id) {
    let play = plays.getByID(id);

    if (play === null) {
      console.warn(`No play info for this ID, refusing to fetch from secondary API: ${id}`);
      return;
    }

    let url = `${API_URL}${id}`;

    console.log(`Fetching API copy of play info for play '${id}'`);
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        data.id = id;
        addPlayInfo(data);
        return data;
      });
  }

  function saveLocalStorage() {
    if (playInfos !== undefined &&
        playInfos.length !== undefined &&
        playInfos.length > 0) {
      console.log(`Saving ${playInfos.length} play's info to local storage`);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playInfos));
    }
  }

  return (
    <PlayInfoContext.Provider value={{playInfos, getPlayInfo, fetchPlayInfo}}>
      {children}
    </PlayInfoContext.Provider>
  );
}

export default PlayInfoProvider;
