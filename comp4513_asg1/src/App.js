import './App.css';
import { useState, useEffect } from 'react';
//import { Router } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import BrowsePage from './components/BrowsePage.js';
import DetailsPage from './components/DetailsPage.js';


const App = (props) => {
  const {favorites, setFavorites} = useState([]);
  let url = "https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/list.php";

  
  function addFavorite(id) {
    console.log(`Adding favorite ${id}`);
  }

  function removeFavorite(id) {
    console.log(`Removing favorite ${id}`);
  }


  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setFavorites(data);
        console.log("Retrieved data");
      })
  });
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <HomePage />
        <h1>Test</h1>
        <BrowsePage addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                    favorites={favorites}
        />
        <DetailsPage />
      </div>
    </div>
  );
}

export default App;
