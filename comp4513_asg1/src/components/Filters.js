import React from 'react';
import PlaysContext from './PlaysContextProvider.js';

function Filters(props) {
  const {plays, getPlayByID, getGenres} = PlaysContext(PlaysContext).props.value;

  return (
    <section id='Filter-Section' className="padding">

      <form className="pure-form pure-form-stacked">
          <h2>Play Filters</h2>
        <div>
          <label>Title:  </label>
          <input id="title" type="text" name="title"/><br/>

          <label>Min Year:  </label> 
          <input type="number" id="minYear"/><br/>

          <label>Max Year:  </label>
          <input type="number" id="maxYear"/><br/>

          <label>Genre:  </label>
          <select id="genre">
            <option key="0" id="0">No Selection</option>  

            {
            /* gets all the genres from the plays context provider */
            }

              {getGenres().map(g => {
                return (<option key={g} id={g}>{g}</option>)
              })
            }
            

          </select>
        </div>
        <div style={{width: "50%", margin: "0 auto"}}>
          <button type="submit" className="pure-button pure-button-primary" style={{margin: "15px"}}>Filter</button>
          <button type="reset" className="pure-button">Reset</button>   
        </div>       
      </form>
    </section>);
}

export default Filters;
