import React from 'react';
import Header from './Header';
import Favorites from './Favorites.js';
import PlayTitle from './PlayTitle';
import Details from './Details.js';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import PlayInfoProvider from './PlaysInfoContextProvider';

function DetailsPage(props) {
  // This 'playID' is the name of the play passed in from the url parameters
  const {playID} = useParams();
  const [selected, setSelected] = useState(null);
  const [act, setAct] = useState();
  const [scene, setScene] = useState();
  const [character, setCharacter] = useState();
  const [query, setQuery] = useState();


  return (
    <PlayInfoProvider>
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
    </PlayInfoProvider>
  );
}

export default DetailsPage;
