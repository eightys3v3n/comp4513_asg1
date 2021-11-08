import React from 'react';
import PlaysContext from './PlaysContextProvider.js';
import {useState} from "react";

function PlayTitle(props) {
  const {plays, getPlayByID, getGenres} = PlaysContext(PlaysContext).props.value;
  const [playName] = useState("");

  return (
    <section id='Filter-Section' className="padding">
      <h2>Play Title: {props.playName}</h2>
    </section>);
}

export default PlayTitle;
