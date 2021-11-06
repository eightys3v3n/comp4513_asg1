import './App.css';
import { useState, useEffect } from 'react';
import { Route } from 'react-router';
import HomePage from './components/HomePage.js';
import BrowsePage from './components/BrowsePage.js';
import DetailsPage from './components/DetailsPage.js';
import FavoritesProvider from './components/FavoritesContextProvider.js';
import PlaysProvider from './components/PlaysContextProvider.js';

const App = (props) => {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
      <HomePage />
      <PlaysProvider>
        <Route path="/" exact component={HomePage} />
        <FavoritesProvider>
          <Route path="/BrowsePage" exact component={BrowsePage} />
          <Route path="/DetailsPage" exact component={DetailsPage} />
        </FavoritesProvider>
      </PlaysProvider>
      </div>
    </div>
  );
}

export default App;
