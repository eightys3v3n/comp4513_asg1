import React from 'react';

function MatchItem(props) {
  console.log(props.play);
  
  return (
    <p>{props.play.title}</p>
  );
}

export default MatchItem;
