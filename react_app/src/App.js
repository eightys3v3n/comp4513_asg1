import './App.css';
import { useState } from 'react';
import { Route } from 'react-router';
import HomePage from './components/HomePage.js';
import BrowsePage from './components/BrowsePage.js';
import DetailsPage from './components/DetailsPage.js';
import FavoritesProvider from './components/FavoritesContextProvider.js';
import PlaysProvider from './components/PlaysContextProvider.js';
import Login from './components/Login.js';
import HeaderBar from './components/HeaderBar.js';
import UserProvider from './components/UserContextProvider.js';

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
            <UserProvider location={location}>
              <PlaysProvider location={location}>
                <Route path="/" exact>
                  <HomePage title={titleFilter}
                            setTitle={setTitleFilter} />
                </Route>
                <FavoritesProvider location={location}>
                  <Route path="/BrowsePage">
                    <BrowsePage title={titleFilter} setTitle={setTitleFilter} />
                  </Route>
                  <Route path="/DetailsPage/:playID">  
                    <DetailsPage/>
                  </Route>
                </FavoritesProvider>
                <Route path="/Login" exact>
                    <Login />
                </Route>
              </PlaysProvider>
            </UserProvider>
            </CSSTransition>
          </TransitionGroup>
          )} />
        </div>
      </div>
  );
}

export default App;
