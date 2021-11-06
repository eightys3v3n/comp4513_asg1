import './App.css';
import { useState, useEffect } from 'react';
//import { Router } from 'react-router-dom';
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
      <FavoritesProvider>
        <BrowsePage />
        <DetailsPage />
      </FavoritesProvider>
      </PlaysProvider>
      </div>
    </div>
  );
}

export default App;
