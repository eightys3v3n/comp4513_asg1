import React from 'react';
import PlaysContext from './PlaysContextProvider.js';

function PlayTitle(props) {
  const {plays, getPlayByID, getGenres} = PlaysContext(PlaysContext).props.value;

  return (
    <section id='Filter-Section' className="padding">
      <h3>Play Title</h3>
    </section>);
}

export default PlayTitle;
