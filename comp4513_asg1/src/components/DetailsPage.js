import React from 'react';
import Header from './Header';
import Favorites from './Favorites.js';
import PlayTitle from './PlayTitle';
import Details from './Details.js';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import PlayInfoProvider from './PlaysInfoContextProvider';

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
  const [act, setAct] = useState("ACT I");
  const [scene, setScene] = useState("SCENE I");
  const [character, setCharacter] = useState("");
  const [query, setQuery] = useState(null);

  return (
    <PlayInfoProvider>
      <section id="Details-Page" className="page background" style={{height:"100vh"}}>
        <div className="pure-g margin" style={{height:"100vh"}}>
          <div className="pure-u-24-24 grey" style={{marginRight:"40px"}}>
            <Header/>
          </div>
          <button className="pure-button-primary" style={{marginTop: "10px", marginBottom: "10px", width: "75px"}} onClick={toggleFavVisibility}>
              {favDisplayed ? "Open " : "Close"}
            </button>
          <div className={"grey " + showHideFav + " favTransition"} style={{minHeight:"70vh"}}>
          <Favorites />
          </div>
          <div className="pure-u-6-24 grey">
          <PlayTitle playID={playID} selected={selected} information={{act, setAct, scene, setScene, character, setCharacter, query, setQuery}}/>
          </div>
          <div className={"grey " + matchesWidth + " matchesTransition"}>
          <Details selected={selected} setSelected={setSelected} playID={playID}/>
          </div>
        </div>
      </section>
    </PlayInfoProvider>
  );
}

export default DetailsPage;
