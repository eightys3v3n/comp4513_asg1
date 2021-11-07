import React from 'react';


function FavoriteItem(props) {
  function removeFavorite(e) {
    props.removeFavorite(props.play.id);
  }
  
  return (<div className="list-item">
            <div className="title">{props.play.title}</div>
            <button className='pure-button'
                    onClick={removeFavorite}>Remove</button>
          </div> );

}

export default FavoriteItem;
