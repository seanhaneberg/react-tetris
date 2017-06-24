import React, { Component } from 'react';
import TetrisBlock from './TetrisBlock.jsx';

var pieces = [
  [[0, 0], [0, 1], [0, 2], [0, 3]],   // [0] I
  [[0, 0], [0, 1], [0, 2], [1, 2]],   // [1] L 
  [[0, 0], [1, 0], [0, 1], [0, 2]],   // [2] R (mirror of L)
  [[0, 0], [1, 0], [1, 1], [2, 1]],   // [3] Z
  [[0, 0], [0, 1], [1, 1], [1, 2]],   // [4] S (mirror of Z)
  [[0, 0], [0, 1], [1, 0], [1, 1]],   // [5] X
  [[0, 0], [0, 1], [0, 2], [1, 1]]    // [6] T
];

class TetrisGame extends Component {
  constructor(props) {
    super(props);
    this.setState({ activePiece: null, inactivePieces: [] });
  }

  componentDidMount() {
    var self = this;
    this.timer = setInterval(
      () => self.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    var activePiece = this.state ? this.state.activePiece : null;
    if (activePiece) {
      activePiece.pos[1]++; // is this okay or should I set state?
    } else {
      activePiece = {
        pos: [4, 0],
        shape: pieces[0]
      };
    }

    this.setState({ activePiece: activePiece });
  }

  renderBoard() {
    let width = this.props.cols;
    let height = this.props.rows;
    var board = [];
    for (var row = 0; row < height; row++) {
      for (var col = 0; col < width; col++) {
        var blocked = false;
        if (this.state && this.state.activePiece) {
          for (var block = 0; block < this.state.activePiece.shape.length; block++) {
            var x = this.state.activePiece.pos[0] + this.state.activePiece.shape[block][0];
            var y = this.state.activePiece.pos[1] + this.state.activePiece.shape[block][1];
            blocked = (x === col) && (y === row);
            if (blocked) {
              break;
            }
          }
        }

        board.push(<TetrisBlock blocked={blocked} />);
      }

      board.push(<br />);
    }
    return <g> {board} </g>;
  }

  render() {
    return this.renderBoard();
  }
}

export default TetrisGame;