import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TetrisGame from './components/TetrisGame.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Tetris</h2>
        </div>
        <TetrisGame />
      </div>
    );
  }
}

export default App;
