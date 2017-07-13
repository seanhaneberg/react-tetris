import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import TetrisGame from './components/TetrisGame.jsx'
import TetrisController from './components/TetrisController.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.attachRef = this.attachRef.bind(this);

    this.gameJSX = <TetrisGame cols={10} rows={22} ref={this.attachRef} />
    this.controller = < TetrisController game={this.game} />
  }

  attachRef(ref) {
    this.gameRef = ref;
  }

  handleClick(e) {
    console.log("\n\nclick click click!!\n\n" + e.toString());
    // this.game.moveLeft();
    // this.game.moveRight();
    // this.game.drop();
  }

  onKeyUp(e) {
    // todo: tell the controller instead?
    let c = e.which;
    if (this.gameRef && this.isMoveLeftKey(c)) {
      this.gameRef.moveLeft();
    } else if (this.isMoveRightKey(c)) {
      console.log("app move right!");
    } else if (this.isRotateLeftKey(c)) {
      console.log("app rotate left!");
    } else if (this.isRotateRightKey(c)) {
      console.log("app rotate right!");
    } else {
      console.log("app ignorable key!");
    }
  }

  isMoveLeftKey(c) {
    return (c === 'A'.charCodeAt(0));
  }

  isMoveRightKey(c) {
    return (c === 'D'.charCodeAt(0));
  }

  isRotateLeftKey(c) {
    return (c === 'Q'.charCodeAt(0));
  }

  isRotateRightKey(c) {
    return (c === 'E'.charCodeAt(0));
  }

  render() {
    let handler = this.onKeyUp;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Tetris</h2>
        </div>
        <div onKeyUp={handler} contentEditable={true} />
        {this.gameJSX}
      </div>
    );
  }
}

export default App;