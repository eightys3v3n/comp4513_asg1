import React from 'react';


function FavoriteItem(props) {
  function removeFavorite(e) {
    console.log(`Would call context provider to remove favorite ${props.play.id}`);
  }
  
  
  return (<div className="list-item">
            <div className="title">{props.play.title}</div>
            <button onClick={removeFavorite}>Remove</button>
          </div> );

}

export default FavoriteItem;
