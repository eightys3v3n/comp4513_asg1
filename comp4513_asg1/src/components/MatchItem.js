import React from 'react';
import {Link} from 'react-router-dom';
import FavoriteIcon from './FavoriteIcon.js';

function MatchItem(props) {
  let play_link = `DetailsPage/${props.play.id}`;
  let additionalInfo = "";

  if (props.play.filename !== "") {
    // this is actually a unicode page of text character, don't delete.
    additionalInfo = "🖹"; // U+1F5B9
  }
  
  return (
    <tr>
      <td><Link style={{color:"black"}} to={play_link}>{props.play.title}</Link></td>
      <td>{props.play.genre}</td>
      <td>{props.play.likelyDate}</td>
      <td>{additionalInfo}</td>
      <td><FavoriteIcon id={props.play.id} /></td>
      <td><Link to={`DetailsPage/${props.play.id}`}><button className='pure-button'>View</button></Link></td>
    </tr>
  );
}

export default MatchItem;
