import React from 'react';
import Header from './Header';
import Favorites from './Favorites.js';
import PlayTitle from './PlayTitle';
import Details from './Details.js';

function DetailsPage(props) {
  return (
    <section id="Details-Page">
      <div className="pure-g margin">
        <div className="pure-u-24-24 grey">
          <Header/>
        </div>
        <div className="pure-u-4-24 grey">
        <Favorites />
        </div>
        <div className="pure-u-9-24 grey">
        <PlayTitle />
        </div>
        <div className="pure-u-9-24 grey">
        <Details />
        </div>
      </div>
    </section>
  );
}

export default DetailsPage;
