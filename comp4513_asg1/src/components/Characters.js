import React, {useContext, useState, useEffect} from 'react';
import {PlayInfoContext} from './PlaysInfoContextProvider';


function Characters(props) {
  const playInfo = useContext(PlayInfoContext);
  const [play, setPlay] = useState({});
  
  useEffect(() => {
    let currPlay = playInfo.getPlayInfo(props.playID);

    if (currPlay &&
        Object.keys(currPlay).length !== 0 &&
        Object.getPrototypeOf(currPlay) === Object.prototype)
    {
      setPlay(currPlay);
    } else {
      playInfo.fetchPlayInfo(props.playID)
        .then(play => {
          setPlay(play);
        });
    }
  }, []);

  return (
    <PlayCharacters play={play} />
  );
}

function PlayCharacters(props) {
  let characters = [];
  
  if (props.play.persona !== undefined &&
      props.play.personal !== null) {
    characters = props.play.persona;
  }

  characters = characters.sort((a, b) =>
    parseInt(a.position) - parseInt(b.position));
  for (let c=0; c<characters.length; c++) {
    characters[c].key = c;
  }
  
  return (
    <div className="overflow" style={{height:"65vh"}}>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody className="overflow">
        {characters.map(c => {
          return (
            <tr key={c.key}>
              <td>{c.position}</td>
              <td>{c.player}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}

export default Characters;
