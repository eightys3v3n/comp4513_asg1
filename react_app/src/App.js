import './App.css';
import { useState } from 'react';
import { Route } from 'react-router';
import HomePage from './components/HomePage.js';
import BrowsePage from './components/BrowsePage.js';
import DetailsPage from './components/DetailsPage.js';
import FavoritesProvider from './components/FavoritesContextProvider.js';
import PlaysProvider from './components/PlaysContextProvider.js';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

const App = (props) => {
  let [titleFilter, setTitleFilter] = useState("");
  
  return (
      <div className="App">
      <header className="App-header"></header>
        <div>
          <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition
                key={location.key}
                timeout={1000}
                classNames="fade">
            <PlaysProvider location={location}>
              <Route path="/" exact>
                <HomePage title={titleFilter}
                          setTitle={setTitleFilter}/>
              </Route>
              <FavoritesProvider location={location}>
                <Route path="/BrowsePage">
                  <BrowsePage title={titleFilter} setTitle={setTitleFilter} />
                </Route>
                <Route path="/DetailsPage/:playID" exact component={DetailsPage} />
              </FavoritesProvider>
            </PlaysProvider>
            </CSSTransition>
          </TransitionGroup>
          )} />
        </div>
      </div>
  );
}

export default App;
