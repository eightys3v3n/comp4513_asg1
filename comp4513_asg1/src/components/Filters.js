import React, {useContext, useEffect, useState} from 'react';
import {PlaysContext} from './PlaysContextProvider.js';

function Filters(props) {
  const plays = useContext(PlaysContext);
  if (props.title === undefined) {
    console.log("NOOOO");
  }
  let [titleQuery, setTitleQuery] = useState(props.title);
  let [yearRange, setYearRange] = useState({min: null,
                                            max: null});
  let [genre, setGenre] = useState(null);
  let [reset, setReset] = useState(false);
  
  useEffect(() => {
    titleQuery = props.title;
    applyFilters();
  }, []);

  useEffect(() => {
    applyFilters();
    setReset(false);
  }, [reset]);
  
  function applyFilters(e) {
    // supress the page reloading on using a submit button,
    // but allow the reset button to reset fields normally.
    if (e !== undefined &&
        e.target.type !== "reset") {
      e.preventDefault();
    }
    
    const func = () => { // because if passed a function, setFilter calls it.
      return play => {
        // if any of these if statements, then remove the play.
        if (titleQuery !== "" &&
            !play.title.match(titleQuery)) {
          return false;
        }
        if (yearRange.min !== null &&
            parseInt(play.likelyDate) < yearRange.min) {
          return false;
        }
        if (yearRange.max !== null &&
            parseInt(play.likelyDate) > yearRange.max) {
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
    setTitleQuery("");
    setYearRange({min: null,
                  max: null});
    setGenre(null);
    setReset(true);
  }

  function inputHandler(e) {
    switch (e.target.id) {
    case "title":
      setTitleQuery(e.target.value);
      break;
    case "minYear":
      setYearRange({min: parseInt(e.target.value),
                    max: yearRange.max});
      break;
    case "maxYear":
      setYearRange({min: yearRange.min,
                    max: parseInt(e.target.value)});
      break;
    case "genre":
      setGenre(e.target.value);
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
                 value={titleQuery}
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
              plays.getGenres().map(g => {
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
