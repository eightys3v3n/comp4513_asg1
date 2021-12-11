import React from 'react';
import Button from '@mui/material/Button';

function FavoriteItem(props) {
  function removeFavorite(e) {
    props.removeFavorite(props.play.id);
  }
  
  return (<div className="list-item">
            <div className="title">{props.play.title}</div>
            <Button variant='contained' color='inherit'
              onClick={removeFavorite}>Remove</Button>
          </div> );

}

export default FavoriteItem;
