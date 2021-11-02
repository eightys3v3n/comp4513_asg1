import React from 'react';

function Favorites(props) {
  return (
    <div>
      <h2>Favorites</h2>
      <div>
        { props.favorites.map(fav => {
            return (
              <p>fav</p>
            );
          })
        }
      </div>
    </div>
  );
}

export default Favorites;
