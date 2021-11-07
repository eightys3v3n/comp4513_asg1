import React from 'react';
import PlaysContext from './PlaysContextProvider.js';
import MatchItem from './MatchItem.js';

function Matches(props) {
  const {plays, getPlayByID, getGenres} = PlaysContext(PlaysContext).props.value;

  return (
    <section>
      <h1>Matches</h1>
      <table className="pure-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Likely Year</th>
            <th>Favorites</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {
            plays.map(p => (
              <MatchItem key={p.id}
                         play={p} />
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default Matches;
