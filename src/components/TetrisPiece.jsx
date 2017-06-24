import React, { Component } from 'react';
import TetrisBlock from './TetrisBlock.jsx'

var pieces = [
  [[0, 0], [0, 1], [0, 2], [0, 3]],   // [0] I
  [[0, 0], [0, 1], [0, 2], [1, 2]],   // [1] L 
  [[0, 0], [1, 0], [0, 1], [0, 2]],   // [2] R (mirror of L)
  [[0, 0], [1, 0], [1, 1], [2, 1]],   // [3] Z
  [[0, 0], [0, 1], [1, 1], [1, 2]],   // [4] S (mirror of Z)
  [[0, 0], [0, 1], [1, 0], [1, 1]],   // [5] X
  [[0, 0], [0, 1], [0, 2], [1, 1]]    // [6] T
];

class TetrisPiece extends Component {
  constructor() {
    super(this.props);
    this.blockOffsets = pieces[this.props.id];
  }

  render() {
    return ( <TetrisBlock /> );
  }
}

export default TetrisPiece;