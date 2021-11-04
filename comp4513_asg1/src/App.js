import './App.css';
import { useState, useEffect } from 'react';
//import { Router } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import BrowsePage from './components/BrowsePage.js';
import DetailsPage from './components/DetailsPage.js';
//import {FavoritesContextProvider} from './components/FavoritesContextProvider.js';


const App = (props) => {  
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
      <HomePage />
      <BrowsePage />
      <DetailsPage />
      </div>
    </div>
  );
}

export default App;
