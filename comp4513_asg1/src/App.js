import logo from './logo.svg';
import './App.css';
import SearchPage from './components/SearchPage.js';
import React from 'react';
import BrowserRouter from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        <Route path="/" exact component={SearchPage} />
        <Route path="/search" exact component={SearchPage} />
      </body>
    </div>
  );
}

export default App;
