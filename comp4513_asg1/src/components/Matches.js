import React, {useContext, useState} from 'react';
import {PlaysContext} from './PlaysContextProvider.js';
import MatchItem from './MatchItem.js';

function Matches(props) {
  const plays = useContext(PlaysContext);
  let filteredPlays = plays.plays.filter(plays.filter);
  let [sortMode,setSortMode] = useState(0);
  let sortedPlays = [];

  //testing
  //sortedPlays=filteredPlays;

  /* This if statement changes how the plays are sorted based on the current sortMode */
  if(sortMode===0){//sort by Title ascending
    sortedPlays = filteredPlays.sort((a, b) => a.title.localeCompare(b.title));
                                  //comparator function

  } else if(sortMode===1){//sort by Title descending
    sortedPlays = filteredPlays.sort((a, b) => b.title.localeCompare(a.title));

  } else if (sortMode===2){//sort by Year ascending
    sortedPlays = filteredPlays.sort((a, b) => a.likelyDate - b.likelyDate);

  } else if (sortMode===3){//sort by Year descending
    sortedPlays = filteredPlays.sort((a, b) => b.likelyDate - a.likelyDate);

  } else {
    sortedPlays=filteredPlays;
    console.error("Sort Mode: "+sortMode);
  }


  /* Changes the sortMode variable based on the button that was pressed 
  (and what the state was before it was pressed) */
  function changeSort(e) {
    if(e.target.id === "title" && sortMode!==1) //currently ascending
      setSortMode(1);
    else if(e.target.id === "title" && sortMode!==0) //currently descending
      setSortMode(0);
    else if(e.target.id === "year" && sortMode!==3)//currently ascending
      setSortMode(3);
    else if(e.target.id === "year" && sortMode!==2)//currently descending
      setSortMode(2);
    else {
      console.error("SortMode: "+sortMode+" // e.target.id: "+e.target.id);
    }
    
  }



  return (
    <section className="overflow">
      <h2 style={{marginLeft: "15px"}}>Matches</h2>
      <table className="pure-table" >
        <thead>
          <tr className="table-header">
            <th><button className="tab"
                        id="title"
                        onClick={changeSort}>Title</button></th>
            <th>Genre</th>
            <th><button className="tab"
                        id="year"
                        onClick={changeSort}>Year</button></th>
            <th></th>
            <th>Favorites</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {
            sortedPlays.map(p => (
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
