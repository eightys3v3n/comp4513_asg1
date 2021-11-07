import React, {useContext} from 'react';
import {PlaysContext} from './PlaysContextProvider.js';
import MatchItem from './MatchItem.js';

function Matches(props) {
  const plays = useContext(PlaysContext);

  return (
    <section className="overflow">
      <h2 style={{marginLeft: "15px"}}>Matches</h2>
      <table className="pure-table" >
        <thead>
          <tr className="table-header">
            <th className="pure-button">Title</th>
            <th>Genre</th>
            <th className="pure-button">Year</th>
            <th >Favorites</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {
            plays.plays.map(p => (
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
