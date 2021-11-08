import './App.css';
import { useState } from 'react';
import { Route } from 'react-router';
import HomePage from './components/HomePage.js';
import BrowsePage from './components/BrowsePage.js';
import DetailsPage from './components/DetailsPage.js';
import FavoritesProvider from './components/FavoritesContextProvider.js';
import PlaysProvider from './components/PlaysContextProvider.js';

const App = (props) => {
  let [titleFilter, setTitleFilter] = useState("");
  
  return (
      <div className="App">
      <header className="App-header">
      </header>
      <div>
      <PlaysProvider>
      <Route path="/" exact>
      <HomePage title={titleFilter}
                setTitle={setTitleFilter}/>
      </Route>
      <FavoritesProvider>
      <Route path="/BrowsePage">
      <BrowsePage title={titleFilter} setTitle={setTitleFilter} />
      </Route>
      <Route path="/DetailsPage/:playID" exact component={DetailsPage} />
      </FavoritesProvider>
      </PlaysProvider>
      </div>
      </div>
  );
}

export default App;
