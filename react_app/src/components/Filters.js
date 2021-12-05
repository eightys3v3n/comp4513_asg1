import React, {useContext, useEffect, useState} from 'react';
import {PlaysContext} from './PlaysContextProvider.js';

function Filters(props) {
  const plays = useContext(PlaysContext);
  let [yearRange, setYearRange] = useState({min: null,
                                            max: null});
  let [genre, setGenre] = useState(null);
  let [reset, setReset] = useState(false);
  
  // warning about missing dependancy but adding it or removing [] breaks it.
  // this should only run once when the component is mounted.
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // warning about missing dependancy but adding it or removing [reset] breaks it.
  // this should only run once when the reset button is pressed.
  useEffect(() => {
    applyFilters();
    setReset(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  /**
   * Creates a function to pass to .filter to enact all the selected filters.
   * Saves that function into plays.filter.
   */
  function applyFilters(e) {
    // supress the page reloading on using a submit button,
    // but allow the reset button to reset fields normally.
    if (e !== undefined &&
        e.target.type !== "reset") {
      e.preventDefault();
    }

    // Needs to be a function returning a function because plays.setFilter(func)
    // saves the result of running func into the variable, not func itself.
    const func = () => {
      return play => {
        // if any of these if statements are true, then remove the play.
        if (props.title !== "" &&
            !play.title.match(props.title)) {
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

  /**
   * Reset button resets input components, we need to reset the
   * saved state to match the newly empty input components.
   */
  function resetFilters(e) {
    props.setTitle("");
    setYearRange({min: null,
                  max: null});
    setGenre(null);
    setReset(true);
  }

  function inputHandler(e) {
    switch (e.target.id) {
    case "title":
      props.setTitle(e.target.value);
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
      if (e.target.value === "No Selection") {
        setGenre(null);
      } else {
        setGenre(e.target.value);
      }
      break;

    default:
      console.log("This input handler was used on an unimplemented input component.");
      console.log(e.target);
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
                 value={props.title}
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
                  style={{margin: "10px"}}
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
