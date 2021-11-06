import React from 'react';
import PlaysContext from './PlaysContextProvider.js';
import MatchItem from './MatchItem.js';

function Matches(props) {
  const {plays, getPlayByID, getGenres} = PlaysContext(PlaysContext).props.value;
  
  return (
    <section>
      <h1>Matches</h1>
      {
        plays.map(p => (
          <MatchItem key={p.id}
                     play={p} />
        ))
      }
    </section>
  );
}

export default Matches;
