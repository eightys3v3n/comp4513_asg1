import React from 'react';
import Header from './Header';
import Favorites from './Favorites.js';
import PlayTitle from './PlayTitle';
import Details from './Details.js';
import { useParams } from "react-router-dom";
import { useState } from 'react';

function DetailsPage(props) {
  // This 'playID' is the name of the play passed in from the url parameters
  const {playID} = useParams();
  const [selected, setSelected] = useState(null);

  return (
    <section id="Details-Page" className="page">
      <div className="pure-g margin">
        <div className="pure-u-24-24 grey">
          <Header/>
        </div>
        <div className="pure-u-4-24 grey">
        <Favorites />
        </div>
        <div className="pure-u-9-24 grey">
        <PlayTitle playID={playID} selected={selected}/>
        </div>
        <div className="pure-u-9-24 grey">
        <Details selected={selected} setSelected={setSelected} playID={playID}/>
        </div>
      </div>
    </section>
  );
}

export default DetailsPage;
