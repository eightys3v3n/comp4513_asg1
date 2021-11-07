import React, {useContext} from 'react';
import {PlaysContext} from './PlaysContextProvider.js';

function Filters(props) {
  const plays = useContext(PlaysContext);
  let titleQuery = null;
  let yearRange = {min: null,
                     max: null};
  let genre = null;
  
  function applyFilters(e) {
    // supress the page reloading on using a submit button,
    // but allow the reset button to reset fields normally.
    if (e.target.type !== "reset") {
      e.preventDefault();
    }
    
    const func = () => { // because if passed a function, setFilter calls it.
      return play => {
        // if any of these if statements, then remove the play.
        if (titleQuery !== null &&
            !play.title.match(titleQuery)) {
          return false;
        }
        if (yearRange.min !== null &&
            play.likelyDate < yearRange.start) {
          return false;
        }
        if (yearRange.max !== null &&
            play.likelyDate > yearRange.end) {
          return false;
        }
        if (genre !== null &&
            play.genre !== genre) {
          return false;
        }
        
        return true;
      };
    };

    plays.setFilter(func);
  }

  function resetFilters(e) {
    console.log("resetting filters");
    titleQuery = null;
    yearRange.min = null;
    yearRange.max = null;
    genre = null;

    applyFilters(e);
  }

  function inputHandler(e) {
    switch (e.target.id) {
    case "title":
      titleQuery = e.target.value;
      break;
    case "minYear":
      yearRange.min = parseInt(e.target.value);
      break;
    case "maxYear":
      yearRange.max = parseInt(e.target.value);
      break;
    case "genre":
      genre = e.target.value;
      break;
    }
  }

  return (
    <section id='Filter-Section' className="padding">

      <form className="pure-form pure-form-stacked">
          <h2>Play Filters</h2>
        <div>
          <label>Title:  </label>
          <input id="title"
                 type="text"
                 name="title"
                 placeholder="Regex Here"
                 onChange={inputHandler}/><br/>

          <label>Min Year:  </label> 
          <input type="number"
                 id="minYear"
                 onChange={inputHandler}/><br/>

          <label>Max Year:  </label>
          <input type="number"
                 id="maxYear"
                 onChange={inputHandler}/><br/>

          <label>Genre:  </label>
          <select id="genre"
                  onChange={inputHandler}>
            <option key="0"
                    id="0">No Selection</option>  

            {
            /* gets all the genres from the plays context provider */
            }

              {plays.getGenres().map(g => {
                return (<option key={g} id={g}>{g}</option>)
              })
            }
            

          </select>
        </div>
        <div style={{width: "50%", margin: "0 auto"}}>
          <button className="pure-button pure-button-primary"
                  style={{margin: "15px"}}
                  onClick={applyFilters}
          >Filter</button>
          <button type="reset"
                  className="pure-button"
                  onClick={resetFilters}
          >Reset</button>   
        </div>       
      </form>
    </section>);
}

export default Filters;
