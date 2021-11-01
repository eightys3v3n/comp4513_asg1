import './App.css';
import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import SearchPage from './components/SearchPage.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Router path="/" component={SearchPage} />
        <Router path="/search" exact component={SearchPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
