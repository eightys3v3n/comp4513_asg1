import React, {useContext, useState, useEffect} from 'react';
import {PlayInfoContext} from './PlaysInfoContextProvider';


function Characters(props) {
  const playInfo = useContext(PlayInfoContext);
  const [play, setPlay] = useState({});
  
  console.log(playInfo);

  useEffect(() => {
    let currPlay = playInfo.getPlayInfo('dream');

    if (currPlay &&
        Object.keys(currPlay).length !== 0 &&
        Object.getPrototypeOf(currPlay) === Object.prototype)
    {
      setPlay(currPlay);
    } else {
      playInfo.fetchPlayInfo('dream')
        .then(play => {
          console.log(play);
          setPlay(play);
        });
    }
  }, []);
  
  return (
    <p>{play.title}</p>
  );
}

export default Characters;
