import React, {useContext} from 'react';
import {useState} from "react";
import {PlaysContext} from './PlaysContextProvider.js';
import { useEffect } from 'react';
import FavoriteIcon from './FavoriteIcon.js';
import { Link } from 'react-router-dom';

function PlayTitle(props) {
  const [playTitle, setPlayTitle] = useState("");
  const [playSynopsis, setPlaySynopsis] = useState("");
  const [selected, setSelected] = useState(null);
  const plays = useContext(PlaysContext);
  const playObj = plays.getByID(props.playID);
  
  useEffect(() => { 
    if (playObj !== null) {
      setPlayTitle(playObj.title);
      setPlaySynopsis(playObj.synopsis);
    }
  }, [plays]);

  let playTitleContent;
  if (props.selected !== "Tab3") {
    playTitleContent = (
      <div>{playSynopsis}</div>
    )
  } else {
    playTitleContent = (
      <div>Placeholder for other stuff</div>
    )
  }
  
  return (
    <section id='Filter-Section' className="padding">
      <h2>{playTitle}</h2>
      {playTitleContent}
      <div className="flex-row">
        <FavoriteIcon id={props.playID} />
        <Link to="/BrowsePage" className="margin"><button className='pure-button'>Close</button></Link>
      </div>
    </section>);
}

export default PlayTitle;
