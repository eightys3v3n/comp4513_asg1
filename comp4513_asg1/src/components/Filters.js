import React from 'react';
import PlaysContext from './PlaysContextProvider.js';

function Filters(props) {
  const {plays, getPlayByID, getGenres} = PlaysContext(PlaysContext).props.value;

  return (
    <section id='Filter-Section'>
      <form class="pure-form pure-form-stacked">
          <h2>Play Filters</h2>
        <div style={{margin: "0px"}}>
          <label>Title:  </label>
          <input id="title" type="text" name="title"/><br/>

          <label>Min Year:  </label> 
          <input type="number" id="minYear"/><br/>

          <label>Max Year:  </label>
          <input type="number" id="maxYear"/><br/>

          <label>Genre:  </label>
          <select id="genre">
            <option id="0">No Selection</option>  
            
            {/* Loop through set creating new options setting:
             - id
             - innerHTML */}
            
            {
              /* I'm not sure how to invoke getGenres() to iterate through the set */

              /*
              <Option id={p.id} name={p.name}>
                {p.name}
              </Option>
              */
            }
            

          </select>
        </div>
        <div style={{width: "50%", margin: "0 auto"}}>
          <button type="submit" classname="pure-button pure-button-primary" style={{margin: "15px"}}>Filter</button>
          <button type="reset" classname="pure-button">Reset</button>   
        </div>       
      </form>
    </section>);
}

export default Filters;
