import React from 'react';
import Header from './Header';
import Favorites from './Favorites.js';
import PlayTitle from './PlayTitle';
import Details from './Details.js';
import { useParams } from "react-router-dom";
import { useState } from 'react';

function DetailsPage(props) {
  const [favDisplayed, setFavDisplayed] = useState(false);
  const [showHideFav, setShowHideFav] = useState("pure-u-4-24");
  const [matchesWidth, setMatchesWidth] = useState("pure-u-11-24");
  //const [matchesTransition, setMatchesTransition] = useState("matchesSmall");
    
  /* Inverts favDisplayed */
  function toggleFavVisibility(){

    //toggle the boolean variable
    setFavDisplayed(!favDisplayed);

    //toggle the favorite
    var css = (showHideFav === "favHidden") ? "pure-u-4-24" : "favHidden";
    setShowHideFav(css);

    setMatchesWidth((matchesWidth === "pure-u-15-24") ? "pure-u-11-24" : "pure-u-15-24");
    //setMatchesTransition((matchesTransition === "matchesLarge") ? "matchesSmall" : "matchesLarge");

  }
  
  // This 'playID' is the name of the play passed in from the url parameters
  const {playID} = useParams();
  const [selected, setSelected] = useState(null);

  return (
    <section id="Details-Page" className="page">
      <div className="pure-g margin">
        <div className="pure-u-24-24 grey">
          <Header/>
        </div>
        <button className="pure-button" style={{marginTop: "10px", marginBottom: "10px", width: "75px"}} onClick={toggleFavVisibility}>
            {favDisplayed ? "Open " : "Close"}
          </button>
        <div className={"grey " + showHideFav + " favTransition"}>
        <Favorites />
        </div>
        <div className="pure-u-6-24 grey">
        <PlayTitle playID={playID} selected={selected}/>
        </div>
        <div className={"grey " + matchesWidth + " matchesTransition"}>
        <Details selected={selected} setSelected={setSelected} playID={playID}/>
        </div>
      </div>
    </section>
  );
}

export default DetailsPage;
