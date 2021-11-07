import React from 'react';
import Favorites from './Favorites.js';
import Filters from './Filters.js';
import Matches from './Matches.js';
import Header from './Header.js';

function BrowsePage(props) {
  return (
    <div>
      <div className="pure-g margin" >
        <div className="pure-u-23-24 grey">
          <Header/>
        </div>
        <div className="pure-u-4-24 grey">

          <Favorites />
        </div>
        <div className="pure-u-9-24 grey">
          <Filters title={props.title}
                   setTitle={props.setTitle}/>
        </div>
        <div className="pure-u-9-24 grey">

          <Matches />
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;
