import React, { Component } from 'react';
import TetrisPiece from './TetrisPiece.jsx';

class PieceDefinitions {
  constructor() {
    this.pieces = [
      [
        [[1, 0], [1, 1], [1, 2], [1, 3]],
        [[1, 1], [1, 1], [2, 1], [3, 1]]
      ], // I piece rotations
      [
        [[1, 0], [1, 1], [1, 2], [2, 2]],
        [[0, 1], [1, 1], [1, 2], [1, 0]],
        [[1, 2], [1, 1], [1, 0], [0, 0]],
        [[0, 1], [1, 1], [0, 2], [2, 1]]
      ],   // [1] L
      [
        [[0, 0], [1, 0], [0, 1], [0, 2]],
        [[0, 0], [1, 0], [0, 1], [0, 2]],
        [[0, 0], [1, 0], [0, 1], [0, 2]],
        [[0, 0], [1, 0], [0, 1], [0, 2]]
      ],   // [2] R (mirror of L)
      [
        [[0, 0], [1, 0], [1, 1], [2, 1]],
        [[0, 0], [1, 0], [1, 1], [2, 1]]
      ],   // [3] Z
      [
        [[0, 0], [0, 1], [1, 1], [1, 2]],
        [[0, 0], [0, 1], [1, 1], [1, 2]]
      ],   // [4] S (mirror of Z)
      [
        [[0, 0], [0, 1], [1, 0], [1, 1]]
      ],   // [5] X
      [
        [[1, 0], [1, 1], [1, 2], [0, 1]],
        [[0, 1], [1, 1], [1, 1], [1, 0]],
        [[1, 0], [1, 1], [1, 2], [2, 1]],
        [[0, 1], [1, 1], [1, 1], [1, 2]]
      ]    // [6] T
    ];
  }

}

class GameConfiguration {
  constructor() {
    this.blockWidth = 20;
    this.blockHeight = this.blockWidth;

    this.columnCount = 10;
    this.rowCount = 22;

    this.playspaceWidth = this.blockWidth * this.columnCount;
    this.playspaceHeight = this.blockHeight * this.rowCount;

    this.enableBonusBlocks = false;
  }
}

class TetrisGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: new GameConfiguration(),
      pieceDefinitions: new PieceDefinitions(),
      pieces: [],
      curPiece: null
    };
  }

  componentDidMount() {
    var self = this;
    this.timer = setInterval(
      function () {
        self.tick();
      },
      250);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  createNewPiece() {
    let defs = this.state.pieceDefinitions.pieces;
    var defIndex = Math.floor(Math.random() * defs.length);
    var rotation = Math.floor(Math.random() * defs[defIndex].length);

    var newPiece = {
      pos: { x: 4, y: 0 },
      shape: defs[defIndex][rotation]
    };

    return newPiece;
  }

  isBoardPosClear(pos) {
    let x = pos.x;
    let y = pos.y

    // check bounds
    if (x < 0 || x > this.props.cols || y < 0 || y >= this.props.rows) {
      return false;
      // todo shapes
    } else {
      return true;
    }
  }

  checkDown(piece) {
    var clear = true;
    var basePos = piece.pos;

    for (var i = 0; i < piece.shape.length; i++) {

      var pos = {
        x: basePos.x + piece.shape[i][0],
        y: basePos.y + piece.shape[i][1] + 1
      };

      if (!this.isBoardPosClear(pos)) {
        clear = false;
        break;
      }
    }

    return clear;
  }


  tick() {
    let curPiece = this.state.curPiece;
    if (curPiece && this.checkDown(curPiece)) {
      curPiece.pos.y++;
    } else {
      curPiece = this.createNewPiece();
    }

    // Operate on a copy of the array and then queue it with setState
    var pieces = this.state.pieces.slice();
    pieces.push(curPiece);

    this.setState({
      curPiece: curPiece,
      pieces: pieces
    });
  }

  createPiecesJSX(pieces) {
    // return value
    var created = [];

    let config = this.state.config;
    let blockWidth = config.blockWidth;
    let blockHeight = config.blockHeight;

    for (var i = 0; i < pieces.length; i++) {
      let curPiece = pieces[i]
      let shape = curPiece.shape;
      let x = curPiece.pos.x
      let y = curPiece.pos.y
      created.push(<TetrisPiece key={i} shape={shape} x={x} y={y} blockWidth={blockWidth} blockHeight={blockHeight} />);
    }

    return created;
  }

  render() {
    let config = this.state.config;
    let boardMargin = 20;
    let width = config.playspaceWidth;
    let height = config.playspaceHeight;
    let boardWidth = width + boardMargin;
    let boardHeight = height + boardMargin;

    let pieces = this.state.pieces;
    let renderedPieces = this.createPiecesJSX(pieces);

    // <TetrisPiece def={def} x={0} y={0} blockWidth={blockWidth} blockHeight={blockHeight} />
    // TODO: Move <rect> to its own react component
    // TODO: Keep a list of all pieces and render them all.
    return (
      <g>
        <svg width={boardWidth} height={boardHeight}>
          <rect x="0" y="0" width={width} height={height} fill="#888888" />
          {renderedPieces}
        </svg>
      </g>
    );
  }
}

export default TetrisGame;