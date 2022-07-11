import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header, Home } from './components';

function App() {
  return (
    <div className="App container-fluid">
      <Header />
      <Home />
    </div>
  );
}

export default App;
