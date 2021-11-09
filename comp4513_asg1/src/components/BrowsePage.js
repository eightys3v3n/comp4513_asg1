import React, {useState} from 'react';
import Favorites from './Favorites.js';
import Filters from './Filters.js';
import Matches from './Matches.js';
import Header from './Header.js';




function BrowsePage(props) {
  const [favDisplayed, setFavDisplayed] = useState(false);
  const [showHideFav, setShowHideFav] = useState("pure-u-4-24");
  const [matchesWidth, setMatchesWidth] = useState("pure-u-10-24");
  //const [matchesTransition, setMatchesTransition] = useState("matchesSmall");
    
  /* Inverts favDisplayed */
  function toggleFavVisibility(){

    //toggle the boolean variable
    setFavDisplayed(!favDisplayed);

    //toggle the favorite
    var css = (showHideFav === "favHidden") ? "pure-u-4-24" : "favHidden";
    setShowHideFav(css);

    setMatchesWidth((matchesWidth === "pure-u-14-24") ? "pure-u-10-24" : "pure-u-14-24");
    //setMatchesTransition((matchesTransition === "matchesLarge") ? "matchesSmall" : "matchesLarge");

  }

  return (
    <div className="page">
      <div className="pure-g margin" >
        <div className="pure-u-24-24 grey">
          <Header/>
        </div>
          <button className="pure-button" style={{marginTop: "10px", marginBottom: "10px", width: "75px"}} onClick={toggleFavVisibility}>
            {favDisplayed ? "Open " : "Close"}
          </button>
        <div className={"grey " + showHideFav + " favTransition"}>
          <Favorites />
        </div>
        <div className="pure-u-7-24 grey">
          <Filters title={props.title}
                   setTitle={props.setTitle}/>
        </div>
        <div className={"grey " + matchesWidth + " matchesTransition "}>

          <Matches />
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;
