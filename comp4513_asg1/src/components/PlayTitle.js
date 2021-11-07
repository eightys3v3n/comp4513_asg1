import React from 'react';
import PlaysContext from './PlaysContextProvider.js';

function PlayTitle(props) {
  const {plays, getPlayByID, getGenres} = PlaysContext(PlaysContext).props.value;

  return (
    <section id='Filter-Section' className="padding">
      <h2>Play Title</h2>
    </section>);
}

export default PlayTitle;
