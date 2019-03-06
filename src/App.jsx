import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TetrisEngine from './engine/TetrisEngine';

const stepTime = 1000;

class App extends Component {
  constructor(props) {
    super(props);

    this.engine = new TetrisEngine();
    this.engine.addTetrisListener(this.onTetrisEvent.bind(this));
    this.events = [];
    this.timer = null;
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    this.timer = setTimeout(this.gameStep.bind(this), stepTime);
  }

  gameStep() {
    this.engine.step();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onTetrisEvent(name, data) {
    this.events.push({ name, data });
    this.setState({ events: this.events });
    this.timer = setTimeout(this.gameStep.bind(this), stepTime);
  }

  render() {

    const list = this.state.events.map((event, index) => {
      return (
        <div key={index}>
          {event.name}
        </div>
      );

    });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          {list}
        </div>
      </div>
    );
  }
}

export default App;
