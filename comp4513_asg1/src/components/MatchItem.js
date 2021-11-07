import React from 'react';
import {Link} from 'react-router-dom';
import FavoriteIcon from './FavoriteIcon.js';

function MatchItem(props) {
  let play_link = `DetailsPage/${props.play.id}`;
  
  return (
    <tr>
      <td><Link to={play_link}>{props.play.title}</Link></td>
      <td>{props.play.genre}</td>
      <td>{props.play.likelyDate}</td>
      <td><FavoriteIcon id={props.play.id} /></td>
      <td><Link to={`DetailsPage/${props.play.id}`}><button className='pure-button'>View</button></Link></td>
    </tr>
  );
}

export default MatchItem;
