import React from 'react';

function Filters(props) {
  return (
    <section id='Filter-Section'>
      <form class="pure-form">
          <h3>Play Filters</h3>
        <div>
          <label>Title</label>
          <input id="title" type="text" name="title"/>

          <legend>Year</legend>
          <label for="minYear">Min:</label> 
          <input type="number" id="minYear"/>
          <label for="maxYear">Max:</label>
          <input type="number" id="maxYear"/>

          <legend>Genre</legend>
          <select id="genre">
            <option id="0">No Selection</option>  
            
            {/* Loop through set creating new options setting:
             - id
             - innerHTML */}

          </select><br/><br/>
        </div>

          <button type="submit" class="pure-button pure-button-primary">Filter</button>
          <button type="reset" class="pure-button">Reset</button>          
      </form>
    </section>);
}

export default Filters;
